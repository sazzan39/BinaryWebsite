import { CountUp } from "@/components/primitives/CountUp";

export function Reframe() {
  return (
    <section id="reframe" className="py-32 px-6 border-t border-panel">
      <div className="max-w-[960px] mx-auto text-center">
        <p className="font-mono text-[11px] text-muted tracking-[0.3em] mb-10">
          03 — REFRAME
        </p>

        <h2 className="font-serif text-4xl md:text-6xl text-bone leading-[1.05]">
          Stop optimizing for growth.
          <br />
          <span className="italic">Start optimizing for unit economics.</span>
        </h2>

        <p className="mt-10 text-bone/60 max-w-xl mx-auto leading-relaxed">
          Growth is a vanity layer. Unit economics is the operating system
          underneath it. When LTV compounds faster than CAC, growth becomes
          inevitable&mdash;and cheap. When it doesn&rsquo;t, no amount of paid
          traffic will save the P&amp;L.
        </p>

        <div className="mt-20 grid grid-cols-3 gap-px bg-panel border border-panel">
          <Stat value={2.4} suffix="×" label="Avg LTV uplift, 90 days" />
          <Stat value={37} suffix="%" prefix="−" label="CAC pressure reduction" />
          <Stat value={61} suffix="%" prefix="+" label="Repeat rate increase" />
        </div>

        <p className="mt-6 font-mono text-[11px] text-muted">
          Source: BinaryGen portfolio data, n=40 DTC brands, 2023&ndash;2025
        </p>
      </div>
    </section>
  );
}

function Stat({
  value,
  prefix,
  suffix,
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="bg-obsidian py-12 px-6">
      <p className="font-mono text-5xl md:text-6xl text-signal">
        {prefix}
        <CountUp to={value} />
        {suffix}
      </p>
      <p className="mt-4 font-mono text-[11px] text-muted tracking-widest">
        {label.toUpperCase()}
      </p>
    </div>
  );
}
