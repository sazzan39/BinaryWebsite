"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "I already have an email agency. Why would I switch?",
    a: "Most email agencies optimize for send volume and open rate — vanity layers. We optimize for unit economics. If your CAC is rising and LTV is flat, your current setup is a tactical layer on a broken system. We rebuild the system.",
  },
  {
    q: "Is this just email marketing with a rebrand?",
    a: "No. Email is one delivery mechanism of the Retain and Expand engines. The core work is behavioral segmentation, revenue topology, and margin-first sequencing. Email is the output, not the input.",
  },
  {
    q: "How fast do results show up?",
    a: "The first rebuilt engine (usually Recover) ships in 14–21 days. Measurable LTV shift typically lands at the 60–90 day mark, because LTV is a compounding metric — it takes a full purchase cycle to read.",
  },
  {
    q: "What if my tech stack is a mess?",
    a: "That's usually the symptom, not the problem. The BGR audit will tell you whether the stack is the constraint or the symptom. We won't touch tooling until the economics are clear.",
  },
  {
    q: "Do you guarantee results?",
    a: "We guarantee the work and the framework. We don't guarantee a number, because anyone who does is lying — your offer, product, and margin envelope set the ceiling. We'll tell you what the ceiling is before you sign.",
  },
  {
    q: "Why should I trust the diagnostic tool?",
    a: "Because it runs in your browser, stores nothing, and tells you things you already suspect but haven't had framed. Run it. If the output is generic, you'll know inside 90 seconds.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-24 px-6 border-t border-panel">
      <div className="max-w-[880px] mx-auto">
        <p className="font-mono text-[11px] text-muted tracking-[0.3em] mb-10 text-center">
          OBJECTIONS, HONESTLY
        </p>

        <div className="border-t border-panel">
          {FAQS.map((item, i) => (
            <div key={i} className="border-b border-panel">
              <button
                className="w-full flex items-start justify-between gap-6 py-8 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <p className="font-mono text-sm md:text-base text-bone group-hover:text-signal transition-colors">
                  {item.q}
                </p>
                <span
                  className={`font-mono text-xl text-signal transition-transform duration-300 shrink-0 ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div className="accordion-content" data-open={open === i}>
                <div>
                  <p className="font-serif text-lg text-bone/80 leading-relaxed pb-8 max-w-2xl">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
