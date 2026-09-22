// Pulls playbook leads and writes them to data/playbook-leads.export.json.
//
// Supports:
// 1. Resend Contacts (Production default):
//    RESEND_API_KEY=... RESEND_AUDIENCE_ID=... npm run leads:export
//
// 2. Vercel Blob store:
//    BLOB_READ_WRITE_TOKEN=... npm run leads:export
//
// 3. Local file:
//    npm run leads:export

import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const out = path.join(process.cwd(), "data", "playbook-leads.export.json");
await mkdir(path.dirname(out), { recursive: true });

// 1. Export from Resend
if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log("Fetching contacts from Resend audience...");

  const { data, error } = await resend.contacts.list({
    audienceId: process.env.RESEND_AUDIENCE_ID,
  });

  if (error) {
    console.error("Failed to list Resend contacts:", error);
    process.exit(1);
  }

  const contacts = data?.data ?? [];
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

// 2. Export from Vercel Blob
if (process.env.BLOB_READ_WRITE_TOKEN) {
  const { get, list } = await import("@vercel/blob");
  console.log("Fetching leads from Vercel Blob store...");
  const blobs = [];
  let cursor;
  do {
    const page = await list({ prefix: "playbook-leads/", cursor });
    blobs.push(...page.blobs);
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  const leads = [];
  for (const blob of blobs) {
    const res = await get(blob.pathname, { access: "private" });
    if (res?.statusCode !== 200) continue;
    leads.push(JSON.parse(await new Response(res.stream).text()));
  }
  leads.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  await writeFile(out, JSON.stringify(leads, null, 2) + "\n", "utf8");
  console.log(`Exported ${leads.length} lead(s) from Blob to ${path.relative(process.cwd(), out)}`);
  process.exit(0);
}

// 3. Fallback to local data/playbook-leads.json
const localFile = path.join(process.cwd(), "data", "playbook-leads.json");
try {
  const content = await readFile(localFile, "utf8");
  const parsed = JSON.parse(content);
  console.log(`Found ${parsed.length} local lead(s) in data/playbook-leads.json.`);
  console.log("\nTo fetch production leads from your live site:");
  console.log("  • If using Resend: RESEND_API_KEY=re_xxx RESEND_AUDIENCE_ID=xxx npm run leads:export");
  console.log("  • If using Vercel Blob: BLOB_READ_WRITE_TOKEN=xxx npm run leads:export");
  console.log("  • Or view them live in Vercel Dashboard > Logs (search for '[playbook-access]')");
} catch {
  console.log("No leads found yet. Check Vercel Dashboard > Logs or set RESEND_API_KEY / BLOB_READ_WRITE_TOKEN.");
}
