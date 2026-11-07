import fs from "node:fs";
import path from "node:path";

const IMG = /\.(png|jpe?g|webp|gif|avif|svg)$/i;

function getBrandLogos(): string[] {
  try {
    const dir = path.join(process.cwd(), "public", "BrandsLogos");
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((f) => IMG.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

export function BrandMarquee() {
  const files = getBrandLogos();
  if (files.length === 0) return null;

  // Ensure enough logos in sequence so it covers any viewport width before repeating
  const repeatCount = Math.max(2, Math.ceil(10 / files.length));
  const sequence: string[] = [];
  for (let i = 0; i < repeatCount; i++) {
    sequence.push(...files);
  }

  return (
    <section className="py-10 md:py-14 border-t border-linesoft overflow-hidden bg-bg">
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="brand-marquee flex w-max items-center gap-12 sm:gap-16 md:gap-24 py-2">
          {/* Two identical halves for a 100% seamless -50% translateX loop */}
          {[...sequence, ...sequence].map((file, idx) => (
            <div
              key={`${file}-${idx}`}
              className="shrink-0 flex items-center justify-center h-9 sm:h-11 w-32 sm:w-40 md:w-48 px-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/BrandsLogos/${encodeURIComponent(file)}`}
                alt={file.replace(/\.[^/.]+$/, "").replace(/^[\d_-]+/, "") || "Brand logo"}
                loading="lazy"
                decoding="async"
                className="max-h-7 sm:max-h-8 md:max-h-9 w-auto max-w-full object-contain text-ink opacity-70 hover:opacity-100 transition-opacity dark:brightness-0 dark:invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

