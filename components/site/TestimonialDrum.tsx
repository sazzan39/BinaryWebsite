"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Founder testimonials as a plain responsive grid of cards. Replaces the
 * feral-blinds 3D ring carousel, which needed a click just to spring a card
 * open before a second click would play it. A normal click target plays
 * every card immediately, on the first click.
 *
 * Cards rise into place one after another once the grid scrolls into view
 * (same IntersectionObserver + --d stagger pattern as the comparison
 * ledger's rows), then keep replaying that same rise on a loop every few
 * seconds for as long as the grid stays on screen, so an idle visitor who
 * isn't scrolling still sees it happen, not just on the first reveal.
 */
const TESTIMONIALS = [
  { id: "Azw5u1ChjBo" },
  { id: "ElsY79XAfrY" },
  { id: "YnTypVQVBRA" },
  { id: "A2AhS-a3Qw8" },
];

const STEP = 140; // ms between cards
const LOOP_EVERY = 4500; // ms between replays

export function TestimonialDrum() {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (playingIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPlayingIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playingIndex]);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    let loopId: ReturnType<typeof setInterval> | undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          loopId = setInterval(() => {
            // Drop out and back in a beat later so the CSS transition,
            // which only fires on a change, actually restarts.
            setShown(false);
            requestAnimationFrame(() =>
              requestAnimationFrame(() => setShown(true)),
            );
          }, LOOP_EVERY);
        } else {
          clearInterval(loopId);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(loopId);
    };
  }, []);

  return (
    <>
      <div
        ref={gridRef}
        data-shown={shown || undefined}
        className="tst-grid grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-6"
      >
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setPlayingIndex(i)}
            aria-label={`Play founder testimonial ${i + 1}`}
            style={{ ["--d" as string]: `${i * STEP}ms` }}
            className="tst-card group relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-bezel shadow-[0_1px_2px_rgba(0,0,0,0.06),0_20px_45px_-25px_rgba(0,0,0,0.35)] transition-transform duration-300 hover:-translate-y-1"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${t.id}/oardefault.jpg`}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20">
              <span className="h-14 w-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg">
                <span className="ml-0.5 border-y-[9px] border-y-transparent border-l-[15px] border-l-bezel" />
              </span>
            </span>
          </button>
        ))}
      </div>

      {playingIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setPlayingIndex(null)}
        >
          <div
            className="relative aspect-[9/16] w-full max-w-[420px] overflow-hidden rounded-2xl bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              key={TESTIMONIALS[playingIndex].id}
              src={`https://www.youtube.com/embed/${TESTIMONIALS[playingIndex].id}?autoplay=1&playsinline=1`}
              title="Founder testimonial"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
            <button
              type="button"
              onClick={() => setPlayingIndex(null)}
              aria-label="Close video"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/80"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
