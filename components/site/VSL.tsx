"use client";

import { useState } from "react";

export function VSL({ id }: { id: string }) {
  const [play, setPlay] = useState(false);

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden border border-line bg-bezel shadow-[0_1px_2px_rgba(0,0,0,0.04),0_40px_90px_-40px_rgba(0,0,0,0.35)]">
      {play ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title="BinaryGen"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        /> 
      ) : (
        <button
          type="button"
          onClick={() => setPlay(true)}
          aria-label="Play video"
          className="group absolute inset-0 h-full w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Thumbnail2.png"
            alt="Watch how BinaryGen works"
            className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-[72px] w-[72px] rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-transform group-hover:scale-105">
              <span className="ml-1 border-y-[12px] border-y-transparent border-l-[20px] border-l-navy" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
