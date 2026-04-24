import { BookCallButton } from "./BookCallButton";
import { VSLPlayer } from "./VSLPlayer";

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-32 md:pt-36 pb-16 md:pb-20 px-6 overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 900px 700px at 50% -240px, rgba(91,127,255,0.14), transparent 70%), radial-gradient(ellipse 700px 500px at 20% 40%, rgba(103,232,249,0.06), transparent 60%)",
        }}
      />

      <div className="max-w-[1100px] mx-auto text-center relative z-10">
        <UrgencyPill />

        <h1 className="mt-8 font-serif text-[44px] sm:text-6xl md:text-7xl lg:text-[88px] leading-[1.02] tracking-tightest text-bone">
          Your CAC keeps rising
          <br />
          because your <span className="italic">LTV</span> isn&rsquo;t{" "}
          <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber via-signal to-amber">
            engineered.
          </span>
        </h1>

        <p className="mt-10 text-lg md:text-xl text-bone/60 max-w-xl mx-auto leading-relaxed">
          You&rsquo;re paying more to acquire customers&mdash;but not
          increasing what each customer is worth. We rebuild the economics.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#diagnose"
            className="h-16 md:h-20 px-10 md:px-14 rounded-full flex items-center justify-center bg-amber text-white font-semibold text-base md:text-lg tracking-wide hover:bg-amber/90 transition-all hover:scale-[1.02] shadow-[0_20px_60px_rgba(91,127,255,0.35)]"
          >
            Run the Free Diagnosis →
          </a>
          <BookCallButton
            variant="ghost"
            utm={{
              utm_source: "site",
              utm_medium: "hero",
              utm_campaign: "bgr_audit",
              utm_content: "secondary_cta",
            }}
          >
            Or book a strategy call
          </BookCallButton>
        </div>

        <p className="mt-8 font-mono text-[11px] text-muted tracking-wide">
          Deployed across 64+ DTC brands · $14M+ in recovered revenue tracked
        </p>

        <div className="mt-10 md:mt-12 mx-auto max-w-[960px] shadow-[0_40px_120px_rgba(91,127,255,0.10)]">
          <VSLPlayer />
        </div>

        <StackStrip />
      </div>
    </section>
  );
}

function UrgencyPill() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-panel/80 backdrop-blur-sm border border-amber/30 hover:border-amber/60 transition-colors">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber" />
      </span>
      <span className="font-mono text-[11px] text-bone/90 tracking-wide">
        Only 3 audit spots left this month.
      </span>
    </div>
  );
}

function StackStrip() {
  const items = [
    { label: "KLAVIYO", hint: "Flow architecture" },
    { label: "SHOPIFY", hint: "Revenue source" },
    { label: "META ADS", hint: "CAC pressure" },
    { label: "GA4", hint: "Attribution" },
    { label: "TRIPLE WHALE", hint: "Cohort data" },
  ];

  return (
    <div className="mt-16 pt-10 border-t border-bone/5">
      <p className="font-mono text-[10px] text-muted tracking-[0.3em] mb-8">
        WE OPERATE ACROSS YOUR STACK
      </p>
      <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6">
        {items.map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-mono text-sm text-bone/70 tracking-wider">
              {item.label}
            </p>
            <p className="mt-1 font-mono text-[10px] text-muted">
              {item.hint}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
