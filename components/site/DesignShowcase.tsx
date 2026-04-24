import { FadeIn } from "@/components/primitives/FadeIn";

/**
 * Floating design showcase — works we shipped.
 *
 * To add your real design mockups:
 *   1. Drop images into /public/designs/  (e.g. /public/designs/skincare-welcome.png)
 *   2. Add entries to the `designs` array below with { src, label }
 *   3. Ideal aspect ratio is 9:16 (mobile email mockup) or 4:5
 */
const designs: { src?: string; label: string; tag: string }[] = [
  {
    label: "First-order conversion — skincare",
    tag: "ACQUISITION · welcome",
  },
  {
    label: "Cart-to-checkout recovery — beauty",
    tag: "RECOVERY · abandonment",
  },
  {
    label: "Repeat-purchase unlock — apparel",
    tag: "RETENTION · post-purchase",
  },
  {
    label: "Consumption cycle capture — consumables",
    tag: "REPLENISHMENT · cycle-keyed",
  },
  {
    label: "Dormant reactivation — supplements",
    tag: "REACTIVATION · day-45 winback",
  },
  {
    label: "VIP expansion — loyalty tier",
    tag: "EXPANSION · high-LTV nurture",
  },
];

export function DesignShowcase() {
  return (
    <section
      id="designs"
      className="py-20 md:py-24 px-6 border-t border-panel relative overflow-hidden"
    >
      <FadeIn>
        <div className="text-center mb-10 md:mb-12 max-w-[760px] mx-auto">
          <p className="font-mono text-[11px] text-muted tracking-[0.3em] mb-5">
            EMAIL ARCHITECTURE
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-bone leading-[1.1] tracking-tightest">
            High-converting emails,
            <br />
            <span className="italic text-amber">
              engineered for structured conversion.
            </span>
          </h2>
          <p className="mt-5 text-sm md:text-base text-bone/60 max-w-xl mx-auto leading-relaxed">
            Not design trophies. Not engagement theatre. Every email we ship is
            architected to move a specific unit-economic lever&mdash;first-order
            CVR, repeat rate, AOV, or reactivation.
          </p>
        </div>
      </FadeIn>

      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <div className="flex gap-5 animate-marquee hover:[animation-play-state:paused] w-max py-2">
          {[...designs, ...designs].map((d, i) => (
            <DesignCard key={i} design={d} index={i} />
          ))}
        </div>
      </div>

      <p className="mt-8 text-center font-mono text-[10px] text-muted tracking-widest">
        → Drop mockups into{" "}
        <span className="text-bone/60">/public/designs/</span> and list them in{" "}
        <span className="text-bone/60">DesignShowcase.tsx</span>
      </p>
    </section>
  );
}

function DesignCard({
  design,
  index,
}: {
  design: { src?: string; label: string; tag: string };
  index: number;
}) {
  // Vary the phone-mockup accent color across cards for visual rhythm
  const accents = ["#5B7FFF", "#67E8F9", "#A78BFA", "#F472B6"];
  const accent = accents[index % accents.length];

  return (
    <article
      className="shrink-0 w-[240px] md:w-[280px] aspect-[9/16] border border-panel bg-panel/30 relative overflow-hidden hover:border-amber/40 transition-all duration-300 hover:-translate-y-1"
      style={{ transform: `rotate(${(index % 2 === 0 ? -1.5 : 1.5)}deg)` }}
    >
      {design.src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={design.src}
          alt={design.label}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <MockEmailDesign accent={accent} />
      )}

      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent">
        <p className="font-mono text-[9px] text-amber tracking-widest mb-1.5">
          {design.tag}
        </p>
        <p className="font-serif italic text-bone text-sm leading-snug">
          {design.label}
        </p>
      </div>
    </article>
  );
}

function MockEmailDesign({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 p-4 flex flex-col">
      <div className="flex items-center gap-1.5 mb-3">
        <span className="w-2 h-2 rounded-full bg-bone/20" />
        <span className="w-2 h-2 rounded-full bg-bone/20" />
        <span className="w-2 h-2 rounded-full bg-bone/20" />
      </div>

      <div
        className="flex-1 rounded-sm p-4 flex flex-col justify-between"
        style={{ backgroundColor: `${accent}10`, borderLeft: `2px solid ${accent}` }}
      >
        <div>
          <div
            className="h-2 rounded-full mb-2"
            style={{ backgroundColor: accent, width: "60%" }}
          />
          <div className="h-1 bg-bone/20 rounded-full mb-1 w-4/5" />
          <div className="h-1 bg-bone/20 rounded-full mb-1 w-3/5" />
          <div className="h-1 bg-bone/20 rounded-full mb-4 w-2/3" />

          <div
            className="h-20 rounded-sm mb-3 opacity-70"
            style={{ backgroundColor: accent }}
          />

          <div className="h-1 bg-bone/15 rounded-full mb-1 w-full" />
          <div className="h-1 bg-bone/15 rounded-full mb-1 w-5/6" />
          <div className="h-1 bg-bone/15 rounded-full mb-1 w-4/6" />
        </div>

        <div
          className="h-7 rounded-full mt-4 flex items-center justify-center"
          style={{ backgroundColor: accent }}
        >
          <div className="h-1.5 w-16 bg-white/90 rounded-full" />
        </div>
      </div>
    </div>
  );
}
