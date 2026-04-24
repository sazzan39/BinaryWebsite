import { FadeIn } from "@/components/primitives/FadeIn";

const PHASES = [
  {
    id: "01",
    window: "DAY 1 — 7",
    title: "Diagnose",
    subtitle: "We read your economics before we touch anything.",
    body: "Account forensics across your ESP, Shopify, and GA4. Cohort analysis: repurchase half-life by SKU, by acquisition source, by margin tier. We identify the three largest structural leaks and the order in which they compound.",
    deliverables: [
      "Revenue topology map",
      "Cohort decay curves",
      "Leak prioritization",
    ],
    moves: "CAC pressure diagnosed",
  },
  {
    id: "02",
    window: "DAY 7 — 14",
    title: "Architect",
    subtitle: "Flow maps, segmentation logic, and copy direction.",
    body: "Behavioral segmentation across 4–6 customer tiers, not just purchased/not-purchased. Flow architecture keyed to each segment's decay window. Offer logic, pricing ladders, and copy direction signed off before a single asset is built.",
    deliverables: [
      "Segmentation blueprint",
      "Flow architecture document",
      "Copy + offer strategy",
    ],
    moves: "Retention engine designed",
  },
  {
    id: "03",
    window: "DAY 14 — 28",
    title: "Build",
    subtitle: "Deploy the retention funnel in your ESP.",
    body: "Full flow buildout: welcome, browse, abandon, post-purchase, replenishment, winback, VIP, dormant reactivation. Copy, design, and logic deployed in parallel. Staged A/B splits where signal-to-noise allows, not where it doesn't.",
    deliverables: [
      "All flows live & QA'd",
      "A/B framework installed",
      "Handoff + training doc",
    ],
    moves: "Retention revenue compounding",
  },
  {
    id: "04",
    window: "DAY 28 — 45+",
    title: "Compound",
    subtitle: "Optimize by margin per send, not open rate.",
    body: "Weekly iteration on the flows that matter — usually Replenishment, Winback, and Post-Purchase. Margin-first sequencing: we measure contribution per send, not engagement vanity. The compounding begins in month two, not week two.",
    deliverables: [
      "Weekly iteration loop",
      "Margin-per-send dashboard",
      "Quarterly teardown",
    ],
    moves: "LTV compounding. CAC pressure ↓",
  },
];

export function RetentionFunnel() {
  return (
    <section id="funnel" className="py-20 md:py-24 px-6 border-t border-panel">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <header className="text-center mb-12 md:mb-14">
            <p className="font-mono text-[11px] text-muted tracking-[0.3em] mb-6">
              THE PROCESS
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-bone leading-[1.05] tracking-tightest">
              The Retention Funnel.
              <br />
              <span className="italic text-bone/70">
                45 days to compounding economics.
              </span>
            </h2>
            <p className="mt-8 max-w-xl mx-auto text-bone/60 leading-relaxed">
              Every BinaryGen engagement runs the same sequence&mdash;diagnose
              first, architect second, build third, compound fourth. No tactics
              are deployed until the phase before is closed.
            </p>
          </header>
        </FadeIn>

        <div className="relative">
          <div
            aria-hidden
            className="hidden md:block absolute left-[27px] top-8 bottom-8 w-px bg-gradient-to-b from-signal/60 via-panel to-panel"
          />

          <div className="space-y-6 md:space-y-12">
            {PHASES.map((p, i) => (
              <FadeIn key={p.id} delay={i * 100}>
                <PhaseRow phase={p} />
              </FadeIn>
            ))}
          </div>
        </div>

        <FadeIn delay={200}>
          <div className="mt-20 border-t border-panel pt-12 text-center">
            <p className="font-serif italic text-2xl md:text-3xl text-bone/80 max-w-2xl mx-auto leading-snug">
              &ldquo;45 days to rebuild the engine. The rest is compounding.&rdquo;
            </p>
            <p className="mt-4 font-mono text-[11px] text-muted tracking-widest">
              — BINARYGEN · OPERATING PRINCIPLE
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function PhaseRow({ phase }: { phase: (typeof PHASES)[number] }) {
  return (
    <div className="grid md:grid-cols-[56px_1fr] gap-4 md:gap-10 items-start">
      <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-4">
        <div className="relative w-14 h-14 border border-signal/60 flex items-center justify-center bg-obsidian shrink-0 group">
          <span className="font-mono text-sm text-signal">{phase.id}</span>
          <span
            aria-hidden
            className="absolute inset-0 border border-signal opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <p className="md:hidden font-mono text-[10px] text-muted tracking-widest">
          {phase.window}
        </p>
      </div>

      <article className="border border-panel bg-panel/20 p-6 md:p-10 hover:border-signal/30 transition-colors">
        <div className="hidden md:flex items-center gap-4 mb-5">
          <p className="font-mono text-[10px] text-muted tracking-widest">
            {phase.window}
          </p>
          <div className="flex-1 h-px bg-panel" />
        </div>

        <h3 className="font-serif text-3xl md:text-4xl text-bone leading-tight">
          {phase.title}
        </h3>
        <p className="mt-3 text-bone/70 font-serif italic text-lg md:text-xl">
          {phase.subtitle}
        </p>

        <p className="mt-6 text-bone/70 leading-relaxed max-w-2xl">
          {phase.body}
        </p>

        <div className="mt-8 grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 pt-6 border-t border-panel">
          <div>
            <p className="font-mono text-[10px] text-muted tracking-widest mb-3">
              DELIVERABLES
            </p>
            <ul className="space-y-1">
              {phase.deliverables.map((d) => (
                <li
                  key={d}
                  className="font-mono text-xs text-bone/80 flex items-start gap-2"
                >
                  <span className="text-signal">→</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:text-right md:min-w-[200px]">
            <p className="font-mono text-[10px] text-muted tracking-widest mb-3">
              WHAT MOVES
            </p>
            <p className="font-mono text-sm text-signal">{phase.moves}</p>
          </div>
        </div>
      </article>
    </div>
  );
}
