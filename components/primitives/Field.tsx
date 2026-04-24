"use client";

import { useState } from "react";
import type { FieldSpec, Flow } from "@/lib/tool/schema";

type Props = {
  spec: FieldSpec;
  value: string | Flow[];
  onChange: (v: string | Flow[]) => void;
};

export function Field({ spec, value, onChange }: Props) {
  const [focused, setFocused] = useState(false);

  if (spec.type === "multi") {
    const selected = (value as Flow[]) ?? [];
    return (
      <div className="col-span-2">
        <label className="block font-mono text-xs text-muted tracking-widest mb-3">
          {spec.label.toUpperCase()}
        </label>
        <div className="flex flex-wrap gap-2">
          {spec.options?.map((opt) => {
            const active = selected.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() =>
                  onChange(
                    active
                      ? selected.filter((v) => v !== opt)
                      : [...selected, opt]
                  )
                }
                className={`px-4 h-10 font-mono text-xs tracking-wide border transition-colors ${
                  active
                    ? "bg-signal text-black border-signal"
                    : "border-panel text-bone/70 hover:border-bone/50"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
        <p className="mt-3 font-mono text-[11px] text-muted">{spec.help}</p>
      </div>
    );
  }

  return (
    <div>
      <label className="block font-mono text-xs text-muted tracking-widest mb-3">
        {spec.label.toUpperCase()}
      </label>
      <div
        className={`flex items-center h-14 border transition-colors ${
          focused ? "border-signal" : "border-panel"
        }`}
      >
        {spec.prefix && (
          <span className="pl-4 pr-2 font-mono text-bone/60">{spec.prefix}</span>
        )}
        <input
          type="text"
          inputMode="decimal"
          value={value as string}
          placeholder={spec.placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
          className="flex-1 bg-transparent px-4 font-mono text-bone placeholder:text-muted/50 outline-none"
        />
        {spec.suffix && (
          <span className="pl-2 pr-4 font-mono text-bone/60">{spec.suffix}</span>
        )}
      </div>
      <p className="mt-2 font-mono text-[11px] text-muted">{spec.help}</p>
    </div>
  );
}
