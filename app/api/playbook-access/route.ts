import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

/**
 * Email gate on /resources/no-discount-growth-playbook.
 *
 * Captures the address + whether they are a brand or an agency, and appends
 * the record to a JSON array on disk. `data/` is gitignored, so the file is
 * local to whatever machine is serving the site. Set PLAYBOOK_WEBHOOK_URL to
 * also forward each lead to a CRM/Zapier endpoint.
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
  try {
    const raw = await fs.readFile(LEADS_FILE, "utf8");
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Lead[]) : [];
  } catch {
    // Missing file on first capture, or a file we cannot parse. Either way,
    // start a fresh array rather than losing the submission.
    return [];
  }
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
    await fs.mkdir(DATA_DIR, { recursive: true });
    const leads = await readLeads();
    leads.push(record);
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2) + "\n", "utf8");
  } catch (err) {
    console.error("[playbook-access] file write failed:", err);
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
