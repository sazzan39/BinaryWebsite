import fs from "node:fs";
import path from "node:path";
import { EmailGalleryClient } from "./EmailGalleryClient";

const IMG = /\.(png|jpe?g|webp|gif|avif)$/i;

function getEmailFiles(): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "emails");
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => IMG.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

export function EmailGallery() {
  const files = getEmailFiles();
  if (files.length === 0) return null;

  return <EmailGalleryClient files={files} />;
}
