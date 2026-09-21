// Pulls every playbook lead out of the Vercel Blob store and writes them to
// data/playbook-leads.export.json as a single array, oldest first.
//
//   BLOB_READ_WRITE_TOKEN=... npm run leads:export
//
// The token is in the Vercel dashboard: Storage > your Blob store > .env.local.

import { get, list } from "@vercel/blob";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("BLOB_READ_WRITE_TOKEN is not set.");
  process.exit(1);
}

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

const out = path.join(process.cwd(), "data", "playbook-leads.export.json");
await mkdir(path.dirname(out), { recursive: true });
await writeFile(out, JSON.stringify(leads, null, 2) + "\n", "utf8");
console.log(`Exported ${leads.length} lead(s) to ${path.relative(process.cwd(), out)}`);
