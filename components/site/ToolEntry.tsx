"use client";

import { BookCallButton } from "./BookCallButton";
import { FadeIn } from "@/components/primitives/FadeIn";

export function ToolEntry({ onOpen }: { onOpen: () => void }) {
  return (
    <section
      id="diagnose"
      className="py-20 md:py-24 px-6 border-t border-panel relative overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(91,127,255,0.10), transparent 60%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto relative z-10">
        <FadeIn>
          <header className="text-center mb-10 md:mb-12 max-w-[960px] mx-auto">
            <p className="font-mono text-[11px] text-muted tracking-[0.3em] mb-6">
              THE INTELLIGENCE LAYER
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-bone leading-[1.05] tracking-tightest">
              See your revenue leak
              <br />
              <span className="italic text-signal/90">before we talk.</span>
            </h2>
            <p className="mt-8 text-bone/60 max-w-xl mx-auto leading-relaxed">
              The Revenue Intelligence System&trade; reads six signals from
              your brand and returns your structural leak, the patterns
              driving it, and the behavioral insights behind each
              &mdash;in under 90 seconds.
            </p>
          </header>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-6 md:gap-10 items-stretch max-w-[1080px] mx-auto">
            <div className="relative group">
              {/* Conic halo pulse behind the card to pull the eye */}
              <div
                aria-hidden
                className="absolute -inset-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-lg animate-pulseSoft pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 180deg at 50% 50%, #5B7FFF 0%, #67E8F9 25%, #5B7FFF 50%, #67E8F9 75%, #5B7FFF 100%)",
                }}
              />

              <button
                type="button"
                onClick={onOpen}
                className="relative group/btn w-full text-left border border-signal/40 bg-obsidian hover:border-signal transition-all p-6 md:p-8 overflow-hidden"
              >
                {/* Scanline shimmer on hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 30%, rgba(103,232,249,0.08) 50%, transparent 70%)",
                    backgroundSize: "200% 200%",
                    animation: "shimmer 2.5s ease-in-out infinite",
                  }}
                />

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-signal" />
                    </span>
                    <p className="font-mono text-[11px] text-signal tracking-widest">
                      ▶ RUN THE DIAGNOSIS
                    </p>
                  </div>
                  <p className="font-mono text-[10px] text-amber tracking-widest px-2 py-1 border border-amber/40 rounded">
                    FREE · 90 SEC
                  </p>
                </div>

                <PreviewPanel />

                <div className="mt-6 pt-5 border-t border-panel flex items-center justify-between gap-4">
                  <div>
                    <p className="font-serif text-xl md:text-2xl text-bone">
                      Open the system
                    </p>
                    <p className="font-mono text-[10px] text-muted tracking-widest mt-1">
                      CLIENT-SIDE · NO LOGIN · NO DATA STORED
                    </p>
                  </div>
                  <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-signal flex items-center justify-center text-black font-mono text-lg group-hover/btn:scale-110 group-hover/btn:translate-x-1 transition-transform shadow-[0_10px_30px_rgba(103,232,249,0.4)]">
                    →
                  </div>
                </div>
              </button>
            </div>

            <div className="border border-panel bg-obsidian p-8 md:p-10 flex flex-col">
              <p className="font-mono text-[10px] text-bone tracking-widest mb-6">
                ▶ PREFER A LIVE CONVERSATION?
              </p>

              <h3 className="font-serif text-3xl md:text-4xl text-bone leading-tight mb-6">
                Skip the tool.
                <br />
                <span className="italic text-bone/70">Book the audit.</span>
              </h3>

              <p className="text-bone/70 leading-relaxed mb-8 flex-1">
                45 minutes with a BinaryGen operator who runs the BGR framework
                on your brand, live. No pitch. We&rsquo;ll leave you with a
                diagnosis and a rebuild priority list&mdash;regardless of
                whether we work together.
              </p>

              <ul className="space-y-2 font-mono text-xs text-bone/60 mb-8">
                <li>→ Live diagnosis on your real numbers</li>
                <li>→ Rebuild priority list you can act on</li>
                <li>→ Zero sales pitch, zero obligation</li>
              </ul>

              <BookCallButton
                variant="primary"
                className="w-full"
                utm={{
                  utm_source: "site",
                  utm_medium: "tool_entry",
                  utm_campaign: "bgr_audit",
                  utm_content: "parallel_cta",
                }}
              >
                → Book a Strategy Call
              </BookCallButton>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={240}>
          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 font-mono text-[11px] text-muted">
            <span>→ No login. No data stored.</span>
            <span>→ Runs client-side only.</span>
            <span>→ 40+ DTC brands · $14M+ tracked.</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function PreviewPanel() {
  return (
    <div className="border border-panel bg-obsidian/90 p-4 md:p-5 font-mono text-[11px] leading-relaxed text-bone/80 relative">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-panel">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulseSoft" />
          <span className="text-[9px] text-muted tracking-widest">
            SAMPLE OUTPUT · DTC SKINCARE
          </span>
        </div>
        <span className="text-[9px] text-amber tracking-widest">LIVE</span>
      </div>

      <div className="space-y-1 text-[11px]">
        <p className="text-bone/60">&gt; analyzing retention patterns</p>
        <p className="pl-4 text-bone/80">├─ half-life: 34 days</p>
        <p className="pl-4 text-bone/80">
          └─ LTV realization: <span className="text-signal">38%</span>
        </p>
        <p className="text-bone/60 mt-2">&gt; detecting revenue leaks</p>
        <p className="pl-4 text-bone/80">├─ post-purchase leak: MISSING</p>
        <p className="pl-4 text-bone/80">└─ winback: MISALIGNED (−45d)</p>
      </div>

      <div className="mt-5 pt-4 border-t border-panel flex items-end justify-between gap-3">
        <div>
          <p className="text-[9px] text-muted tracking-widest mb-1">
            ESTIMATED LEAK
          </p>
          <p className="font-mono text-3xl md:text-4xl text-signal leading-none">
            $64,200
            <span className="text-sm md:text-base text-bone/60 ml-1">/mo</span>
          </p>
        </div>
        <p className="font-mono text-[9px] text-amber tracking-widest pb-1">
          +$770K / YR
        </p>
      </div>
    </div>
  );
}
