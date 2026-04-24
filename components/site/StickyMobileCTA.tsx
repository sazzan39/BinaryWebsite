"use client";

import { useEffect, useState } from "react";
import { BookCallButton } from "./BookCallButton";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed left-4 right-4 bottom-4 z-40 transition-all duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <div className="grid grid-cols-2 gap-2 p-2 bg-obsidian/95 backdrop-blur-md border border-panel shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
        <a
          href="#diagnose"
          className="h-12 flex items-center justify-center border border-bone/20 text-bone font-mono text-xs tracking-wide hover:border-signal transition-colors"
        >
          Run Diagnosis
        </a>
        <BookCallButton
          variant="primary"
          className="!h-12 !px-4 !text-xs w-full"
          utm={{
            utm_source: "site",
            utm_medium: "sticky_mobile",
            utm_campaign: "bgr_audit",
          }}
        >
          Book Call →
        </BookCallButton>
      </div>
    </div>
  );
}
