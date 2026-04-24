"use client";

import { useEffect, useRef, useState } from "react";
import { BookCallButton } from "@/components/site/BookCallButton";
import { CountUp } from "@/components/primitives/CountUp";
import { leakBucket, type Diagnosis } from "@/lib/tool/engine";
import type { Inputs } from "@/lib/tool/schema";

type LeadState = "idle" | "sending" | "saved" | "error";

export function DiagnosisOutput({
  diagnosis,
  inputs,
}: {
  diagnosis: Diagnosis;
  inputs: Inputs;
}) {
  const bucket = leakBucket(diagnosis.leakMonthly);
  const anonymousSentRef = useRef(false);

  useEffect(() => {
    if (anonymousSentRef.current) return;
    anonymousSentRef.current = true;
    fetch("/api/diagnosis", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        anonymous: true,
        inputs,
        diagnosis: {
          leakMonthly: diagnosis.leakMonthly,
          ltvRealization: diagnosis.ltvRealization,
          patternIds: diagnosis.patterns.map((p) => p.id),
          bucket,
        },
      }),
    }).catch(() => {});
  }, [diagnosis, inputs, bucket]);

  return (
    <div className="max-w-[1080px] mx-auto px-4 md:px-8">
      {/* TOP HERO — leak + CTA visible without scroll */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-3 mb-4">
        <div className="border border-panel bg-panel/30 p-5 md:p-6 relative overflow-hidden">
          <div
            aria-hidden
            className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(103,232,249,0.2), transparent 70%)",
            }}
          />
          <p className="font-mono text-[10px] text-muted tracking-widest mb-2">
            ESTIMATED MONTHLY LEAK
          </p>
          <p className="font-mono text-4xl md:text-5xl text-signal leading-none">
            <CountUp to={diagnosis.leakMonthly} format="usd" />
            <span className="text-bone/60 text-base md:text-lg ml-2">/ mo</span>
          </p>
          <p className="mt-3 font-mono text-[11px] text-bone/60 tracking-wide">
            12-month compound loss:{" "}
            <span className="text-bone">
              {diagnosis.leakAnnual.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })}
            </span>
          </p>
        </div>

        <div className="border border-amber/40 bg-amber/5 p-5 flex flex-col justify-between">
          <div>
            <p className="font-mono text-[10px] text-amber tracking-widest mb-1.5">
              NEXT STEP
            </p>
            <p className="font-serif text-base md:text-lg text-bone leading-snug">
              Walk the rebuild live. 45 min, no pitch.
            </p>
          </div>
          <BookCallButton
            variant="primary"
            className="!h-11 w-full mt-3 !text-xs"
            utm={{
              utm_source: "tool",
              utm_medium: "diagnosis_output_top",
              utm_campaign: "bgr_audit",
              utm_content: `leak_${bucket}`,
            }}
          >
            Book the BGR Audit →
          </BookCallButton>
        </div>
      </div>

      {/* PATTERNS — tight 3-col grid, short */}
      <section className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {diagnosis.patterns.map((p, i) => (
            <article
              key={p.id}
              className="border border-panel bg-panel/20 p-4 hover:border-signal/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-2.5 pb-2.5 border-b border-panel">
                <p className="font-mono text-[9px] text-muted tracking-widest">
                  PATTERN {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-mono text-[9px] text-signal tracking-widest text-right truncate ml-2">
                  {p.name}
                </p>
              </div>
              <p className="text-[12px] text-bone/75 leading-relaxed line-clamp-4">
                {p.body.split("\n\n")[0]}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* INSIGHTS — one-line chips */}
      <section className="mb-4 border border-panel bg-obsidian/40 p-4">
        <p className="font-mono text-[10px] text-muted tracking-widest mb-3">
          BEHAVIORAL INSIGHTS
        </p>
        <ul className="space-y-2">
          {diagnosis.insights.map((quote, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-[13px] text-bone/80 leading-snug"
            >
              <span className="text-signal shrink-0 mt-0.5">→</span>
              <span className="italic font-serif">{quote}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* LEAD FORM — compact */}
      <LeadForm diagnosis={diagnosis} inputs={inputs} bucket={bucket} />
    </div>
  );
}

function LeadForm({
  diagnosis,
  inputs,
  bucket,
}: {
  diagnosis: Diagnosis;
  inputs: Inputs;
  bucket: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<LeadState>("idle");

  const valid = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/diagnosis", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          inputs,
          diagnosis: {
            leakMonthly: diagnosis.leakMonthly,
            ltvRealization: diagnosis.ltvRealization,
            patternIds: diagnosis.patterns.map((p) => p.id),
            bucket,
          },
        }),
      });
      if (!res.ok) throw new Error("bad_status");
      setState("saved");
    } catch {
      setState("error");
    }
  }

  if (state === "saved") {
    return (
      <div className="border border-signal/40 bg-signal/5 p-4">
        <p className="text-sm text-bone/85 leading-relaxed">
          <span className="text-signal font-semibold">✓ Sent.</span> Full report
          on its way to <span className="text-bone">{email}</span>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="border border-panel bg-panel/30 p-4 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-2"
    >
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="h-11 px-3 bg-obsidian border border-panel text-sm text-bone placeholder:text-muted/70 outline-none focus:border-amber transition-colors"
      />
      <input
        type="email"
        placeholder="you@brand.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-11 px-3 bg-obsidian border border-panel text-sm text-bone placeholder:text-muted/70 outline-none focus:border-amber transition-colors"
      />
      <button
        type="submit"
        disabled={!valid || state === "sending"}
        className="h-11 px-6 rounded-full bg-bone text-black font-semibold text-xs hover:bg-white disabled:bg-panel disabled:text-muted disabled:cursor-not-allowed transition-all whitespace-nowrap"
      >
        {state === "sending" ? "Sending…" : "Email me the full diagnosis"}
      </button>
      {state === "error" && (
        <p className="md:col-span-3 font-mono text-[11px] text-amber">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
