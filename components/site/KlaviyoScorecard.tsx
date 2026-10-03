"use client";

import { useState } from "react";

const QUESTIONS = [
  "Do you know roughly what share of your email revenue comes from flows versus campaigns?",
  "Have you ever sorted your campaigns by revenue per recipient instead of by revenue?",
  "Do you know your repeat-purchase rate by cohort, rather than one blended number?",
  "Do you know the median number of days between a customer's first and second order?",
  "Have you opened your signup form's analytics in the last 90 days?",
  "Do you have separate segments for recent, lapsing and lapsed buyers, used differently?",
  "Could you say what your non-discount campaigns earned last quarter?",
];

const TIERS = [
  {
    range: "0–2",
    title: "Running on instinct",
    min: 0,
    max: 2,
    description:
      "The account is running on instinct. That isn't a criticism, it's where most brands at this size sit, because nothing forces you to look until growth stalls. Everything in the video will be new.",
  },
  {
    range: "3–5",
    title: "Measuring the visible half",
    min: 3,
    max: 5,
    description:
      "You're measuring the visible half. Usually flows, campaigns and some segmentation, with the reorder interval and the discount question untouched. The gaps are costing more than the parts you've already fixed.",
  },
  {
    range: "6–7",
    title: "Rare & instrumented",
    min: 6,
    max: 7,
    description:
      "Rare. You already have the instrumentation. Watch for checks 4 and 7 specifically — those are the two that stay broken longest in otherwise well-run accounts.",
  },
];

export function KlaviyoScorecard() {
  const [answers, setAnswers] = useState<boolean[]>(Array(7).fill(false));

  const score = answers.filter(Boolean).length;
  const answeredCount = answers.filter((a) => a !== undefined).length;

  function toggle(index: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }

  function reset() {
    setAnswers(Array(7).fill(false));
  }

  return (
    <div className="mt-12 space-y-10">
      {/* Interactive Questionnaire */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-line">
          <div>
            <h2 className="text-[22px] md:text-[28px] font-medium tracking-[-0.01em]">
              The scorecard
            </h2>
            <p className="mt-1 text-[15px] text-body2">
              One point per yes. Answer honestly, nobody&rsquo;s watching.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-1.5 rounded-full border border-navy/20 bg-navy/5 font-mono text-[13px] text-navy font-medium">
              Score: <strong className="text-[16px]">{score}</strong> / 7
            </div>
            {score > 0 && (
              <button
                type="button"
                onClick={reset}
                className="font-mono text-[12px] text-faint2 hover:text-ink underline transition-colors"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Scorecard Table / List */}
        <div className="mt-6 rounded-2xl border border-line overflow-hidden bg-card divide-y divide-line">
          <div className="grid grid-cols-[48px_1fr_64px] bg-cream/40 px-4 sm:px-6 py-3 font-mono text-[11px] tracking-[0.16em] uppercase text-subtle">
            <div>#</div>
            <div>Question</div>
            <div className="text-right">Point</div>
          </div>

          {QUESTIONS.map((q, idx) => {
            const isYes = answers[idx];
            return (
              <div
                key={idx}
                onClick={() => toggle(idx)}
                className={`grid grid-cols-[48px_1fr_64px] items-center px-4 sm:px-6 py-4 cursor-pointer transition-colors ${
                  isYes ? "bg-navy/5" : "hover:bg-cream/20"
                }`}
              >
                <div className="font-mono text-[13px] text-navy font-medium">
                  {idx + 1}
                </div>
                <div className="pr-4 text-[15px] md:text-[16px] text-body leading-relaxed select-none">
                  {q}
                </div>
                <div className="flex justify-end">
                  <span
                    className={`h-7 px-3 inline-flex items-center justify-center rounded-full font-mono text-[12px] font-medium transition-all ${
                      isYes
                        ? "bg-navy text-onnavy shadow-sm"
                        : "border border-line bg-bg text-faint2 hover:border-navy/40 hover:text-ink"
                    }`}
                  >
                    {isYes ? "+1 Yes" : "No"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* What the number means */}
      <div>
        <h3 className="text-[20px] md:text-[24px] font-medium tracking-[-0.01em]">
          What the number means
        </h3>

        <div className="mt-5 grid gap-4">
          {TIERS.map((tier) => {
            const isActive = score >= tier.min && score <= tier.max;
            return (
              <div
                key={tier.range}
                className={`p-6 rounded-2xl border transition-all ${
                  isActive
                    ? "border-navy bg-navy/5 shadow-md shadow-navy/5"
                    : "border-line bg-card opacity-80"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`font-mono text-[14px] font-medium ${
                      isActive ? "text-navy" : "text-subtle"
                    }`}
                  >
                    {tier.range} points · {tier.title}
                  </span>
                  {isActive && (
                    <span className="px-3 py-0.5 rounded-full bg-navy text-onnavy font-mono text-[11px] uppercase tracking-wider">
                      Your score
                    </span>
                  )}
                </div>
                <p className="mt-3 text-[15px] text-body leading-relaxed">
                  {tier.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
