"use client";

import { useEffect, useState } from "react";
import { Blinds, type BlindsItem } from "feral-blinds";
import "feral-blinds/blinds.css";

/**
 * Founder testimonials on the feral-blinds drum (`mode="ring"` — the README
 * calls this layout the drum: "cards riding a turning cylinder").
 *
 * Each card supplies its own `render`, which feral-blinds substitutes into the
 * `.bld-art` layer. The thumbnail keeps the package's own `bld-img` class so it
 * inherits the authored spring-keyed zoom and desaturation; the play badge sits
 * on top of it so the cards still read as video.
 *
 * Per the package: the first click opens a card, a click on the already-open
 * card fires `onActivate` — which is where navigation belongs.
 */
const TESTIMONIALS = [
  { id: "Azw5u1ChjBo" },
  { id: "ElsY79XAfrY" },
  { id: "YnTypVQVBRA" },
  { id: "A2AhS-a3Qw8" },
];

const items: BlindsItem[] = TESTIMONIALS.map((t, i) => ({
  // No founder names or brands exist anywhere in the project, so labels are off
  // (labelStyle="none"). This title is the card's accessible name only.
  title: `Founder testimonial ${i + 1}`,
  render: (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="bld-img"
        src={`https://i.ytimg.com/vi/${t.id}/oardefault.jpg`}
        alt=""
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="h-14 w-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg">
          <span className="ml-0.5 border-y-[9px] border-y-transparent border-l-[15px] border-l-bezel" />
        </span>
      </span>
    </>
  ),
}));

export function TestimonialDrum() {
  // Cards are sized off the drum's own clientWidth (see feral-blinds'
  // cardW calc), so bumping cardScale is what makes them read bigger on a
  // phone screen without touching desktop.
  const [cardScale, setCardScale] = useState(1.2);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setCardScale(mq.matches ? 1.45 : 1.2);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    // `tst-drum` pins every card to a true 1080x1920 (9:16) frame — see
    // globals.css. The drum's rAF loop writes only the slat's width inline in
    // horizontal mode, so height is ours to set via aspect-ratio and all three
    // cards come out identical. cardScale drives that width (and with it the
    // ring radius), so it stays the single size dial; `spread` opens the ring
    // enough that three tall cards do not crowd each other.
    <div className="tst-drum h-[680px] sm:h-[760px]">
      <Blinds
        items={items}
        mode="ring"
        labelStyle="none"
        labelPosition="bottom"
        radius={16}
        gap={10}
        textSize={1.05}
        expandRatio={2.8}
        cardScale={cardScale}
        spread={4}
        tuning={{ k: 95, c: 18, lean: 0.3, squeeze: 0.8 }}
        autoPlay={3200}
        showIndex={false}
        showBody={false}
        onActivate={(i) =>
          window.open(
            `https://www.youtube.com/shorts/${TESTIMONIALS[i].id}`,
            "_blank",
            "noopener,noreferrer",
          )
        }
      />
    </div>
  );
}
