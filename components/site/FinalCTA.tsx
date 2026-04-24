import { BookCallButton } from "./BookCallButton";

export function FinalCTA() {
  return (
    <section id="book" className="py-24 md:py-28 px-6 border-t border-panel">
      <div className="max-w-[1000px] mx-auto text-center">
        <h2 className="font-serif text-5xl md:text-7xl text-bone leading-[1.05] tracking-tightest">
          Every month you don&rsquo;t fix the leak,
          <br />
          your CAC gets more expensive
          <br />
          <span className="italic">and your LTV gets further out of reach.</span>
        </h2>

        <p className="mt-10 text-bone/60 max-w-xl mx-auto leading-relaxed">
          The BGR Audit is how you find out what it&rsquo;s worth to
          fix&mdash;before the math gets worse.
        </p>

        <div className="mt-14 flex justify-center">
          <BookCallButton
            variant="jumbo"
            utm={{
              utm_source: "site",
              utm_medium: "final_cta",
              utm_campaign: "bgr_audit",
            }}
          >
            → Book the Audit
          </BookCallButton>
        </div>

        <p className="mt-8 font-mono text-xs text-muted">
          6 audit slots per month. Currently 2 remaining for May.
        </p>
      </div>
    </section>
  );
}
