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
        className="relative rounded-2xl border border-[#E6E3DB] bg-white overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_-30px_rgba(0,0,0,0.2)]"
        style={{ minHeight: 720 }}
      >
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white">
            <span className="h-8 w-8 rounded-full border-2 border-[#E6E3DB] border-t-[#1E2A54] animate-spin" />
            <span className="text-[14px] text-[#8A8578]">Loading the calendar…</span>
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
      className="group w-full rounded-2xl border border-[#E6E3DB] bg-white p-10 md:p-14 flex flex-col items-center text-center transition-all hover:border-[#1E2A54]/40 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_-30px_rgba(0,0,0,0.2)]"
    >
      <span className="h-14 w-14 rounded-full bg-[#1E2A54]/8 flex items-center justify-center text-[#1E2A54] text-2xl">
        
      </span>
      <span className="mt-6 text-[22px] md:text-[26px] font-medium tracking-[-0.01em]">
        Pick a time that works
      </span>
      <span className="mt-3 text-[16px] text-[#5A564C] max-w-sm">
        A 15-minute call. We&rsquo;ll show you the gap in your account — no pitch,
        no pressure.
      </span>
      <span className="mt-8 inline-flex items-center gap-2 h-12 px-7 rounded-full bg-[#1E2A54] text-white font-medium text-[15px] transition-colors group-hover:bg-[#141C3B]">
        Open the calendar
        <span className="transition-transform group-hover:translate-x-1">→</span>
      </span>
    </button>
  );
}
