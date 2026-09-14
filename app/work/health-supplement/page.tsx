import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { KlaviyoSummary } from "@/components/site/KlaviyoSummary";

export const metadata: Metadata = {
  title: "Health & Supplement Case Study | BinaryGen",
  description:
    "How we took email from 0% to 30% of revenue for a health & supplement brand.",
};

/**
 * Case study #2 — Health & Supplement (light editorial).
 * Real numbers from client dashboards. Before/after rendered natively
 * in-theme (the client's own red graphic is intentionally not used).
 */

const STATS = [
  { value: "30.46%", label: "of revenue from email" },
  { value: "€124K", label: "email revenue, up from €0" },
  { value: "95.8%", label: "of it from automated flows" },
];

const BUILT = [
  "Welcome series",
  "Post-purchase education",
  "Subscription onboarding",
  "Refill & reorder reminders",
  "Win-back flows",
  "Browse & cart recovery",
  "Behavior-based segmentation",
  "Weekly campaigns tied to the lifecycle",
];

export default function HealthSupplementCaseStudy() {
  return (
    <div className="min-h-screen bg-bg text-ink selection:bg-bezel selection:text-onnavy">
      {/* Top bar */}
      <header className="max-w-[1120px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="BinaryGen home">
          <Image
            src="/BGR-logo.png"
            alt="BinaryGen"
            width={1450}
            height={620}
            className="h-7 w-auto dark:hidden"
          />
          <Image
            src="/BGR-logo-White.png"
            alt="BinaryGen"
            width={1450}
            height={620}
            className="h-7 w-auto hidden dark:block"
          />
        </Link>
        <Link
          href="/"
          className="font-mono text-[12px] tracking-wide text-body2 hover:text-ink transition-colors"
        >
          ← Back
        </Link>
      </header>

      {/* Sticky in-page section nav */}
      <nav className="sticky top-0 z-40 bg-bg/90 backdrop-blur-md border-y border-linesoft">
        <div className="max-w-[1120px] mx-auto px-6 h-12 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-[13px] text-body2 overflow-x-auto no-scrollbar">
            <a href="#situation" className="whitespace-nowrap hover:text-ink transition-colors">
              The situation
            </a>
            <a href="#work" className="whitespace-nowrap hover:text-ink transition-colors">
              What we built
            </a>
            <a href="#results" className="whitespace-nowrap hover:text-ink transition-colors">
              The results
            </a>
          </div>
          <Link
            href="/#book"
            className="shrink-0 hidden sm:inline-flex h-8 px-4 items-center rounded-full bg-navy text-white text-[13px] font-medium hover:bg-navydeep transition-colors"
          >
            Book a call
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-6 pt-16 md:pt-24 pb-20 text-center">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-subtle">
          Case Study · Health &amp; Supplement
        </p>
        <h1 className="mt-6 max-w-4xl mx-auto text-[38px] sm:text-6xl md:text-[68px] leading-[1.03] tracking-[-0.02em] font-medium">
          From 0% to nearly a third of revenue through email.
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-[19px] leading-[1.6] text-body3">
          The brand was great at getting the first sale and had no plan for the
          second. Paid ads did all the work. We built the system that brought
          customers back, and email went from €0 to €124,000 a year.
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 border-t border-line">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="py-8 sm:px-4 border-b sm:border-b-0 sm:border-r last:border-r-0 border-line"
            >
              <div className="text-5xl md:text-6xl font-medium tracking-[-0.03em] tabular-nums">
                {s.value}
              </div>
              <p className="mt-3 text-[15px] text-body2 leading-snug max-w-[15rem] mx-auto">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The situation */}
      <section id="situation" className="max-w-[1120px] mx-auto px-6 py-16 md:py-20 border-t border-line">
        <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-16">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-navy md:pt-2">
            The situation
          </p>
          <div className="max-w-2xl space-y-6 text-[19px] leading-[1.65] text-ink2">
            <p>
              Every new customer came from paid ads. Once they bought, almost
              nothing brought them back: no education, no reorder reminders,
              nothing.
            </p>
            <p>
              Email, the one channel that should quietly compound, was doing
              nothing. Attributed email revenue was flat zero. Subscription
              customers were never nurtured. Repeat purchases happened by luck.
            </p>
            <p className="text-body2">
              For a supplement brand, that&rsquo;s the whole game left on the
              table. These are products people are meant to reorder every month.
            </p>
          </div>
        </div>
      </section>

      {/* What we built */}
      <section id="work" className="max-w-[1120px] mx-auto px-6 py-16 md:py-20 border-t border-line">
        <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-16">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-navy md:pt-2">
            What we built
          </p>
          <div className="max-w-2xl">
            <p className="text-[19px] leading-[1.65] text-ink2">
              We replaced random promo blasts with a complete retention engine,
              built to raise lifetime value and get the brand off its dependence
              on paid ads.
            </p>
            <ul className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-4">
              {BUILT.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 text-[17px] text-ink2 border-b border-linesoft2 pb-4"
                >
                  <span className="text-navy text-[13px]">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The results — native before/after */}
      <section id="results" className="bg-card border-y border-line">
        <div className="max-w-[1120px] mx-auto px-6 py-20 md:py-28">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-navy">
            The results
          </p>
          <h2 className="mt-5 max-w-3xl text-[30px] md:text-[44px] leading-[1.08] tracking-[-0.02em] font-medium">
            Email went from doing nothing to a third of the business.
          </h2>

          {/* Before / After */}
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            <BeforeAfterCard
              tag="Before"
              tone="muted"
              total="€188,792"
              email="€0"
              share="0% of revenue"
            />
            <BeforeAfterCard
              tag="After"
              tone="win"
              total="€407,983"
              email="€124,252"
              share="30.46% of revenue"
            />
          </div>

          {/* Supporting points */}
          <div className="mt-10 grid sm:grid-cols-3 gap-6 border-t border-line pt-10">
            <Support
              stat="95.8%"
              label="of email revenue came from automated flows, the system earns while they sleep"
            />
            <Support
              stat="Higher"
              label="subscription retention and repeat purchase rate"
            />
            <Support
              stat="Steadier"
              label="monthly revenue, far less dependent on ad spend"
            />
          </div>

          {/* The Klaviyo dashboards, before and after (real numbers) */}
          <div className="mt-16 space-y-10">
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-faint2 mb-4">
                Before
              </p>
              <KlaviyoSummary
                dateLabel="Before BinaryGen · Klaviyo"
                total="€188,792.64"
                attributed="€0.00"
                attributedSharePct="0.00"
              />
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#12805C] mb-4">
                After
              </p>
              <KlaviyoSummary
                dateLabel="After BinaryGen · Klaviyo"
                total="€407,982.66"
                attributed="€124,252.41"
                attributedSharePct="30.46"
                attributedDelta={{ dir: "up", pct: "16%", period: "vs. previous period" }}
                breakdown={[
                  { label: "Per recipient", value: "€0.61" },
                  { label: "Campaigns", value: "€5,233.90", pct: "4.21%" },
                  { label: "Flows", value: "€119,018.51", pct: "95.79%" },
                  { label: "Email", value: "€124,252.41", pct: "100.0%" },
                  { label: "SMS", value: "€0.00", pct: "0.0%" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Takeaway */}
      <section className="max-w-[1120px] mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-16">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-subtle md:pt-2">
            Takeaway
          </p>
          <p className="max-w-2xl text-[24px] md:text-[30px] leading-[1.4] tracking-[-0.01em] text-ink">
            For supplement brands, the first purchase is just the start. The
            growth is in keeping customers educated, subscribed, and reordering,
            and a good email system does that on autopilot.
          </p>
        </div>
      </section>

      {/* Close */}
      <section className="max-w-[1120px] mx-auto px-6 pb-24 md:pb-32 text-center">
        <h2 className="text-[30px] md:text-[46px] leading-[1.1] tracking-[-0.02em] font-medium max-w-2xl mx-auto">
          Sitting on customers who should be reordering?
        </h2>
        <p className="mt-6 text-[18px] text-body">
          Let&rsquo;s look at your account and show you the gap.
        </p>
        <Link
          href="/#book"
          className="mt-10 inline-flex h-14 px-9 items-center justify-center rounded-full bg-navy text-onnavy font-medium text-[16px] hover:bg-navydeep transition-colors"
        >
          Book a call
        </Link>
      </section>
    </div>
  );
}

function BeforeAfterCard({
  tag,
  tone,
  total,
  email,
  share,
}: {
  tag: string;
  tone: "muted" | "win";
  total: string;
  email: string;
  share: string;
}) {
  const win = tone === "win";
  return (
    <div
      className={`rounded-2xl border p-8 md:p-10 ${
        win ? "border-ink bg-bg" : "border-line bg-card"
      }`}
    >
      <p
        className={`font-mono text-[11px] tracking-[0.2em] uppercase ${
          win ? "text-[#1A7F55]" : "text-faint2"
        }`}
      >
        {tag}
      </p>
      <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-linesoft2 pb-5">
        <span className="text-[14px] text-body2">Email revenue</span>
        <span
          className={`text-4xl md:text-5xl font-medium tracking-[-0.03em] tabular-nums ${
            win ? "text-ink" : "text-faint"
          }`}
        >
          {email}
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <span className="text-[14px] text-body2">Total revenue</span>
        <span className="text-[20px] font-medium tabular-nums text-ink2">
          {total}
        </span>
      </div>
      <p
        className={`mt-6 inline-block text-[13px] font-medium tabular-nums px-3 py-1.5 rounded-full ${
          win
            ? "bg-[#E7F3EC] text-[#1A7F55]"
            : "bg-cream2 text-subtle"
        }`}
      >
        {share}
      </p>
    </div>
  );
}

function Support({ stat, label }: { stat: string; label: string }) {
  return (
    <div>
      <div className="text-2xl md:text-3xl font-medium tracking-[-0.02em]">
        {stat}
      </div>
      <p className="mt-3 text-[15px] leading-[1.55] text-body">{label}</p>
    </div>
  );
}
