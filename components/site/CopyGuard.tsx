"use client";

import { useEffect } from "react";

/**
 * Deterrent against casual copying: blocks copy/cut, the context menu, image
 * dragging, and the save/print/view-source/select-all shortcuts. Form fields
 * are left alone so the email gate and calculator keep working. This stops
 * casual lifting only; anyone with devtools or a screenshot can still get at
 * the content.
 */

function isEditable(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      target.closest("input, textarea, select") !== null)
  );
}

const BLOCKED_KEYS = new Set(["c", "x", "a", "s", "p", "u"]);

export function CopyGuard() {
  useEffect(() => {
    const block = (e: Event) => {
      if (!isEditable(e.target)) e.preventDefault();
    };

    const onKey = (e: KeyboardEvent) => {
      if (isEditable(e.target)) return;
      const mod = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();
      if (
        (mod && BLOCKED_KEYS.has(key)) ||
        // DevTools shortcuts: F12, Ctrl/Cmd+Shift+I/J/C, Cmd+Option+I/J/C.
        e.key === "F12" ||
        (mod && (e.shiftKey || e.altKey) && ["i", "j", "c"].includes(key))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("copy", block);
    document.addEventListener("cut", block);
    document.addEventListener("contextmenu", block);
    document.addEventListener("dragstart", block);
    document.addEventListener("selectstart", block);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("copy", block);
      document.removeEventListener("cut", block);
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("dragstart", block);
      document.removeEventListener("selectstart", block);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return null;
}
