import Link from "next/link";


type Case = {
  href: string;
  vertical: string;
  headline: string;
  stats: { v: string; l: string }[];
};

const CASES: Case[] = [
  {
    href: "/work/fashion-revenue-scaling",
    vertical: "Fashion & Apparel",
    headline: "How we added $230K in Klaviyo revenue without new traffic or extra discounts.",
    stats: [
      { v: "$230K+", l: "email revenue" },
      { v: "56%", l: "from flows" },
      { v: "+$48K", l: "monthly lift" },
    ],
  },
  {
    href: "/work/fashion-accessories",
    vertical: "Fashion & Accessories",
    headline: "From a messy in-house setup to nearly half of revenue from email.",
    stats: [
      { v: "47%", l: "revenue from email" },
      { v: "+204%", l: "email, YoY" },
      { v: "23.6%", l: "returning rate" },
    ],
  },
  {
    href: "/work/health-supplement",
    vertical: "Health & Supplement",
    headline: "From €0 to nearly a third of revenue through email.",
    stats: [
      { v: "30.5%", l: "revenue from email" },
      { v: "€124K", l: "email revenue" },
      { v: "95.8%", l: "from flows" },
    ],
  },
];

export function ResultsTeaser() {
  return (
    <section id="results" className="bg-bg text-ink py-24 md:py-32 px-6 border-t border-linesoft">
      <div className="max-w-[1120px] mx-auto text-center">
        <h2 className="mx-auto text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.02em] font-medium max-w-2xl">
          Case Studies &amp; Results
        </h2>
        <p className="mt-4 text-[15px] text-subtle">
          Click any card to open the full case study.
        </p>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASES.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group relative flex flex-col items-center text-center rounded-2xl border border-line bg-card p-6 md:p-8 transition-all hover:border-navy/30 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_30px_70px_-30px_rgba(0,0,0,0.22)]"
            >
              {/* corner navigation arrow */}
              <span className="absolute top-6 right-6 h-9 w-9 rounded-full border border-line flex items-center justify-center text-navy transition-all group-hover:bg-navy group-hover:text-white group-hover:border-navy">
                <span className="-mt-px transition-transform group-hover:rotate-0 group-hover:translate-x-px">↗</span>
              </span>

              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-navy">
                {c.vertical}
              </p>
              <h3 className="mt-5 px-2 md:px-3 text-[20px] md:text-[22px] leading-[1.2] tracking-[-0.02em] font-medium">
                {c.headline}
              </h3>

              <div className="mt-auto pt-8 w-full grid grid-cols-3 gap-2">
                {c.stats.map((s) => (
                  <div key={s.l}>
                    <div className="text-xl md:text-2xl font-medium tracking-[-0.03em] tabular-nums">
                      {s.v}
                    </div>
                    <p className="mt-1 text-[11px] leading-tight text-body2">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>

              <span className="mt-8 inline-flex items-center justify-center gap-2 h-11 px-5 self-center rounded-full bg-navy text-white text-[14px] font-medium transition-colors group-hover:bg-navydeep">
                View full case study
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
