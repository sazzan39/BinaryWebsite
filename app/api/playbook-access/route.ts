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
 * the page:
 *
 * - Resend audience (RESEND_API_KEY + RESEND_AUDIENCE_ID set): the submitter is
 *   added as a contact in the audience. This is the real lead list in
 *   production. Vercel's filesystem is read-only, so a file on disk is not an
 *   option there.
 *   added as a contact in the audience.
 * - Local dev disk backup (writable FS): appends to
 *   `data/playbook-leads.json` (gitignored). Expected to fail on serverless,
 *   which is fine — it is only a convenience for local testing.
 *
 * We return an error only when the lead reached *neither* store, so the reader
 * is never blocked from a page whose lead we actually captured. Set
 * PLAYBOOK_WEBHOOK_URL to additionally mirror each lead to a CRM/Zapier
 * endpoint.
 *   `data/playbook-leads.json` (gitignored).
 * - Vercel logs fallback: if neither Resend nor local disk is available, the lead
 *   is output to the server logs (visible in Vercel Dashboard > Logs) and the page
 *   unlocks so visitors are never blocked with a 500 error.
 * - Optional webhook: mirror to a CRM/Zapier endpoint via PLAYBOOK_WEBHOOK_URL.
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

<<<<<<< HEAD
  console.log("[playbook-access] contact added:", data?.id);
  console.log("[playbook-access] contact added to Resend:", data?.id);
  return true;
}

/** Local dev backup. Fails (harmlessly) on a read-only serverless filesystem. */
async function backupToDisk(record: Lead): Promise<boolean> {
=======
  if (process.env.VERCEL) {
    // On Vercel without a Blob store connected, the disk write below would
    // fail with a read-only filesystem error. Say what is actually missing.
    throw new Error(
      "BLOB_READ_WRITE_TOKEN is not set. Connect a Blob store to this project in the Vercel dashboard.",
    // On Vercel without a Blob store connected, the serverless filesystem is read-only.
    // We log the lead directly so it is recorded in the Vercel Runtime Logs dashboard
    // rather than throwing a 500 error that locks the visitor out.
    console.log(
      "[playbook-access] Lead recorded in Vercel logs (connect Vercel Blob to store as JSON files):",
      JSON.stringify(record),
    );
    return;
  }

  await fs.mkdir(DATA_DIR, { recursive: true });
  const leads = await readLeads();
  leads.push(record);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2) + "\n", "utf8");
>>>>>>> 68b84f1 (Refactor code structure for improved readability and maintainability)
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const leads = await readLeads();
    leads.push(record);
<<<<<<< HEAD
    await fs.writeFile(
      LEADS_FILE,
      JSON.stringify(leads, null, 2) + "\n",
      "utf8",
    );
    return true;
  } catch (err) {
    console.error("[playbook-access] file write failed:", err);
    return false;
=======
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2) + "\n", "utf8");
  } catch (err) {
    console.error("[playbook-access] local file write failed:", err);
>>>>>>> 68b84f1 (Refactor code structure for improved readability and maintainability)
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

<<<<<<< HEAD
  // Collect the lead (production) + local backup (dev). Independent, best-effort.
  // Collect the lead (production Resend) + local disk backup (dev). Independent, best-effort.
  const [collected, stored] = await Promise.all([
    addToAudience(record).catch((err) => {
      console.error("[playbook-access] audience add threw:", err);
      return false;
    }),
    backupToDisk(record),
  ]);
=======
  try {
    await storeLead(record);
  } catch (err) {
    // Even if storage encounters an unexpected issue, preserve the lead in logs
    // and proceed so the user is not locked out with a 500 error screen.
    console.error("[playbook-access] store failed:", err);
    return NextResponse.json({ error: "store_failed" }, { status: 500 });
    console.log("[playbook-access] Lead fallback log:", JSON.stringify(record));

  // If neither Resend nor local disk could store it (e.g. running on Vercel without Resend keys set),
  // log the lead to Vercel Runtime Logs so it is preserved and visible in Vercel Dashboard > Logs.
  if (!collected && !stored) {
    console.log(
      "[playbook-access] Lead recorded in server logs (set RESEND_API_KEY & RESEND_AUDIENCE_ID to sync automatically):",
      JSON.stringify(record),
    );
  }
>>>>>>> 68b84f1 (Refactor code structure for improved readability and maintainability)

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

  // Always return ok: true for valid input so readers are never blocked
  return NextResponse.json({ ok: true, id: record.id });
}
