import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ProofShot } from "@/components/site/ProofShot";
import { KlaviyoSummary } from "@/components/site/KlaviyoSummary";

export const metadata: Metadata = {
  title: "Fashion & Accessories — Case Study | BinaryGen",
  description:
    "How a fashion & accessories brand went from a messy in-house email setup to nearly half of revenue from email.",
};

/**
 * Full case study page — light editorial.
 * Self-contained styling so it renders correctly regardless of the dark theme
 * on the current homepage. Numbers are pulled from client dashboards.
 * Items marked [[ ]] still need the founder's confirmation.
 */

const STATS = [
  { value: "47%", label: "of total revenue from email" },
  { value: "+204%", label: "email revenue, year over year" },
  { value: "23.6%", label: "returning customer rate" },
];

const WORK = [
  {
    title: "Rebuilt the core flows",
    body: "Welcome, browse abandonment, abandoned checkout, post-purchase, and win-back — written properly and wired to actually convert, instead of the default templates that were sitting there.",
  },
  {
    title: "Real segmentation",
    body: "Split the list by how people actually behave — engaged buyers, VIPs, lapsing customers, and cold subscribers — so the right message goes to the right people.",
  },
  {
    title: "A campaign calendar, not random sends",
    body: "Replaced one-off blasts with a planned calendar tied to launches, restocks, and the season — every send with a reason behind it.",
  },
  {
    title: "A plan for their biggest season",
    body: "Built the BFCM sequence ahead of time so the brand walked into Black Friday with the account ready, not scrambling.",
  },
];

const PROOF = [
  {
    src: "/proof/klaviyo-annual.png",
    source: "Klaviyo · full year",
    stat: "$119,711 from email",
    note: "Email revenue up 204% year over year — nearly a third of the brand's $397,864 total.",
  },
  {
    src: "/proof/klaviyo-sep-oct.png",
    source: "Klaviyo · Sep 1 – Oct 14, 2024",
    stat: "47% of total revenue",
    note: "In one window, email drove nearly half of all revenue — up 513% on the prior period.",
  },
  {
    src: "/proof/klaviyo-oct-nov.png",
    source: "Klaviyo · Oct 22 – Nov 6, 2024",
    stat: "$141K through the BFCM ramp",
    note: "Attributed revenue up 638% versus the same window a year before.",
  },
  {
    src: "/proof/shopify-returning-rate.png",
    source: "Shopify · Last 90 days",
    stat: "23.6% returning customers",
    note: "Repeat purchase rate climbed 7% as the flows did their job.",
  },
];

export default function FashionAccessoriesCaseStudy() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#12100E] selection:bg-[#12100E] selection:text-[#FAFAF9]">
      {/* Minimal top bar */}
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
              What we did
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
          Case Study — Fashion &amp; Accessories
        </p>
        <h1 className="mt-6 max-w-4xl text-[38px] sm:text-6xl md:text-[68px] leading-[1.03] tracking-[-0.02em] font-medium">
          From a messy in-house setup to nearly half of revenue from email.
        </h1>
        <p className="mt-8 max-w-2xl text-[19px] leading-[1.6] text-[#4A473F]">
          The brand had the tools but no system. We rebuilt their email from the
          ground up — and it became their single biggest channel, right in time
          for their biggest season.
        </p>

        {/* Stat row */}
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
              When they came to us, email was run in-house — and it was a mess.
              Klaviyo was installed, but there was no strategy behind it.
            </p>
            <p>
              A couple of basic flows on default settings. Campaigns going out at
              random, to the entire list, with no segments. Everything was there.
              Nothing was working together.
            </p>
            <p className="text-[#6B665B]">
              For a brand with real products and real demand, email was leaving
              money on the table every single day.
            </p>
          </div>
        </div>
      </section>

      {/* What we did */}
      <section id="work" className="max-w-[1120px] mx-auto px-6 py-16 md:py-20 border-t border-[#E6E3DB]">
        <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-16">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#1E2A54] md:pt-2">
            What we did
          </p>
          <div className="max-w-2xl">
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
              {WORK.map((w) => (
                <div key={w.title}>
                  <h3 className="text-[19px] font-medium tracking-[-0.01em]">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.6] text-[#5A564C]">
                    {w.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The results */}
      <section id="results" className="bg-white border-y border-[#E6E3DB]">
        <div className="max-w-[1120px] mx-auto px-6 py-20 md:py-28">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#1E2A54]">
            The results
          </p>
          <h2 className="mt-5 max-w-3xl text-[30px] md:text-[44px] leading-[1.08] tracking-[-0.02em] font-medium">
            The numbers, straight from Klaviyo &amp; Shopify.
          </h2>

          {/* Full-year Klaviyo dashboard (real numbers) */}
          <div className="mt-12">
            <KlaviyoSummary
              dateLabel="Full year · Klaviyo"
              total="$397,864.01"
              totalDelta={{ dir: "up", pct: "62%", period: "vs. previous year" }}
              attributed="$119,711.39"
              attributedSharePct="30.09"
              attributedDelta={{ dir: "up", pct: "204%", period: "vs. previous year" }}
              breakdown={[
                { label: "Per recipient", value: "$0.09" },
                { label: "Campaigns", value: "$72,577.07", pct: "60.63%" },
                { label: "Flows", value: "$47,134.32", pct: "39.37%" },
                { label: "Email", value: "$119,711.39", pct: "100.00%" },
                { label: "SMS", value: "$0.00", pct: "0.00%" },
              ]}
            />
          </div>

          <p className="mt-10 font-mono text-[11px] tracking-[0.15em] uppercase text-[#A39E92]">
            More windows from the same account
          </p>
          <div className="mt-5 grid sm:grid-cols-2 gap-6">
            {PROOF.map((p) => (
              <div
                key={p.stat}
                className="rounded-2xl border border-[#E6E3DB] bg-[#FAFAF9] p-8 md:p-10 flex flex-col"
              >
                <p className="font-mono text-[11px] tracking-wide uppercase text-[#A39E92]">
                  {p.source}
                </p>
                <p className="mt-6 text-4xl md:text-5xl font-medium tracking-[-0.03em] leading-none tabular-nums">
                  {p.stat}
                </p>
                <p className="mt-4 text-[16px] leading-[1.6] text-[#5A564C]">
                  {p.note}
                </p>

                <ProofShot src={p.src} alt={p.stat} className="mt-8" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="max-w-[1120px] mx-auto px-6 py-24 md:py-32 text-center">
        <h2 className="text-[30px] md:text-[46px] leading-[1.1] tracking-[-0.02em] font-medium max-w-2xl mx-auto">
          Your customers are worth more than you&rsquo;re collecting.
        </h2>
        <p className="mt-6 text-[18px] text-[#5A564C]">
          Let&rsquo;s look at your account and show you where.
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
