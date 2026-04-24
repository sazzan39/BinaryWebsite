import type { Inputs } from "./schema";

export type Pattern = {
  id: string;
  name: string;
  body: string;
};

type PatternRule = {
  id: string;
  name: string;
  trigger: (i: Inputs) => boolean;
  body: (i: Inputs) => string;
};

const pct = (v: number) => `${Math.round(v * 100)}%`;
const flowList = (flows: Inputs["flows"]) =>
  flows.length ? flows.join(", ") : "no flows detected";

export const PATTERNS: PatternRule[] = [
  {
    id: "post_purchase_leak",
    name: "POST-PURCHASE LEAK",
    trigger: (i) => !i.flows.includes("post-purchase") && i.repeatRate < 0.3,
    body: (i) => `
The window between order confirmation and first reactivation is the
largest unmonitored revenue surface in your business. Your inputs
indicate this surface is operating at baseline architecture
(${flowList(i.flows)} — no post-purchase sequencing).

Repeat rate of ${pct(i.repeatRate)} against a frequency of
${i.frequency.toFixed(1)} implies ${pct(1 - i.repeatRate)} of buyers
never return. That's not a product problem — that's a retention
structure that was never built.
    `.trim(),
  },
  {
    id: "winback_misalignment",
    name: "REACTIVATION WINDOW MISALIGNED",
    trigger: (i) => i.flows.includes("winback") && i.repeatRate < 0.25,
    body: () => `
A winback exists but is underperforming — repeat rate below 25%
with an active winback indicates the trigger window is firing after
median decay. Most DTC decay curves show 50% customer disengagement
between days 34–52; most winback flows fire at day 90+.

You're catching customers after the decision to not return has
already been made.
    `.trim(),
  },
  {
    id: "frequency_underutilized",
    name: "FREQUENCY ENVELOPE UNDERUTILIZED",
    trigger: (i) => i.frequency < 2.0 && i.aov > 40,
    body: (i) => `
AOV of $${i.aov.toLocaleString("en-US")} is healthy — the constraint
is not what customers buy, it's how often. Current frequency of
${i.frequency.toFixed(1)} orders/year against the portfolio median
of 2.4–3.1 leaves approximately ${Math.round(
      (2.4 / i.frequency - 1) * 100
    )}% of potential LTV unrealized.

This is an expansion-engine problem, not an acquisition problem.
    `.trim(),
  },
  {
    id: "email_underweight",
    name: "RETENTION ENGINE UNDERWEIGHT",
    trigger: (i) => i.emailShare < 0.15,
    body: (i) => `
Email contribution at ${pct(
      i.emailShare
    )} of total revenue indicates the acquisition engine is carrying
load the retention engine was built to carry. Mature DTC brands see
25–35% revenue from owned channels — your current mix pushes CAC
pressure disproportionately onto paid.

Every dollar the retention engine doesn't earn is a dollar the
acquisition engine has to replace, at a higher cost.
    `.trim(),
  },
  {
    id: "segmentation_absent",
    name: "SEGMENTATION DEPTH: BASELINE",
    trigger: (i) => i.flows.length <= 2,
    body: (i) => `
With ${i.flows.length} active flow${i.flows.length === 1 ? "" : "s"},
your segmentation depth is at baseline. Every customer — first-time,
lapsing, loyal, VIP — receives the same logic.

The revenue penalty for flat segmentation scales with order volume;
at your current run-rate, this is the highest-leverage leak in the
system.
    `.trim(),
  },
  {
    id: "abandon_only",
    name: "RECOVERY CONCENTRATED IN ABANDONMENT",
    trigger: (i) =>
      i.flows.includes("abandon") &&
      !i.flows.includes("browse") &&
      !i.flows.includes("post-purchase"),
    body: () => `
Abandonment recovery is active but recovery logic is concentrated at
a single point in the journey. Browse abandonment (pre-cart) and
post-purchase (retention) are where the larger compounding lives —
2–3× the revenue of cart recovery over 90 days.

You've built a fence. The field is still open.
    `.trim(),
  },
  {
    id: "replenishment_gap",
    name: "REPLENISHMENT LOGIC ABSENT",
    trigger: (i) =>
      !i.flows.includes("replenishment") && i.frequency >= 2.0 && i.aov < 120,
    body: (i) => `
Frequency of ${i.frequency.toFixed(1)} with AOV $${i.aov} suggests a
consumables or replenishable category, but no replenishment logic is
running. This is the single highest-ROI flow for consumable brands —
it often contributes 14–22% of total email revenue on its own.
    `.trim(),
  },
];

export function detectPatterns(inputs: Inputs): Pattern[] {
  return PATTERNS.filter((p) => p.trigger(inputs))
    .slice(0, 3)
    .map((p) => ({ id: p.id, name: p.name, body: p.body(inputs) }));
}
