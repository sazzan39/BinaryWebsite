// Pulls playbook leads and writes them to data/playbook-leads.export.json.
//
// Supports:
// 1. Supabase database:
//    npm run leads:export
//
// 2. Resend Contacts:
//    RESEND_API_KEY=... RESEND_AUDIENCE_ID=... npm run leads:export
//
// 3. Vercel Blob store:
//    BLOB_READ_WRITE_TOKEN=... npm run leads:export

import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

const out = path.join(process.cwd(), "data", "playbook-leads.export.json");
await mkdir(path.dirname(out), { recursive: true });

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "https://nrzbmaoqzysrkeaeqsgx.supabase.co";

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "sb_publishable_tMZf3w_b5005kwBl4Recfg_Kb_XtEbN";

// 1. Export from Supabase
if (supabaseUrl && supabaseKey) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from("playbook_leads")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data && data.length > 0) {
      await writeFile(out, JSON.stringify(data, null, 2) + "\n", "utf8");
      console.log(`Exported ${data.length} lead(s) from Supabase to ${path.relative(process.cwd(), out)}`);
      process.exit(0);
    } else if (error) {
      // Table might not exist yet
      console.log(`Supabase check: ${error.message}`);
    }
  } catch (err) {
    console.log(`Supabase connection error:`, err);
  }
}

// 2. Export from Resend
if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log("Fetching contacts from Resend audience...");

  const { data, error } = await resend.contacts.list({
    audienceId: process.env.RESEND_AUDIENCE_ID,
  });

  if (!error && data?.data) {
    const contacts = data.data;
    const leads = contacts.map((c) => ({
      id: c.id,
      email: c.email,
      role: c.last_name || "unknown",
      createdAt: c.created_at,
      unsubscribed: c.unsubscribed,
    }));

    leads.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    await writeFile(out, JSON.stringify(leads, null, 2) + "\n", "utf8");
    console.log(`Exported ${leads.length} lead(s) from Resend to ${path.relative(process.cwd(), out)}`);
    process.exit(0);
  }
}

// 3. Fallback to local data/playbook-leads.json
const localFile = path.join(process.cwd(), "data", "playbook-leads.json");
try {
  const content = await readFile(localFile, "utf8");
  const parsed = JSON.parse(content);
  console.log(`Found ${parsed.length} local lead(s) in data/playbook-leads.json.`);
} catch {
  console.log("No local leads found yet.");
}
