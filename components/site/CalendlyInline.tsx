"use client";

import { useState } from "react";
import { CALENDLY_URL } from "@/lib/site";

export function CalendlyInline() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const src = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff&text_color=12100e&primary_color=1e2a54`;

  if (open) {
    return (
      <div
        className="relative rounded-2xl border border-line bg-card overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_-30px_rgba(0,0,0,0.2)]"
        style={{ minHeight: 720 }}
      >
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-card">
            <span className="h-8 w-8 rounded-full border-2 border-line border-t-navy animate-spin" />
            <span className="text-[14px] text-subtle">Loading the calendar…</span>
          </div>
        )}
        <iframe
          src={src}
          title="Book a call with BinaryGen"
          onLoad={() => setLoaded(true)}
          className="w-full relative"
          style={{ height: 720, border: 0, opacity: loaded ? 1 : 0, transition: "opacity 250ms ease" }}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="calendly-card group w-full rounded-2xl border border-line bg-card p-10 md:p-14 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:border-navy/40 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_30px_70px_-30px_rgba(0,0,0,0.22)]"
    >
      {/* Calendar glyph with a marked date and a soft "live" pulse — this
          slot has been an empty text-2xl span since it was first written
          (never had a glyph in it), which is why it rendered as a blank
          circle. */}
      <span className="relative">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-navy/[0.08] text-navy transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-105">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="16" rx="3" />
            <path d="M3 10h18" />
            <path d="M8 3v4M16 3v4" />
            <circle cx="15.25" cy="14.75" r="1.5" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <span className="calendly-ping absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-navy opacity-60" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-navy ring-2 ring-card" />
        </span>
      </span>
      <span className="mt-6 text-[22px] md:text-[26px] font-medium tracking-[-0.01em]">
        Pick a time that works
      </span>
      <span className="mt-3 text-[16px] text-body max-w-sm">
        A 15-minute call. We&rsquo;ll show you the gap in your account, no pitch,
        no pressure.
      </span>
      <span className="mt-8 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-navy text-white font-medium text-[15px] transition-colors group-hover:bg-navydeep">
        Open the calendar
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </button>
  );
}
