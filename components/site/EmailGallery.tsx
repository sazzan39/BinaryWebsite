import fs from "node:fs";
import path from "node:path";

/**
 * "The emails we build": real email designs in phone mockups, in a row that
 * scrolls sideways on its own in an endless loop (.email-marquee in
 * globals.css), pausing on hover. Reads /public/emails at render time and
 * shows EXACTLY one phone per file that actually exists (no empty boxes, no
 * broken images). If the folder is empty, the whole section hides. Each tall
 * email also auto-scrolls its own image via CSS (.email-scroll), independent
 * of the row's side-scroll.
 *
 * The loop is seamless because the track renders the file list twice back to
 * back and animates exactly half its own width. Add designs as
 * /public/emails/*.png (tall/portrait), named email-1.png, email-2.png, … to
 * control order.
 */

const IMG = /\.(png|jpe?g|webp|gif|avif)$/i;

function getEmailFiles(): string[] {
  try {
    return fs
      .readdirSync(path.join(process.cwd(), "public", "emails"))
      .filter((f) => IMG.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  } catch {
    return [];
  }
}

export function EmailGallery() {
  const files = getEmailFiles();
  if (files.length === 0) return null;

  return (
    <section className="px-6 py-24 md:py-32 bg-card border-y border-linesoft">
      <div className="max-w-[1120px] mx-auto text-center">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-navy">
          The work
        </p>
        <h2 className="mt-5 max-w-2xl mx-auto text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.02em] font-medium">
          The emails we actually build.
        </h2>
        <p className="mt-4 max-w-xl mx-auto text-[15px] text-subtle">
          Hover to pause. Every one designed to sell, not just to look nice.
        </p>

        <div className="mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="email-marquee flex w-max gap-6 md:gap-8">
            {[...files, ...files].map((f, i) => (
              <div
                key={`${f}-${i}`}
                className="shrink-0 w-[180px] sm:w-[200px] md:w-[220px]"
              >
                <div className="relative rounded-[2rem] bg-bezel p-2 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_30px_60px_-30px_rgba(0,0,0,0.4)]">
                  <div className="relative rounded-[1.55rem] overflow-hidden bg-card aspect-[9/19]">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 h-4 w-16 rounded-full bg-bezel" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/emails/${f}`}
                      alt="Email design by BinaryGen"
                      loading="lazy"
                      decoding="async"
                      className="email-scroll absolute inset-0 h-full w-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
