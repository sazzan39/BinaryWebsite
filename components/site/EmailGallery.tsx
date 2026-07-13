"use client";

import { useState } from "react";

/**
 * "The emails we build" — a gallery of real email designs, portrait format.
 * Drop screenshots into /public/emails/ as email-1.png … email-8.png.
 * Any file that isn't there is skipped; if none exist yet, the whole section
 * hides itself so there's never an empty block on the page.
 */

const FILES = [
  "email-1.png",
  "email-2.png",
  "email-3.png",
  "email-4.png",
  "email-5.png",
  "email-6.png",
  "email-7.png",
  "email-8.png",
];

export function EmailGallery() {
  const [failed, setFailed] = useState<string[]>([]);
  const visible = FILES.filter((f) => !failed.includes(f));

  if (visible.length === 0) return null;

  return (
    <section className="px-6 py-24 md:py-32 bg-white border-y border-[#EAE7DF]">
      <div className="max-w-[1120px] mx-auto">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#1E2A54]">
          The work
        </p>
        <h2 className="mt-5 max-w-2xl text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.02em] font-medium">
          The emails we actually build.
        </h2>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5">
          {visible.map((f) => (
            <div
              key={f}
              className="rounded-2xl border border-[#E6E3DB] bg-[#FAFAF9] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_16px_40px_-24px_rgba(0,0,0,0.18)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/emails/${f}`}
                alt="Email design by BinaryGen"
                onError={() => setFailed((prev) => [...prev, f])}
                className="w-full block"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
