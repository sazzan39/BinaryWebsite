"use client";

import { useEffect, useRef, useState } from "react";

import { CountUp } from "@/components/site/CountUp";

/**
 * "Most email agencies do the opposite of this" — the same seven capabilities
 * that were in the comparison table, restyled as a scorecard and animated.
 *
 * Rows reveal in sequence once the section scrolls into view: each rises and
 * fades in on a stagger, its verdict marks land just behind it (the cross
 * fading in flat, the check drawing its own stroke), the meter fills to 7/7 and
 * the tally counts up with it. One IntersectionObserver fires the whole thing;
 * everything after that is CSS, so no work happens per frame. Under
 * prefers-reduced-motion the reveal is instant and nothing moves.
 */
type Row = { feature: string; description: string };

const ROWS: Row[] = [
  {
    feature: "No Long-Term Contracts",
    description: "Month-to-month partnership. We earn our seat every month.",
  },
  {
    feature: "Ecommerce Retention Specialists",
    description: "100% focused on Klaviyo email & SMS for growing DTC brands.",
  },
  {
    feature: "Transparent Pricing",
    description:
      "Predictable flat pricing with no hidden fees or spend surcharges.",
  },
  {
    feature: "Clear Scope of Work",
    description:
      "Documented weekly sprints, launch dates, and measurable deliverables.",
  },
  {
    feature: "Dedicated Senior Team For Your Brand",
    description:
      "Experienced retention operators on your account, not junior trainees.",
  },
  {
    feature: "Quality Assurance & Deliverability",
    description:
      "Inbox placement audits, dedicated domain warmup, and pixel-perfect design.",
  },
  {
    feature: "Behavioral Segmentation & Automated Flows",
    description: "Real customer purchase habits driving 24/7 automated revenue.",
  },
];

const STEP = 90; // ms between rows

function Cross() {
  return (
    <svg
      className="h-[18px] w-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function Check() {
  return (
    <svg
      className="cmp-check h-[18px] w-[18px]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function ComparisonLedger() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown || undefined}
      className="cmp mx-auto w-full max-w-[820px] text-left"
    >
      {/* Column key */}
      <div className="flex items-end justify-end gap-3 pb-4">
        <span className="w-[92px] text-center font-mono text-[10px] uppercase tracking-[0.18em] text-faint2">
          Most
          <br />
          agencies
        </span>
        <span className="w-[92px] text-center font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-navy">
          Binary
          <br />
          Gen
        </span>
      </div>

      <ol className="border-t border-line">
        {ROWS.map((row, i) => (
          <li
            key={row.feature}
            className="cmp-row flex items-center gap-4 border-b border-line py-5 sm:py-6"
            style={{ ["--d" as string]: `${i * STEP}ms` }}
          >
            <span className="w-6 shrink-0 font-mono text-[11px] tabular-nums text-faint">
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-medium leading-snug text-ink sm:text-[17px]">
                {row.feature}
              </h3>
              <p className="mt-1 hidden text-[13px] leading-relaxed text-faint3 sm:block">
                {row.description}
              </p>
            </div>

            <span className="cmp-mark cmp-mark--no flex w-[92px] shrink-0 justify-center">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/10 text-red-500"
                title="Most agencies: no"
              >
                <Cross />
              </span>
            </span>

            <span className="cmp-mark cmp-mark--yes flex w-[92px] shrink-0 justify-center">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-onnavy"
                title="BinaryGen: yes"
              >
                <Check />
              </span>
            </span>
          </li>
        ))}
      </ol>

      {/* Tally */}
      <div className="cmp-tally mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-[14px] text-body">
          Seven things you should expect. We do all seven.
        </p>
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-32 overflow-hidden rounded-full bg-line">
            <span className="cmp-meter block h-full rounded-full bg-navy" />
          </span>
          <span className="font-mono text-[13px] font-semibold tabular-nums text-navy">
            <CountUp to={7} duration={1400} suffix="/7" />
          </span>
        </div>
      </div>
    </div>
  );
}
