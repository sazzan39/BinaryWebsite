"use client";

import { useEffect, useState } from "react";

type PinData = {
  file: string;
  tag: string;
  height: number;
};

const ROW_1_PRESETS = [
  { tag: "VIP Early Access", height: 410 },
  { tag: "Product Story", height: 350 },
  { tag: "Welcome Flow", height: 440 },
  { tag: "Holiday Campaign", height: 370 },
  { tag: "Catalog Showcase", height: 430 },
  { tag: "Abandonment Recovery", height: 360 },
];

const ROW_2_PRESETS = [
  { tag: "BFCM Launch", height: 440 },
  { tag: "Brand Story", height: 360 },
  { tag: "Browse Recovery", height: 420 },
  { tag: "High AOV Win-Back", height: 370 },
  { tag: "Exclusive Drop", height: 450 },
  { tag: "Editorial Feature", height: 380 },
];

export function EmailGalleryClient({ files }: { files: string[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Keyboard navigation & escape to close
  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev - 1 + files.length) % files.length : null,
        );
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) =>
          prev !== null ? (prev + 1) % files.length : null,
        );
      }
    };
    window.addEventListener("keydown", onKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex, files.length]);

  if (files.length === 0) return null;

  // Build row 1 pins
  const row1Pins: PinData[] = files.map((file, i) => ({
    file,
    tag: ROW_1_PRESETS[i % ROW_1_PRESETS.length].tag,
    height: ROW_1_PRESETS[i % ROW_1_PRESETS.length].height,
  }));

  // Build row 2 pins with reversed/staggered order
  const reversedFiles = [...files].reverse();
  const row2Pins: PinData[] = reversedFiles.map((file, i) => ({
    file,
    tag: ROW_2_PRESETS[i % ROW_2_PRESETS.length].tag,
    height: ROW_2_PRESETS[i % ROW_2_PRESETS.length].height,
  }));

  // Duplicate for seamless 50% loop with enough items to comfortably cover any container width
  const repeatCount = Math.max(2, Math.ceil(10 / Math.max(1, files.length)));
  const row1Seq: PinData[] = [];
  const row2Seq: PinData[] = [];
  for (let r = 0; r < repeatCount; r++) {
    row1Seq.push(...row1Pins);
    row2Seq.push(...row2Pins);
  }
  const row1Track = [...row1Seq, ...row1Seq];
  const row2Track = [...row2Seq, ...row2Seq];

  return (
    <>
      <section className="py-24 md:py-32 bg-card border-y border-linesoft overflow-hidden">
        {/* Section Header */}
        <div className="max-w-[1120px] mx-auto px-6 text-center">
          <h2 className="max-w-2xl mx-auto text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.02em] font-medium">
            The emails we actually build.
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-[15px] md:text-[16px] text-subtle">
            Hover to pause and preview. Click any design to inspect the full email.
          </p>
        </div>

        {/* Pinterest-style Dual Sliding Tracks - centered and limited within container */}
        <div className="mt-14 max-w-[1380px] mx-auto px-4 sm:px-6">
          <div className="space-y-6 md:space-y-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            {/* Row 1: Sliding Left (Inside) */}
            <div className="pinterest-slide-left flex w-max items-center gap-5 sm:gap-6 md:gap-7">
              {row1Track.map((pin, i) => {
                const originalIndex = files.indexOf(pin.file);
                return (
                  <PinCard
                    key={`r1-${pin.file}-${i}`}
                    pin={pin}
                    onClick={() => setSelectedIndex(originalIndex)}
                  />
                );
              })}
            </div>

            {/* Row 2: Sliding Right (Outside) */}
            <div className="pinterest-slide-right flex w-max items-center gap-5 sm:gap-6 md:gap-7">
              {row2Track.map((pin, i) => {
                const originalIndex = files.indexOf(pin.file);
                return (
                  <PinCard
                    key={`r2-${pin.file}-${i}`}
                    pin={pin}
                    onClick={() => setSelectedIndex(originalIndex)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox / Pin Inspection Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative flex flex-col w-full max-w-[640px] max-h-[92vh] overflow-hidden rounded-2xl md:rounded-3xl bg-bg border border-line shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 h-14 border-b border-linesoft bg-card/80 backdrop-blur shrink-0">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-navy/10 dark:bg-navy/30 text-navy px-3 py-1 text-[12px] font-medium">
                  {ROW_1_PRESETS[selectedIndex % ROW_1_PRESETS.length].tag}
                </span>
                <span className="text-[13px] text-subtle font-mono">
                  {selectedIndex + 1} / {files.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Prev / Next buttons */}
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex(
                      (selectedIndex - 1 + files.length) % files.length,
                    )
                  }
                  className="h-8 w-8 rounded-full border border-line flex items-center justify-center text-ink hover:bg-card transition-colors text-sm"
                  aria-label="Previous email"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((selectedIndex + 1) % files.length)
                  }
                  className="h-8 w-8 rounded-full border border-line flex items-center justify-center text-ink hover:bg-card transition-colors text-sm"
                  aria-label="Next email"
                >
                  →
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  className="h-8 w-8 ml-2 rounded-full bg-line/60 hover:bg-line flex items-center justify-center text-ink transition-colors"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable full email body */}
            <div className="overflow-y-auto flex-1 p-4 sm:p-6 bg-[#F3F4F6] dark:bg-black/40 flex justify-center">
              <div className="w-full max-w-[560px] bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200/80">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/emails/${files[selectedIndex]}`}
                  alt="Full email design by BinaryGen"
                  className="w-full h-auto block"
                />
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="px-6 py-4 border-t border-linesoft bg-card flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <p className="text-[13px] text-body2 text-center sm:text-left">
                Custom designed &amp; written for retention.
              </p>
              <a
                href="#book"
                onClick={() => setSelectedIndex(null)}
                className="h-9 px-5 inline-flex items-center justify-center rounded-full bg-navy text-onnavy text-[13px] font-medium hover:bg-navydeep transition-colors"
              >
                Book a call to rebuild yours →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PinCard({
  pin,
  onClick,
}: {
  pin: PinData;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl md:rounded-[1.4rem] border border-line/80 bg-white dark:bg-card p-2 sm:p-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.04),0_16px_36px_-12px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_28px_54px_-16px_rgba(0,0,0,0.24)] hover:border-navy/40 w-[230px] sm:w-[270px] md:w-[300px]"
      style={{ height: pin.height }}
    >
      {/* Pin Image Container */}
      <div className="relative w-full h-full rounded-xl md:rounded-[1.1rem] overflow-hidden bg-[#F3F4F6] dark:bg-black/30">
        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className="inline-flex items-center rounded-full bg-black/65 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-white shadow-sm border border-white/10">
            {pin.tag}
          </span>
        </div>

        {/* Pin Hover Action Button */}
        <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink shadow-md font-semibold text-xs hover:bg-navy hover:text-white transition-colors">
            ↗
          </span>
        </div>

        {/* Email Image Preview - smooth auto-glides downward on hover to peek the rest of the email */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/emails/${pin.file}`}
          alt="Email design preview"
          loading="lazy"
          decoding="async"
          className="absolute inset-x-0 top-0 w-full object-cover object-top transition-transform duration-[7000ms] ease-out group-hover:translate-y-[calc(-100%+300px)]"
        />

        {/* Bottom Glass Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none opacity-60 group-hover:opacity-80 transition-opacity" />

        {/* Click to expand pill affordance */}
        <div className="absolute inset-x-0 bottom-3 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 text-ink dark:bg-card/95 dark:text-ink px-3.5 py-1.5 text-[11px] font-semibold shadow-lg backdrop-blur hover:bg-navy hover:text-white transition-colors">
            Inspect design
          </span>
        </div>
      </div>
    </div>
  );
}

