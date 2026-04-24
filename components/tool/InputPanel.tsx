"use client";

import { useState } from "react";
import { FIELDS, validate, type Inputs, type Flow } from "@/lib/tool/schema";
import { Field } from "@/components/primitives/Field";

type RawInputs = {
  revenue: string;
  aov: string;
  repeatRate: string;
  frequency: string;
  emailShare: string;
  flows: Flow[];
};

const EMPTY: RawInputs = {
  revenue: "",
  aov: "",
  repeatRate: "",
  frequency: "",
  emailShare: "",
  flows: [],
};

function parseInputs(raw: RawInputs): Inputs | null {
  const parsed: Inputs = {
    revenue: parseFloat(raw.revenue),
    aov: parseFloat(raw.aov),
    repeatRate: parseFloat(raw.repeatRate) / 100,
    frequency: parseFloat(raw.frequency),
    emailShare: parseFloat(raw.emailShare) / 100,
    flows: raw.flows,
  };
  return validate(parsed) ? parsed : null;
}

export function InputPanel({ onRun }: { onRun: (v: Inputs) => void }) {
  const [raw, setRaw] = useState<RawInputs>(EMPTY);
  const parsed = parseInputs(raw);

  const setField = (key: keyof RawInputs, value: string | Flow[]) =>
    setRaw((s) => ({ ...s, [key]: value }));

  return (
    <div className="max-w-[860px] mx-auto px-4 md:px-8">
      <div className="mb-10">
        <p className="font-mono text-[10px] text-muted tracking-widest mb-4">
          STEP 01 · INPUT
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-bone leading-tight mb-4">
          Diagnostic input — business signals.
        </h2>
        <p className="text-sm text-bone/60 max-w-xl leading-relaxed">
          The system requires six signals to read your economic topology. All
          inputs stay local. Nothing is transmitted.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-8">
        {FIELDS.map((spec) => (
          <Field
            key={spec.key}
            spec={spec}
            value={spec.type === "multi" ? raw.flows : (raw[spec.key] as string)}
            onChange={(v) => setField(spec.key, v)}
          />
        ))}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-end">
        <button
          disabled={!parsed}
          onClick={() => parsed && onRun(parsed)}
          className="h-14 px-10 bg-signal text-black font-mono text-sm tracking-wide disabled:bg-panel disabled:text-muted disabled:cursor-not-allowed hover:bg-signal/90 transition-colors"
        >
          Run diagnosis →
        </button>
      </div>

      {!parsed && (
        <p className="mt-4 text-right font-mono text-[11px] text-muted">
          Complete all six signals to run.
        </p>
      )}
    </div>
  );
}
