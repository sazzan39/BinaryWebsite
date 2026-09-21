import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

/**
 * Email gate on /resources/no-discount-growth-playbook.
 *
 * Captures the address + whether they are a brand or an agency, stored as
 * JSON in one of two places:
 *
 * - Production (BLOB_READ_WRITE_TOKEN set): one private JSON blob per lead
 *   under `playbook-leads/`, in the project's Vercel Blob store. Vercel's
 *   filesystem is read-only, so a file on disk is not an option there. One
 *   blob per lead means concurrent submits never overwrite each other.
 *   `npm run leads:export` merges them into a single JSON array.
 * - Local dev (no token): appended to `data/playbook-leads.json` (gitignored).
 *
 * Set PLAYBOOK_WEBHOOK_URL to also forward each lead to a CRM/Zapier endpoint.
 */

type Payload = {
  email?: unknown;
  role?: unknown;
};

type Lead = {
  id: string;
  createdAt: string;
  email: string;
  role: Role;
  resource: string;
  userAgent: string | null;
};

const ROLES = ["brand", "agency"] as const;
type Role = (typeof ROLES)[number];

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "playbook-leads.json");
const WEBHOOK_URL = process.env.PLAYBOOK_WEBHOOK_URL;

// Deliberately loose: enough to reject typos and empty submits, not enough to
// bounce the unusual-but-valid addresses a stricter pattern would.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function readLeads(): Promise<Lead[]> {
  let raw: string;
  try {
    raw = await fs.readFile(LEADS_FILE, "utf8");
  } catch (err) {
    // First capture: no file yet.
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as Lead[];
  } catch {
    // Fall through to the backup below.
  }

  // The file exists but is not a JSON array (e.g. a hand edit left it
  // malformed). Move it aside instead of overwriting it, so the leads already
  // in it survive and can be merged back by hand.
  const backup = `${LEADS_FILE}.corrupt-${Date.now()}`;
  await fs.rename(LEADS_FILE, backup);
  console.error(`[playbook-access] unreadable leads file moved to ${backup}`);
  return [];
}

async function storeLead(record: Lead) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    // Timestamp first so the store lists in submission order.
    await put(
      `playbook-leads/${record.createdAt}-${record.id}.json`,
      JSON.stringify(record, null, 2),
      {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
      },
    );
    return;
  }

  if (process.env.VERCEL) {
    // On Vercel without a Blob store connected, the disk write below would
    // fail with a read-only filesystem error. Say what is actually missing.
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is not set. Connect a Blob store to this project in the Vercel dashboard.",
    );
  }

  await fs.mkdir(DATA_DIR, { recursive: true });
  const leads = await readLeads();
  leads.push(record);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2) + "\n", "utf8");
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const role = typeof body.role === "string" ? body.role.toLowerCase() : "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (!ROLES.includes(role as Role)) {
    return NextResponse.json({ error: "invalid_role" }, { status: 400 });
  }

  const record: Lead = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    email,
    role: role as Role,
    resource: "no-discount-growth-playbook",
    userAgent: req.headers.get("user-agent") ?? null,
  };

  console.log("[playbook-access] captured:", record.email, record.role);

  try {
    await storeLead(record);
  } catch (err) {
    console.error("[playbook-access] store failed:", err);
    return NextResponse.json({ error: "store_failed" }, { status: 500 });
  }

  if (WEBHOOK_URL) {
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch (err) {
      console.error("[playbook-access] webhook forward failed:", err);
    }
  }

  return NextResponse.json({ ok: true, id: record.id });
}
