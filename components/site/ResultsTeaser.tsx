import Link from "next/link";


type Case = {
  href: string;
  vertical: string;
  headline: string;
  stats: { v: string; l: string }[];
};

const CASES: Case[] = [
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
    <section id="results" className="bg-[#FAFAF9] text-[#12100E] py-24 md:py-32 px-6">
      <div className="max-w-[1120px] mx-auto">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#8A8578]">
          Results
        </p>
        <h2 className="mt-5 text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.02em] font-medium max-w-xl">
          Real accounts. Numbers you can check.
        </h2>
        <p className="mt-4 text-[15px] text-[#8A8578]">
          Click any card to open the full case study.
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {CASES.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="group relative flex flex-col rounded-2xl border border-[#E6E3DB] bg-white p-8 md:p-10 transition-all hover:border-[#1E2A54]/30 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_30px_70px_-30px_rgba(0,0,0,0.22)]"
            >
              {/* corner navigation arrow */}
              <span className="absolute top-6 right-6 h-9 w-9 rounded-full border border-[#E6E3DB] flex items-center justify-center text-[#1E2A54] transition-all group-hover:bg-[#1E2A54] group-hover:text-white group-hover:border-[#1E2A54]">
                <span className="-mt-px transition-transform group-hover:rotate-0 group-hover:translate-x-px">↗</span>
              </span>

              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#1E2A54]">
                {c.vertical}
              </p>
              <h3 className="mt-5 pr-10 text-[24px] md:text-[28px] leading-[1.14] tracking-[-0.02em] font-medium">
                {c.headline}
              </h3>

              <div className="mt-auto pt-10 grid grid-cols-3 gap-4">
                {c.stats.map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl md:text-3xl font-medium tracking-[-0.03em] tabular-nums">
                      {s.v}
                    </div>
                    <p className="mt-1 text-[12px] leading-tight text-[#6B665B]">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>

              <span className="mt-8 inline-flex items-center justify-center gap-2 h-11 px-5 self-start rounded-full bg-[#1E2A54] text-white text-[14px] font-medium transition-colors group-hover:bg-[#141C3B]">
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
