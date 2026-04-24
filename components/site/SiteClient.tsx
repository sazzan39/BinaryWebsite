"use client";

import { useCallback, useEffect, useState } from "react";
import { ToolEntry } from "./ToolEntry";
import { ToolShell } from "@/components/tool/ToolShell";
import { StickyMobileCTA } from "./StickyMobileCTA";

export function SiteClient() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === "#run") setOpen(true);
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => {
    setOpen(false);
    if (window.location.hash === "#run") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <>
      <ToolEntry onOpen={handleOpen} />
      <ToolShell open={open} onClose={handleClose} />
      <StickyMobileCTA />
    </>
  );
}
