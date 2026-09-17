"use client";

import { useState } from "react";
import { CALENDLY_URL } from "@/lib/site";

// Tall enough that Calendly's own widget lays out its month + slot picker
// without needing an internal scrollbar, so the whole booking flow embeds
// directly on the page instead of behind a click-through card.
const EMBED_HEIGHT = 900;

export function CalendlyInline() {
  const [loaded, setLoaded] = useState(false);

  const src = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff&text_color=12100e&primary_color=1e2a54`;

  return (
    <div
      className="relative rounded-2xl border border-line bg-card overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_-30px_rgba(0,0,0,0.2)]"
      style={{ height: EMBED_HEIGHT }}
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
        className="w-full h-full relative"
        style={{ border: 0, opacity: loaded ? 1 : 0, transition: "opacity 250ms ease" }}
      />
    </div>
  );
}
