"use client";

import { useState } from "react";

export function ProofShot({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <figure
      className={`rounded-xl border border-line bg-card overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_50px_-24px_rgba(0,0,0,0.18)] ${className}`}
    >
      <div className="flex items-center gap-2 px-4 h-9 border-b border-linesoft3">
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
        <span className="h-2 w-2 rounded-full bg-line" />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className="w-full block"
      />
    </figure>
  );
}
