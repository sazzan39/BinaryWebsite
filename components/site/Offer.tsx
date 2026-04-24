import { BookCallButton } from "./BookCallButton";
import { FadeIn } from "@/components/primitives/FadeIn";

export function Offer() {
  return (
    <section id="offer" className="py-20 md:py-24 px-6 border-t border-panel">
      <div className="max-w-[1100px] mx-auto">
        <FadeIn>
          <header className="text-center mb-12 md:mb-16">
            <p className="font-mono text-[11px] text-muted tracking-[0.3em] mb-5">
              NEXT STEP
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-bone leading-[1.05] tracking-tightest">
              Book the BGR Audit.
            </h2>
            <p className="mt-6 text-bone/60 max-w-xl mx-auto leading-relaxed">
              A live, founder-led 45-minute session. Zero pitch. You leave with
              a diagnosis and a rebuild priority list&mdash;regardless of
              whether we work together.
            </p>
          </header>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="grid md:grid-cols-[1.15fr_1fr] gap-6 md:gap-8 items-stretch">
            <WhatToExpect />
            <AuditCard />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function WhatToExpect() {
  const steps = [
    {
      id: "00",
      time: "0 — 5 min",
      title: "Context load",
      body: "We read your revenue, AOV, and stack before the call. You spend zero time explaining the basics.",
    },
    {
      id: "01",
      time: "5 — 20 min",
      title: "Live diagnosis",
      body: "We walk your flows, cohort data, and decay curves on screen. Three largest structural leaks surface, in order of compounding value.",
    },
    {
      id: "02",
      time: "20 — 35 min",
      title: "Rebuild priority",
      body: "A phased rebuild roadmap scoped to your actual margin envelope—what to fix first, why, and what it's worth in LTV.",
    },
    {
      id: "03",
      time: "35 — 45 min",
      title: "Your questions",
      body: "Honest Q&A on whether you need us at all. Often you don't. If you do, we'll say so plainly.",
    },
  ];

  return (
    <div className="border border-panel bg-panel/30 p-7 md:p-10">
      <p className="font-mono text-[10px] text-muted tracking-widest mb-6">
        WHAT TO EXPECT
      </p>

      <div className="space-y-6">
        {steps.map((s, i) => (
          <div key={s.id} className="flex gap-4 md:gap-5">
            <div className="shrink-0 flex flex-col items-center">
              <span className="font-mono text-[10px] text-amber tracking-widest">
                {s.id}
              </span>
              {i < steps.length - 1 && (
                <span className="flex-1 w-px bg-panel mt-2" />
              )}
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <p className="font-sans font-semibold text-bone">{s.title}</p>
                <p className="font-mono text-[10px] text-muted tracking-widest shrink-0">
                  {s.time}
                </p>
              </div>
              <p className="text-sm text-bone/65 leading-relaxed">{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AuditCard() {
  return (
    <div className="border border-panel bg-obsidian p-7 md:p-10 flex flex-col relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(91,127,255,0.18), transparent 70%)" }}
      />

      <div className="relative">
        <div className="flex items-center justify-between pb-5 border-b border-panel mb-6">
          <p className="font-mono text-xs text-bone tracking-widest">
            BGR AUDIT
          </p>
          <p className="font-mono text-xs text-amber">45 MIN · FREE</p>
        </div>

        <ul className="space-y-3 mb-8">
          {[
            "Diagnosis of your 3 largest unit-economic leaks",
            "Live walkthrough of your flows, on your numbers",
            "Phased rebuild roadmap — priority-ordered",
            "No pitch. No slide deck.",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-sm text-bone/85 leading-snug">
              <span className="text-amber shrink-0 mt-0.5">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-panel pt-5 mb-7">
          <p className="font-mono text-[10px] text-muted tracking-widest mb-3">
            NOT FOR
          </p>
          <ul className="space-y-1.5 text-xs text-bone/55 leading-relaxed">
            <li>— Brands under $25k/mo revenue</li>
            <li>— Brands looking for &ldquo;more emails&rdquo;</li>
            <li>— Brands unwilling to examine unit economics</li>
          </ul>
        </div>

        <BookCallButton
          variant="jumbo"
          className="w-full"
          utm={{
            utm_source: "site",
            utm_medium: "offer",
            utm_campaign: "bgr_audit",
          }}
        >
          Book the Audit →
        </BookCallButton>

        <p className="mt-4 text-center font-mono text-[10px] text-muted tracking-widest">
          6 SLOTS PER MONTH · NO CREDIT CARD
        </p>
      </div>
    </div>
  );
}
