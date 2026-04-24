"use client";

import { useState } from "react";
import type { Diagnosis } from "@/lib/tool/engine";

const ENGINE_MAP: Record<string, { engine: string; explain: string }> = {
  purchase: {
    engine: "CAPTURE",
    explain:
      "Pre-cart intent signal loss. Browse abandonment, un-segmented welcomes, no behavioral trigger logic.",
  },
  repeat: {
    engine: "RETAIN",
    explain:
      "Customers do not return because no architecture sequenced them to return. The post-purchase window is silent.",
  },
  loyal: {
    engine: "RETAIN",
    explain:
      "Second-to-third order decay. No VIP segment, no loyalty layer, no replenishment cadence.",
  },
  expand: {
    engine: "EXPAND",
    explain:
      "Third-order-plus customers are not sequenced upward. No pricing ladder, no expansion logic.",
  },
};

const STAGE_LABELS: Record<string, string> = {
  traffic: "TRAFFIC",
  purchase: "PURCHASE",
  repeat: "REPEAT",
  loyal: "LOYAL",
  expand: "EXPAND",
};

export function RevenueMap({ diagnosis }: { diagnosis: Diagnosis }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const stages = diagnosis.topology;

  return (
    <div className="border border-panel bg-panel/20 p-8 md:p-12">
      <p className="font-mono text-[10px] text-muted tracking-widest mb-8">
        REVENUE TOPOLOGY — YOUR BRAND
      </p>

      <div className="relative">
        <div className="grid grid-cols-5 gap-4 mb-6">
          {stages.map((s) => (
            <div key={s.stage} className="flex flex-col items-center text-center">
              <div
                className={`w-5 h-5 rounded-full transition-colors ${
                  s.leak !== null && s.leak > 0.5
                    ? "bg-signal animate-pulseSoft"
                    : "bg-bone/60"
                }`}
              />
              <p className="mt-3 font-mono text-[10px] text-bone/70 tracking-widest">
                {STAGE_LABELS[s.stage]}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-5 gap-4">
          {stages.map((s) => (
            <div key={s.stage} className="min-h-[120px]">
              {s.leak !== null && (
                <button
                  type="button"
                  onMouseEnter={() => setHovered(s.stage)}
                  onMouseLeave={() => setHovered(null)}
                  className="w-full text-left border-l border-signal/40 pl-3 py-2 hover:border-signal transition-colors"
                >
                  <p className="font-mono text-[10px] text-signal">
                    ↓ {Math.round(s.leak * 100)}%
                  </p>
                  <p className="font-mono text-[10px] text-muted tracking-widest mt-1">
                    LEAK
                  </p>
                </button>
              )}
            </div>
          ))}
        </div>

        {hovered && ENGINE_MAP[hovered] && (
          <div className="mt-8 border-t border-panel pt-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[10px] text-muted tracking-widest">
                ADDRESSED BY ENGINE
              </span>
              <span className="font-mono text-xs text-signal tracking-widest">
                {ENGINE_MAP[hovered].engine}
              </span>
            </div>
            <p className="text-sm text-bone/80 leading-relaxed max-w-2xl">
              {ENGINE_MAP[hovered].explain}
            </p>
          </div>
        )}

        {!hovered && (
          <p className="mt-8 font-mono text-[11px] text-muted italic">
            Hover a leak node to see which engine addresses it.
          </p>
        )}
      </div>
    </div>
  );
}
