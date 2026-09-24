import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

/**
 * Email gate on /resources/no-discount-growth-playbook.
 *
 * Captures the address + whether they are a brand or an agency, then unlocks
 * the page:
 *
 * - Supabase: saves to 'playbook_leads' table.
 * - Resend audience: if RESEND_API_KEY + RESEND_AUDIENCE_ID set.
 * - Local dev disk backup (writable FS): appends to data/playbook-leads.json.
 * - Vercel logs fallback: if remote stores fail or are not yet configured,
 *   preserves the lead in runtime logs and unlocks the page (no 500 error).
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
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw err;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as Lead[];
  } catch {
    // Fall through to backup below
  }

  const backup = `${LEADS_FILE}.corrupt-${Date.now()}`;
  await fs.rename(LEADS_FILE, backup);
  console.error(`[playbook-access] unreadable leads file moved to ${backup}`);
  return [];
}

/** Save lead into Supabase table: playbook_leads */
async function addToSupabase(record: Lead): Promise<boolean> {
  try {
    const { error } = await supabase.from("playbook_leads").insert([
      {
        id: record.id,
        created_at: record.createdAt,
        email: record.email,
        role: record.role,
        resource: record.resource,
        user_agent: record.userAgent,
      },
    ]);

    if (error) {
      console.error("[playbook-access] Supabase insert failed:", error.message || error);
      return false;
    }

    console.log("[playbook-access] Saved to Supabase:", record.email);
    return true;
  } catch (err) {
    console.error("[playbook-access] Supabase insert error:", err);
    return false;
  }
}

/** Add the lead to the Resend audience if configured. */
async function addToAudience(record: Lead): Promise<boolean> {
  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) return false;

  const resend = new Resend(RESEND_API_KEY);
  const { data, error } = await resend.contacts.create({
    audienceId: RESEND_AUDIENCE_ID,
    email: record.email,
    lastName: record.role,
    unsubscribed: false,
  });

  if (error) {
    const name = (error as { name?: string }).name;
    if (name === "validation_error") {
      console.log("[playbook-access] contact already in audience:", record.email);
      return true;
    }
    console.error("[playbook-access] resend contact create failed:", error);
    return false;
  }

  console.log("[playbook-access] contact added to Resend:", data?.id);
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

  // Store across available destinations:
  // 1. Supabase (Primary cloud database)
  // 2. Resend (Email marketing audience, if configured)
  // 3. Local disk (dev backup)
  const [supabaseSaved, resendSaved, diskSaved] = await Promise.all([
    addToSupabase(record),
    addToAudience(record).catch((err) => {
      console.error("[playbook-access] audience add threw:", err);
      return false;
    }),
    backupToDisk(record),
  ]);

  // If no store succeeded, log the lead to server logs so the lead is never lost
  if (!supabaseSaved && !resendSaved && !diskSaved) {
    console.log(
      "[playbook-access] Lead recorded in server logs:",
      JSON.stringify(record),
    );
  }

  // Optional mirror to a CRM/Zapier endpoint
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

  // Always return ok: true for valid input so readers are never blocked
  return NextResponse.json({ ok: true, id: record.id });
}
