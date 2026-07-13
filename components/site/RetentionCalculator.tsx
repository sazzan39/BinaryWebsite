"use client";

import { useState } from "react";

/**
 * Retention audit — a small interactive estimate of the retention revenue a
 * brand is leaving on the table. Two inputs, one honest number. Benchmarks
 * against a 35% email-revenue share (typical for a well-run account).
 */

const BENCHMARK = 0.35; // healthy share of revenue from email

const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(n)));

export function RetentionCalculator() {
  const [revenue, setRevenue] = useState(150000);
  const [share, setShare] = useState(10); // current % of revenue from email

  const gapShare = Math.max(0, BENCHMARK - share / 100);
  const monthlyGap = revenue * gapShare;
  const annualGap = monthlyGap * 12;

  return (
    <section id="audit" className="px-6 py-24 md:py-32 bg-white border-y border-[#EAE7DF]">
      <div className="max-w-[980px] mx-auto">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#1E2A54]">
          Retention audit
        </p>
        <h2 className="mt-5 max-w-2xl text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.02em] font-medium">
          See what you&rsquo;re leaving on the table.
        </h2>
        <p className="mt-5 max-w-xl text-[17px] leading-[1.6] text-[#5A564C]">
          Two numbers. A rough estimate of the revenue a well-run email program
          could be recovering for you.
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-8 items-stretch">
          {/* Inputs */}
          <div className="rounded-2xl border border-[#E6E3DB] bg-[#FAFAF9] p-8 md:p-10 flex flex-col gap-8">
            <label className="block">
              <span className="text-[14px] font-medium text-[#38352E]">
                Your monthly revenue
              </span>
              <div className="mt-3 flex items-center rounded-xl border border-[#D8D4C9] bg-white px-4 h-14 focus-within:border-[#1E2A54] transition-colors">
                <span className="text-[#8A8578] text-[18px]">$</span>
                <input
                  type="number"
                  min={0}
                  step={5000}
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value) || 0)}
                  className="w-full ml-2 bg-transparent outline-none text-[18px] tabular-nums text-[#12100E]"
                />
                <span className="text-[#B7B2A6] text-[13px]">/mo</span>
              </div>
            </label>

            <label className="block">
              <div className="flex items-baseline justify-between">
                <span className="text-[14px] font-medium text-[#38352E]">
                  Revenue from email today
                </span>
                <span className="text-[16px] font-medium tabular-nums text-[#1E2A54]">
                  {share}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                step={1}
                value={share}
                onChange={(e) => setShare(Number(e.target.value))}
                className="mt-4 w-full accent-[#1E2A54]"
              />
              <div className="mt-2 flex justify-between font-mono text-[10px] text-[#B7B2A6]">
                <span>0%</span>
                <span>40%</span>
              </div>
            </label>
          </div>

          {/* Result */}
          <div className="rounded-2xl border border-[#1E2A54] bg-[#1E2A54] text-[#FAFAF9] p-8 md:p-10 flex flex-col">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#9AA6C8]">
              Estimated gap
            </p>
            <div className="mt-6">
              <div className="text-5xl md:text-6xl font-medium tracking-[-0.03em] tabular-nums leading-none">
                {money(annualGap)}
              </div>
              <p className="mt-3 text-[15px] text-[#C3CADD]">
                a year you could be recovering
              </p>
            </div>
            <p className="mt-6 text-[15px] text-[#C3CADD]">
              About{" "}
              <span className="text-white font-medium">{money(monthlyGap)}</span>{" "}
              a month, if email went from {share}% to a healthy 35% of revenue.
            </p>
            <a
              href="#book"
              className="mt-auto pt-8 inline-flex items-center gap-2 text-[15px] font-medium text-white hover:gap-3 transition-all"
            >
              Get the real audit on a call →
            </a>
          </div>
        </div>

        <p className="mt-6 font-mono text-[11px] text-[#B7B2A6]">
          Rough estimate against a 35% email-revenue benchmark. Your real number
          depends on your list, margins, and repeat rate — that&rsquo;s what the
          call is for.
        </p>
      </div>
    </section>
  );
}
