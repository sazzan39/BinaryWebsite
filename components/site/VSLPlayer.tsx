"use client";

import { useState } from "react";

const MUX_PLAYBACK_ID = process.env.NEXT_PUBLIC_MUX_PLAYBACK_ID;
const YOUTUBE_ID = process.env.NEXT_PUBLIC_VSL_YOUTUBE_ID;

export function VSLPlayer() {
  if (YOUTUBE_ID) return <YouTubePlayer id={YOUTUBE_ID} />;
  if (MUX_PLAYBACK_ID) return <MuxPlayer id={MUX_PLAYBACK_ID} />;
  return <Placeholder />;
}

function YouTubePlayer({ id }: { id: string }) {
  const [playing, setPlaying] = useState(false);
  // Start with hqdefault — it exists for 100% of videos, including Shorts.
  // On load, we try to upgrade to maxresdefault; fall back silently if it 404s.
  const [thumb, setThumb] = useState(
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
  );

  return (
    <div className="relative aspect-video border border-panel overflow-hidden group bg-panel/40">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
          title="BinaryGen VSL"
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb}
            alt="VSL thumbnail"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            onLoad={() => {
              // Upgrade to higher-res if available
              const hi = new Image();
              hi.src = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
              hi.onload = () => {
                if (hi.naturalWidth > 120) setThumb(hi.src);
              };
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent" />

          <div className="absolute top-5 left-5 font-mono text-[10px] tracking-widest text-bone/80">
            VSL · FOUNDER READ
          </div>

          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center"
            aria-label="Play video"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-amber flex items-center justify-center transition-transform group-hover:scale-110 shadow-[0_10px_40px_rgba(91,127,255,0.45)]">
              <svg width="26" height="30" viewBox="0 0 24 28" className="ml-1">
                <path d="M0 0V28L24 14L0 0Z" fill="#FFFFFF" />
              </svg>
            </div>
          </button>
        </>
      )}
    </div>
  );
}

function MuxPlayer({ id }: { id: string }) {
  return (
    <div className="aspect-video border border-panel overflow-hidden">
      <iframe
        src={`https://iframe.mediadelivery.net/embed/${id}`}
        className="w-full h-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

function Placeholder() {
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="relative aspect-video border border-panel overflow-hidden group bg-panel/40">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-obsidian via-panel to-obsidian"
      />
      <div className="absolute top-5 left-5 font-mono text-[10px] tracking-widest text-muted">
        VSL · 3:47 · FOUNDER READ
      </div>
      <div className="absolute bottom-5 left-5 right-5 font-serif text-xl md:text-2xl text-bone/90 italic">
        &ldquo;The economic gap every DTC founder misses.&rdquo;
      </div>
      <div className="absolute bottom-5 right-5 font-mono text-xs text-muted">
        3:47
      </div>

      <button
        type="button"
        onClick={() => setShowHint(true)}
        className="absolute inset-0 flex items-center justify-center"
        aria-label="Play video"
      >
        <div className="w-20 h-20 rounded-full bg-amber flex items-center justify-center transition-transform group-hover:scale-110 shadow-[0_10px_40px_rgba(91,127,255,0.3)]">
          <svg width="24" height="28" viewBox="0 0 24 28" className="ml-1">
            <path d="M0 0V28L24 14L0 0Z" fill="#FFFFFF" />
          </svg>
        </div>
      </button>

      {showHint && (
        <div className="absolute inset-0 bg-obsidian/95 flex items-center justify-center p-8 text-center">
          <div className="max-w-md">
            <p className="font-mono text-[10px] tracking-widest text-amber mb-4">
              VSL PLACEHOLDER
            </p>
            <p className="text-bone/85 leading-relaxed">
              Set{" "}
              <code className="font-mono text-amber">
                NEXT_PUBLIC_VSL_YOUTUBE_ID
              </code>{" "}
              in <code className="font-mono">.env.local</code> and restart{" "}
              <code className="font-mono">npm run dev</code> to stream the real
              VSL.
            </p>
            <button
              type="button"
              onClick={() => setShowHint(false)}
              className="mt-6 font-mono text-xs text-muted hover:text-bone"
            >
              close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
