"use client";

import { useState } from "react";

type Props = {
  videoId: string;
  quote?: string;
  duration?: string;
  feature?: boolean;
  short?: boolean;
};

export function YouTubeCard({
  videoId,
  quote,
  duration,
  feature,
  short,
}: Props) {
  const [playing, setPlaying] = useState(false);
  const isPlaceholder = !videoId || videoId === "PLACEHOLDER";

  const thumb = isPlaceholder
    ? null
    : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <article
      className={`group relative border border-panel bg-panel/40 overflow-hidden hover:border-amber/40 transition-all hover:-translate-y-1 duration-300 ${
        feature ? "md:col-span-2" : ""
      }`}
    >
      <div
        className={`relative bg-gradient-to-br from-panel via-obsidian to-panel/60 ${
          short ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        {thumb && !playing && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={thumb}
            alt="Founder testimonial"
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        )}

        {duration && !playing && (
          <div className="absolute top-3 right-3 font-mono text-[10px] text-bone/90 bg-obsidian/70 backdrop-blur-sm px-2 py-1 rounded z-10">
            ▶ {duration}
          </div>
        )}

        {short && !playing && (
          <div className="absolute top-3 left-3 font-mono text-[9px] text-bone/90 bg-amber/90 text-white px-2 py-1 rounded tracking-widest z-10">
            SHORTS
          </div>
        )}

        {playing && !isPlaceholder && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title="Founder testimonial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}

        {!playing && (
          <button
            type="button"
            onClick={() => !isPlaceholder && setPlaying(true)}
            disabled={isPlaceholder}
            className="absolute inset-0 flex items-center justify-center"
            aria-label={isPlaceholder ? "Video unavailable" : "Play video"}
          >
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-transform ${
                isPlaceholder
                  ? "bg-panel/80 border border-bone/20"
                  : "bg-amber group-hover:scale-110 shadow-[0_10px_30px_rgba(91,127,255,0.4)]"
              }`}
            >
              <svg
                width="18"
                height="22"
                viewBox="0 0 24 28"
                className={`ml-1 ${isPlaceholder ? "opacity-30" : ""}`}
              >
                <path d="M0 0V28L24 14L0 0Z" fill="#FFFFFF" />
              </svg>
            </div>
          </button>
        )}

        {isPlaceholder && !playing && (
          <p className="absolute bottom-3 left-3 font-mono text-[9px] text-muted tracking-widest">
            YT ID NOT SET
          </p>
        )}
      </div>

      {quote && (
        <div className="p-5 md:p-6">
          <p
            className={`font-serif italic text-bone/90 leading-snug ${
              feature ? "text-2xl md:text-3xl" : "text-base md:text-lg"
            }`}
          >
            &ldquo;{quote}&rdquo;
          </p>
        </div>
      )}
    </article>
  );
}
