"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { diagnose, type Diagnosis } from "@/lib/tool/engine";
import type { Inputs } from "@/lib/tool/schema";
import { InputPanel } from "./InputPanel";
import { AnalysisConsole } from "./AnalysisConsole";
import { DiagnosisOutput } from "./DiagnosisOutput";

type Step = "input" | "run" | "output";

export function ToolShell({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>("input");
  const [inputs, setInputs] = useState<Inputs | null>(null);

  const diagnosis: Diagnosis | null = useMemo(
    () => (inputs ? diagnose(inputs) : null),
    [inputs]
  );

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setStep("input");
      setInputs(null);
    }
  }, [open]);

  const handleRun = useCallback((v: Inputs) => {
    setInputs(v);
    setStep("run");
  }, []);

  const handleDone = useCallback(() => {
    setStep("output");
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-obsidian overflow-y-auto">
      <div className="sticky top-0 z-10 bg-obsidian/95 backdrop-blur-md border-b border-panel">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <p className="font-mono text-xs tracking-widest text-bone">
            BINARYGEN <span className="text-signal">·</span> REVENUE INTELLIGENCE
          </p>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-bone/60 hover:text-bone transition-colors"
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>

      <main className="py-6 md:py-8">
        {step === "input" && <InputPanel onRun={handleRun} />}
        {step === "run" && diagnosis && (
          <AnalysisConsole diagnosis={diagnosis} onDone={handleDone} />
        )}
        {step === "output" && diagnosis && inputs && (
          <DiagnosisOutput diagnosis={diagnosis} inputs={inputs} />
        )}
      </main>
    </div>
  );
}
