import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { Resend } from "resend";

export const runtime = "nodejs";

/**
 * Email gate on /resources/no-discount-growth-playbook.
 *
 * Captures the address + whether they are a brand or an agency, then unlocks
 * the page. No email is sent to the reader — we only collect the lead:
 *
 * - Resend audience (RESEND_API_KEY + RESEND_AUDIENCE_ID set): the submitter is
 *   added as a contact in the audience. This is the real lead list in
 *   production. Vercel's filesystem is read-only, so a file on disk is not an
 *   option there.
 * - Local dev disk backup (writable FS): appends to
 *   `data/playbook-leads.json` (gitignored). Expected to fail on serverless,
 *   which is fine — it is only a convenience for local testing.
 *
 * We return an error only when the lead reached *neither* store, so the reader
 * is never blocked from a page whose lead we actually captured. Set
 * PLAYBOOK_WEBHOOK_URL to additionally mirror each lead to a CRM/Zapier
 * endpoint.
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
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID;

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

/** Add the lead to the Resend audience. No email is sent. Returns success. */
async function addToAudience(record: Lead): Promise<boolean> {
  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) return false;

  const resend = new Resend(RESEND_API_KEY);
  const { data, error } = await resend.contacts.create({
    audienceId: RESEND_AUDIENCE_ID,
    email: record.email,
    // Resend contacts only carry email + first/last name, so stash whether
    // they are a brand or an agency in lastName to keep that signal in Resend.
    lastName: record.role,
    unsubscribed: false,
  });

  if (error) {
    // A repeat submitter (already a contact) is a success for our purposes:
    // the lead is captured and the page should unlock.
    const name = (error as { name?: string }).name;
    if (name === "validation_error") {
      console.log("[playbook-access] contact already in audience:", record.email);
      return true;
    }
    console.error("[playbook-access] resend contact create failed:", error);
    return false;
  }

  console.log("[playbook-access] contact added:", data?.id);
  return true;
}

/** Local dev backup. Fails (harmlessly) on a read-only serverless filesystem. */
async function backupToDisk(record: Lead): Promise<boolean> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const leads = await readLeads();
    leads.push(record);
    await fs.writeFile(
      LEADS_FILE,
      JSON.stringify(leads, null, 2) + "\n",
      "utf8",
    );
    return true;
  } catch (err) {
    console.error("[playbook-access] file write failed:", err);
    return false;
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

  // Collect the lead (production) + local backup (dev). Independent, best-effort.
  const [collected, stored] = await Promise.all([
    addToAudience(record).catch((err) => {
      console.error("[playbook-access] audience add threw:", err);
      return false;
    }),
    backupToDisk(record),
  ]);

  // Optional mirror to a CRM/Zapier endpoint. Never gates the unlock.
  if (WEBHOOK_URL) {
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) {
        console.error(
          `[playbook-access] webhook returned ${res.status} ${res.statusText}`,
        );
      }
    } catch (err) {
      console.error("[playbook-access] webhook forward failed:", err);
    }
  }

  // Only block the reader if the lead landed nowhere at all.
  if (!collected && !stored) {
    return NextResponse.json({ error: "store_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: record.id });
}
