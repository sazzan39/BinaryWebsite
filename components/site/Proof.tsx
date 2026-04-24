import { FadeIn } from "@/components/primitives/FadeIn";
import { YouTubeCard } from "@/components/primitives/YouTubeCard";

export function Proof() {
  return (
    <section id="proof" className="py-20 md:py-24 px-6 border-t border-panel">
      <div className="max-w-[1200px] mx-auto">
        <FadeIn>
          <header className="text-center mb-10 md:mb-14">
            <p className="font-mono text-[11px] text-muted tracking-[0.3em] mb-6">
              04 — PROOF
            </p>
            <h2 className="font-serif text-4xl md:text-6xl text-bone leading-[1.05] tracking-tightest">
              The numbers, uncropped.
              <br />
              <span className="italic text-bone/70">
                The founders, on camera.
              </span>
            </h2>
          </header>
        </FadeIn>

        <ShopifyBeforeAfter />
        <VideoTestimonials />
        <CaseStudies />
      </div>
    </section>
  );
}

// Shopify / Klaviyo dashboard — BEFORE vs AFTER screenshots

function ShopifyBeforeAfter() {
  const comparisons = [
    {
      duration: "90 DAYS",
      metric: "Email revenue share",
      beforeValue: "$5,400 / mo",
      afterValue: "$24,200 / mo",
      delta: "+343%",
    },
    {
      duration: "6 MONTHS",
      metric: "90-day customer LTV",
      beforeValue: "$68",
      afterValue: "$142",
      delta: "+108%",
    },
    {
      duration: "12 MONTHS",
      metric: "Blended CAC",
      beforeValue: "$52",
      afterValue: "$38",
      delta: "−27%",
    },
  ];

  return (
    <div className="mb-16 md:mb-20">
      <FadeIn>
        <div className="text-center mb-8 md:mb-10">
          <p className="font-mono text-[10px] text-muted tracking-widest mb-3">
            PROOF · 01 — BEFORE vs AFTER
          </p>
          <h3 className="font-serif text-3xl md:text-4xl text-bone">
            The numbers, uncropped.
          </h3>
        </div>
      </FadeIn>

      <div className="border border-panel bg-panel/10 divide-y divide-panel">
        {comparisons.map((c, i) => (
          <FadeIn key={c.metric} delay={i * 80}>
            <BeforeAfterRow
              metric={c.metric}
              duration={c.duration}
              beforeValue={c.beforeValue}
              afterValue={c.afterValue}
              delta={c.delta}
            />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function BeforeAfterRow({
  metric,
  duration,
  beforeValue,
  afterValue,
  delta,
}: {
  metric: string;
  duration: string;
  beforeValue: string;
  afterValue: string;
  delta: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_auto] items-center gap-3 md:gap-6 px-5 md:px-8 py-5 md:py-6 hover:bg-panel/30 transition-colors group">
      <div className="flex items-center justify-between md:block">
        <p className="font-mono text-[11px] text-bone/80 tracking-widest uppercase">
          {metric}
        </p>
        <p className="md:mt-1 font-mono text-[9px] text-muted tracking-widest">
          {duration}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-mono text-[9px] text-muted tracking-widest shrink-0">
          BEFORE
        </span>
        <span className="font-serif text-xl md:text-2xl text-bone/40">
          {beforeValue}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="font-mono text-[9px] text-amber tracking-widest shrink-0">
          AFTER
        </span>
        <span className="font-serif text-xl md:text-2xl text-bone group-hover:text-signal transition-colors">
          {afterValue}
        </span>
      </div>

      <div className="md:ml-auto">
        <span className="font-mono text-xs text-amber px-2.5 py-1.5 border border-amber/40 rounded whitespace-nowrap">
          {delta}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// YouTube Shorts testimonials (9:16 vertical)
// ─────────────────────────────────────────────────────────────
function VideoTestimonials() {
  const videos: { videoId: string; quote?: string; duration?: string }[] = [
    {
      videoId: "Azw5u1ChjBo",
      
      duration: "0:58",
    },
    {
      videoId: "ElsY79XAfrY",
      duration: "0:47",
    },
    {
      videoId: "YnTypVQVBRA",
      duration: "0:52",
    },
  ];

  return (
    <div className="mb-16 md:mb-20">
      <FadeIn>
        <div className="text-center mb-8 md:mb-10">
          <p className="font-mono text-[10px] text-muted tracking-widest mb-3">
            PROOF · 02 — FOUNDERS ON CAMERA
          </p>
          <h3 className="font-serif text-3xl md:text-4xl text-bone">
            What founders say.
          </h3>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-[900px] mx-auto">
        {videos.map((v, i) => (
          <FadeIn key={v.videoId} delay={i * 100}>
            <YouTubeCard
              videoId={v.videoId}
              quote={v.quote}
              duration={v.duration}
              short
            />
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Case dossiers
// ─────────────────────────────────────────────────────────────
function CaseStudies() {
  const cases = [
    {
      id: "004",
      vertical: "APPAREL · D2C",
      before: "CAC: $74 · LTV: $112 · Ratio: 1.5×",
      problem: "Repeat rate stagnant at 17% for 9 months.",
      diagnosis:
        "Post-purchase architecture missing. Email revenue concentrated in abandon cart only. No segmentation past first order. Winback firing at day 120 — past the median reactivation window.",
      rebuild:
        "Deployed 6-flow architecture, behavioral segmentation across 4 buyer personas, winback recalibrated to day 45.",
      after: "CAC: $58 · LTV: $240 · Ratio: 4.1×",
      result: "Repeat rate: 17% → 38% in 84 days.",
    },
    {
      id: "007",
      vertical: "SKINCARE · DTC",
      before: "CAC: $48 · LTV: $92 · Ratio: 1.9×",
      problem: "90-day LTV flat despite 34% YoY acquisition growth.",
      diagnosis:
        "Single welcome flow. No replenishment logic despite 42-day avg repurchase cycle. Dormant segment never addressed.",
      rebuild:
        "Replenishment flow keyed to SKU-level cycles, dormant reactivation at day 38, VIP segment built from top 5% LTV cohort.",
      after: "CAC: $46 · LTV: $198 · Ratio: 4.3×",
      result: "365-day LTV +115%, replenishment = 19% of email revenue.",
    },
    {
      id: "011",
      vertical: "SUPPLEMENTS · D2C",
      before: "CAC: $62 · LTV: $84 · Ratio: 1.4×",
      problem: "Paid channels margin-negative past 90 days.",
      diagnosis:
        "Email at 7% of revenue. No subscription incentive layer. Post-purchase education absent — customers didn't understand the repurchase logic of the product.",
      rebuild:
        "Education-first post-purchase flow (5 emails over 21 days), subscription offer gated at day 35, winback at day 58.",
      after: "CAC: $44 · LTV: $218 · Ratio: 5.0×",
      result: "Subscription share: 6% → 31%. Blended CAC dropped 29%.",
    },
  ];

  return (
    <div>
      <FadeIn>
        <div className="text-center mb-10 md:mb-12">
          <p className="font-mono text-[10px] text-muted tracking-widest mb-3">
            PROOF · 04 — CASE DOSSIERS
          </p>
          <h3 className="font-serif text-3xl md:text-4xl text-bone">
            Three diagnoses. Three rebuilds.
          </h3>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
        {cases.map((c, i) => (
          <FadeIn key={c.id} delay={i * 120}>
            <article className="border border-panel p-7 md:p-8 hover:border-amber/40 transition-all hover:-translate-y-1 duration-300 h-full bg-panel/20">
              <div className="flex items-center justify-between pb-5 border-b border-panel mb-5">
                <p className="font-mono text-[10px] text-muted tracking-widest">
                  CASE · {c.id}
                </p>
                <p className="font-mono text-[10px] text-bone/70 tracking-widest">
                  {c.vertical}
                </p>
              </div>

              <Section label="BEFORE">
                <p className="font-mono text-xs text-bone/80">{c.before}</p>
                <p className="mt-2 text-sm text-bone/60 leading-snug">
                  {c.problem}
                </p>
              </Section>

              <Section label="DIAGNOSIS">
                <p className="text-sm text-bone/70 leading-relaxed">
                  {c.diagnosis}
                </p>
              </Section>

              <Section label="REBUILD">
                <p className="text-sm text-bone/70 leading-relaxed">
                  {c.rebuild}
                </p>
              </Section>

              <Section label="AFTER" accent>
                <p className="font-mono text-xs text-amber">{c.after}</p>
                <p className="mt-2 text-sm text-bone/80 leading-snug">
                  {c.result}
                </p>
              </Section>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

function Section({
  label,
  children,
  accent,
}: {
  label: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className="mb-5 last:mb-0">
      <p
        className={`font-mono text-[10px] tracking-widest mb-2.5 ${
          accent ? "text-amber" : "text-muted"
        }`}
      >
        {label}
      </p>
      {children}
    </div>
  );
}
