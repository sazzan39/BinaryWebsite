"use client";

import { useEffect, useRef, useState } from "react";
import type { Diagnosis } from "@/lib/tool/engine";
import { formatUSD } from "@/lib/tool/engine";

type Line =
  | { type: "plain"; text: string; pause?: number }
  | { type: "ok"; text: string; pause?: number }
  | { type: "indent"; text: string; pause?: number };

function buildSequence(d: Diagnosis): Line[] {
  return [
    { type: "ok", text: "> reading input signals", pause: 90 },
    { type: "ok", text: "> normalizing revenue topology", pause: 110 },
    { type: "plain", text: "", pause: 40 },
    { type: "plain", text: "> analyzing retention patterns", pause: 100 },
    {
      type: "indent",
      text: `├─ LTV realization: ${Math.round(d.ltvRealization * 100)}%`,
      pause: 80,
    },
    {
      type: "indent",
      text: `└─ gap: ${formatUSD(
        Math.round(d.theoreticalLTV90 - d.currentLTV90)
      )}/customer`,
      pause: 110,
    },
    { type: "plain", text: "", pause: 40 },
    { type: "plain", text: "> detecting leaks", pause: 90 },
    ...d.patterns.flatMap((p, i) => {
      const isLast = i === d.patterns.length - 1;
      const prefix = isLast ? "└─" : "├─";
      return [
        {
          type: "indent" as const,
          text: `${prefix} ${p.name.toLowerCase()}`,
          pause: 85,
        },
      ];
    }),
    { type: "plain", text: "", pause: 60 },
    { type: "ok", text: "> diagnosis ready", pause: 160 },
  ];
}

export function AnalysisConsole({
  diagnosis,
  onDone,
}: {
  diagnosis: Diagnosis;
  onDone: () => void;
}) {
  const [rendered, setRendered] = useState<Line[]>([]);
  const onDoneRef = useRef(onDone);

  // Keep ref in sync WITHOUT retriggering the animation effect.
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    // Reset on new diagnosis run
    setRendered([]);

    const seq = buildSequence(diagnosis);
    let i = 0;
    let cancelled = false;
    let timerId: ReturnType<typeof setTimeout> | null = null;

    const tick = () => {
      if (cancelled) return;
      if (i >= seq.length) {
        timerId = setTimeout(() => {
          if (!cancelled) onDoneRef.current();
        }, 140);
        return;
      }
      // Capture the current line into a stable local so the state updater
      // closure doesn't re-read `seq[i]` after `i` has advanced
      // (Strict Mode double-invokes updaters, which would shift the index).
      const line = seq[i];
      const pause = line.pause ?? 90;
      i += 1;
      setRendered((r) => [...r, line]);
      timerId = setTimeout(tick, pause);
    };
    tick();

    return () => {
      cancelled = true;
      if (timerId) clearTimeout(timerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diagnosis]);

  return (
    <div className="max-w-[720px] mx-auto px-4 md:px-8">
      <div className="mb-5">
        <p className="font-mono text-[10px] text-muted tracking-widest mb-2">
          STEP 02 · ANALYSIS
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-bone leading-tight">
          Running diagnosis…
        </h2>
      </div>

      <div className="border border-panel bg-obsidian/60 p-5 md:p-6 min-h-[240px] font-mono text-[13px] leading-relaxed">
        {rendered.map((line, i) => (
          <LineRow key={i} line={line} />
        ))}
        <span className="inline-block w-2 h-[1.1em] bg-signal align-middle animate-blink" />
      </div>
    </div>
  );
}

function LineRow({ line }: { line: Line | undefined }) {
  if (!line) return null;
  if (line.type === "ok") {
    return (
      <div>
        <span className="text-bone/90">{line.text}</span>
        <span className="text-muted"> ............... ok</span>
      </div>
    );
  }
  if (line.type === "indent") {
    return <div className="text-bone/80 pl-4">{line.text}</div>;
  }
  return <div className="text-bone/90">{line.text || " "}</div>;
}
