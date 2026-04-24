"use client";

import { useEffect, useState } from "react";
import { BookCallButton } from "./BookCallButton";
import { Logo } from "@/components/primitives/Logo";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <div
        className={`flex items-center gap-3 md:gap-8 pl-5 pr-2 md:pr-3 h-14 rounded-full transition-all ${
          scrolled
            ? "bg-[#0b1220]/90 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
            : "bg-[#0b1220]/70 backdrop-blur-lg border border-white/5"
        }`}
      >
        <Logo className="shrink-0" />

        <nav className="hidden md:flex items-center gap-6 border-l border-bone/10 pl-6">
          <a
            href="#diagnose"
            className="font-mono text-xs text-bone/70 hover:text-bone transition-colors"
          >
            Diagnosis
          </a>
          <a
            href="#proof"
            className="font-mono text-xs text-bone/70 hover:text-bone transition-colors"
          >
            Proof
          </a>
          <a
            href="#funnel"
            className="font-mono text-xs text-bone/70 hover:text-bone transition-colors"
          >
            Process
          </a>
          <a
            href="#outcomes"
            className="font-mono text-xs text-bone/70 hover:text-bone transition-colors"
          >
            Outcomes
          </a>
          <a
            href="#faq"
            className="font-mono text-xs text-bone/70 hover:text-bone transition-colors"
          >
            FAQ
          </a>
        </nav>

        <BookCallButton
          variant="primary"
          className="!h-10 !px-5 !text-xs"
          utm={{ utm_source: "site", utm_medium: "nav", utm_campaign: "bgr_audit" }}
        >
          Book a call
        </BookCallButton>
      </div>
    </header>
  );
}
