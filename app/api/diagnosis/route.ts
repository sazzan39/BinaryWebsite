import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  brandUrl?: string;
  inputs?: Record<string, unknown>;
  diagnosis?: Record<string, unknown>;
  anonymous?: boolean;
};

const DATA_DIR = path.join(process.cwd(), "data");
const WEBHOOK_URL = process.env.DIAGNOSIS_WEBHOOK_URL;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const record = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    userAgent: req.headers.get("user-agent") ?? null,
    ...body,
  };

  // 1) Always log so you can grep `next dev` output
  console.log("[diagnosis] captured:", JSON.stringify(record, null, 2));

  // 2) Append to local JSONL so you have a file you can open + read
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const month = new Date().toISOString().slice(0, 7); // YYYY-MM
    const file = path.join(DATA_DIR, `diagnoses-${month}.jsonl`);
    await fs.appendFile(file, JSON.stringify(record) + "\n", "utf8");
  } catch (err) {
    console.error("[diagnosis] file append failed:", err);
  }

  // 3) Optional: forward to webhook (Zapier / Make / n8n / Resend / your CRM)
  if (WEBHOOK_URL) {
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch (err) {
      console.error("[diagnosis] webhook forward failed:", err);
    }
  }

  return NextResponse.json({ ok: true, id: record.id });
}
