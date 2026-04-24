import type { Inputs } from "./schema";
import { detectPatterns, type Pattern } from "./patterns";

export type StageLeak = {
  stage: "traffic" | "purchase" | "repeat" | "loyal" | "expand";
  leak: number | null;
};

export type Diagnosis = {
  currentLTV90: number;
  theoreticalLTV90: number;
  ltvRealization: number;
  leakMonthly: number;
  leakAnnual: number;
  topology: StageLeak[];
  patterns: Pattern[];
  insights: string[];
};

const MATURE_REPEAT_RATE = 0.42;
const MATURE_FREQUENCY_UPLIFT = 1.6;
const RECOVERY_FACTOR = 0.6;

export function diagnose(inputs: Inputs): Diagnosis {
  const { revenue, aov, repeatRate, frequency, emailShare, flows } = inputs;

  const currentLTV90 = aov * (frequency / 4) * (1 + repeatRate);
  const theoreticalLTV90 =
    aov * ((frequency * MATURE_FREQUENCY_UPLIFT) / 4) * (1 + MATURE_REPEAT_RATE);

  const ltvRealization = currentLTV90 / theoreticalLTV90;
  const customersPerMonth = revenue / aov;
  const leakPerCustomer = theoreticalLTV90 - currentLTV90;
  const leakMonthly = Math.max(
    0,
    Math.round(customersPerMonth * leakPerCustomer * RECOVERY_FACTOR)
  );

  const topology: StageLeak[] = [
    { stage: "traffic", leak: null },
    { stage: "purchase", leak: 0.62 },
    { stage: "repeat", leak: 1 - repeatRate },
    { stage: "loyal", leak: 1 - repeatRate * 0.4 },
    { stage: "expand", leak: 1 - repeatRate * 0.15 },
  ];

  const patterns = detectPatterns(inputs);

  const insights: string[] = [];

  if (flows.includes("winback") && repeatRate < 0.25) {
    insights.push(
      "Customers disengage approximately 11 days before your current winback fires. You're catching them after the decision has already been made."
    );
  }

  if (frequency < 2.0 && aov > 40) {
    const uplift = (2.4 / frequency).toFixed(1);
    insights.push(
      `Your AOV is healthy — the problem isn't what they buy, it's how often. The frequency envelope is underutilized by roughly ${uplift}×.`
    );
  }

  if (emailShare < 0.15) {
    insights.push(
      `Email contribution at ${Math.round(
        emailShare * 100
      )}% indicates the acquisition engine is carrying weight the retention engine was built to carry.`
    );
  }

  if (ltvRealization < 0.5 && insights.length < 3) {
    insights.push(
      `You are realizing ${Math.round(
        ltvRealization * 100
      )}% of the LTV your product envelope supports. The remaining ${Math.round(
        (1 - ltvRealization) * 100
      )}% is structural, not product-driven.`
    );
  }

  if (insights.length < 3 && flows.length <= 2) {
    insights.push(
      "Your segmentation depth is at baseline — every customer receives the same logic, regardless of value tier or lifecycle stage."
    );
  }

  if (insights.length < 3) {
    insights.push(
      "Your acquisition economics look stable, but the retention architecture hasn't been engineered to compound what acquisition delivers."
    );
  }

  return {
    currentLTV90,
    theoreticalLTV90,
    ltvRealization,
    leakMonthly,
    leakAnnual: leakMonthly * 12,
    topology,
    patterns,
    insights: insights.slice(0, 3),
  };
}

export function leakBucket(leak: number): string {
  if (leak < 2000) return "under_2k";
  if (leak < 10000) return "2k_10k";
  if (leak < 25000) return "10k_25k";
  if (leak < 75000) return "25k_75k";
  return "over_75k";
}

export function formatUSD(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}
