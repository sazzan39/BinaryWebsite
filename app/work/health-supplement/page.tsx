import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ProofShot } from "@/components/site/ProofShot";

export const metadata: Metadata = {
  title: "Health & Supplement — Case Study | BinaryGen",
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
    <div className="min-h-screen bg-[#FAFAF9] text-[#12100E] selection:bg-[#12100E] selection:text-[#FAFAF9]">
      {/* Top bar */}
      <header className="max-w-[1120px] mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="BinaryGen home">
          <Image
            src="/BGR-logo.png"
            alt="BinaryGen"
            width={1450}
            height={620}
            className="h-7 w-auto"
          />
        </Link>
        <Link
          href="/"
          className="font-mono text-[12px] tracking-wide text-[#6B665B] hover:text-[#12100E] transition-colors"
        >
          ← Back
        </Link>
      </header>

      {/* Sticky in-page section nav */}
      <nav className="sticky top-0 z-40 bg-[#FAFAF9]/90 backdrop-blur-md border-y border-[#EAE7DF]">
        <div className="max-w-[1120px] mx-auto px-6 h-12 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-[13px] text-[#6B665B] overflow-x-auto no-scrollbar">
            <a href="#situation" className="whitespace-nowrap hover:text-[#12100E] transition-colors">
              The situation
            </a>
            <a href="#work" className="whitespace-nowrap hover:text-[#12100E] transition-colors">
              What we built
            </a>
            <a href="#results" className="whitespace-nowrap hover:text-[#12100E] transition-colors">
              The results
            </a>
          </div>
          <Link
            href="/#book"
            className="shrink-0 hidden sm:inline-flex h-8 px-4 items-center rounded-full bg-[#1E2A54] text-white text-[13px] font-medium hover:bg-[#141C3B] transition-colors"
          >
            Book a call
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-[1120px] mx-auto px-6 pt-16 md:pt-24 pb-20">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#8A8578]">
          Case Study — Health &amp; Supplement
        </p>
        <h1 className="mt-6 max-w-4xl text-[38px] sm:text-6xl md:text-[68px] leading-[1.03] tracking-[-0.02em] font-medium">
          From 0% to nearly a third of revenue through email.
        </h1>
        <p className="mt-8 max-w-2xl text-[19px] leading-[1.6] text-[#4A473F]">
          The brand was great at getting the first sale and had no plan for the
          second. Paid ads did all the work. We built the system that brought
          customers back — and email went from €0 to €124,000 a year.
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 border-t border-[#E6E3DB]">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="py-8 sm:pr-8 border-b sm:border-b-0 sm:border-r last:border-r-0 border-[#E6E3DB]"
            >
              <div className="text-5xl md:text-6xl font-medium tracking-[-0.03em] tabular-nums">
                {s.value}
              </div>
              <p className="mt-3 text-[15px] text-[#6B665B] leading-snug max-w-[15rem]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The situation */}
      <section id="situation" className="max-w-[1120px] mx-auto px-6 py-16 md:py-20 border-t border-[#E6E3DB]">
        <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-16">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#1E2A54] md:pt-2">
            The situation
          </p>
          <div className="max-w-2xl space-y-6 text-[19px] leading-[1.65] text-[#38352E]">
            <p>
              Every new customer came from paid ads. Once they bought, almost
              nothing brought them back — no education, no reorder reminders,
              nothing.
            </p>
            <p>
              Email, the one channel that should quietly compound, was doing
              nothing. Attributed email revenue was flat zero. Subscription
              customers were never nurtured. Repeat purchases happened by luck.
            </p>
            <p className="text-[#6B665B]">
              For a supplement brand, that&rsquo;s the whole game left on the
              table. These are products people are meant to reorder every month.
            </p>
          </div>
        </div>
      </section>

      {/* What we built */}
      <section id="work" className="max-w-[1120px] mx-auto px-6 py-16 md:py-20 border-t border-[#E6E3DB]">
        <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-16">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#1E2A54] md:pt-2">
            What we built
          </p>
          <div className="max-w-2xl">
            <p className="text-[19px] leading-[1.65] text-[#38352E]">
              We replaced random promo blasts with a complete retention engine —
              built to raise lifetime value and get the brand off its dependence
              on paid ads.
            </p>
            <ul className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-4">
              {BUILT.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-3 text-[17px] text-[#38352E] border-b border-[#EDEAE2] pb-4"
                >
                  <span className="text-[#1E2A54] text-[13px]">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* The results — native before/after */}
      <section id="results" className="bg-white border-y border-[#E6E3DB]">
        <div className="max-w-[1120px] mx-auto px-6 py-20 md:py-28">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#1E2A54]">
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
          <div className="mt-10 grid sm:grid-cols-3 gap-6 border-t border-[#E6E3DB] pt-10">
            <Support
              stat="95.8%"
              label="of email revenue came from automated flows — the system earns while they sleep"
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

          {/* Raw dashboards (appear once saved to /public/proof/) */}
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            <ProofShot
              src="/proof/klaviyo-supplement-before.png"
              alt="Klaviyo before — €0 attributed email revenue"
            />
            <ProofShot
              src="/proof/klaviyo-supplement-after.png"
              alt="Klaviyo after — €124,252 attributed email revenue"
            />
          </div>
        </div>
      </section>

      {/* Takeaway */}
      <section className="max-w-[1120px] mx-auto px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-16">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#8A8578] md:pt-2">
            Takeaway
          </p>
          <p className="max-w-2xl text-[24px] md:text-[30px] leading-[1.4] tracking-[-0.01em] text-[#12100E]">
            For supplement brands, the first purchase is just the start. The
            growth is in keeping customers educated, subscribed, and reordering
            — and a good email system does that on autopilot.
          </p>
        </div>
      </section>

      {/* Close */}
      <section className="max-w-[1120px] mx-auto px-6 pb-24 md:pb-32 text-center">
        <h2 className="text-[30px] md:text-[46px] leading-[1.1] tracking-[-0.02em] font-medium max-w-2xl mx-auto">
          Sitting on customers who should be reordering?
        </h2>
        <p className="mt-6 text-[18px] text-[#5A564C]">
          Let&rsquo;s look at your account and show you the gap.
        </p>
        <Link
          href="/#book"
          className="mt-10 inline-flex h-14 px-9 items-center justify-center rounded-full bg-[#1E2A54] text-[#FAFAF9] font-medium text-[16px] hover:bg-[#141C3B] transition-colors"
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
        win ? "border-[#12100E] bg-[#FAFAF9]" : "border-[#E6E3DB] bg-white"
      }`}
    >
      <p
        className={`font-mono text-[11px] tracking-[0.2em] uppercase ${
          win ? "text-[#1A7F55]" : "text-[#A39E92]"
        }`}
      >
        {tag}
      </p>
      <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-[#EDEAE2] pb-5">
        <span className="text-[14px] text-[#6B665B]">Email revenue</span>
        <span
          className={`text-4xl md:text-5xl font-medium tracking-[-0.03em] tabular-nums ${
            win ? "text-[#12100E]" : "text-[#B7B2A6]"
          }`}
        >
          {email}
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <span className="text-[14px] text-[#6B665B]">Total revenue</span>
        <span className="text-[20px] font-medium tabular-nums text-[#38352E]">
          {total}
        </span>
      </div>
      <p
        className={`mt-6 inline-block text-[13px] font-medium tabular-nums px-3 py-1.5 rounded-full ${
          win
            ? "bg-[#E7F3EC] text-[#1A7F55]"
            : "bg-[#F1EFE9] text-[#8A8578]"
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
      <p className="mt-3 text-[15px] leading-[1.55] text-[#5A564C]">{label}</p>
    </div>
  );
}
