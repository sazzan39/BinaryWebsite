import Image from "next/image";
import Link from "next/link";
import { ResultsTeaser } from "@/components/site/ResultsTeaser";
import { RetentionCalculator } from "@/components/site/RetentionCalculator";
import { EmailGallery } from "@/components/site/EmailGallery";
import { CalendlyInline } from "@/components/site/CalendlyInline";
import { VSL } from "@/components/site/VSL";
import { CountUp } from "@/components/site/CountUp";
import { ComparisonLedger } from "@/components/site/ComparisonLedger";
import { TestimonialDrum } from "@/components/site/TestimonialDrum";



export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-ink selection:bg-navy selection:text-onnavy">
      <NavLight />
      <main>
        <Hero />
        <ProofBar />
        <ResultsTeaser />
        <Services />
        <EmailGallery />
        <Difference />
        <Testimonials />
        <FAQ />
        <RetentionCalculator />
        <BookSection />
      </main>
      <FooterLight />
    </div>
  );
}

/* ------------------------------------------------------------------ Nav */

const CASES = [
  { href: "/work/fashion-accessories", label: "Fashion & Accessories" },
  { href: "/work/health-supplement", label: "Health & Supplement" },
];

function NavLight() {
  return (
    <header className="sticky top-0 z-50 bg-bg/85 backdrop-blur-md border-b border-linesoft">
      <div className="max-w-[1120px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="BinaryGen home">
          <Image
            src="/BGR-logo.png"
            alt="BinaryGen"
            width={1450}
            height={620}
            priority
            className="h-7 w-auto dark:hidden"
          />
          <Image
            src="/BGR-logo-White.png"
            alt="BinaryGen"
            width={1450}
            height={620}
            priority
            className="h-7 w-auto hidden dark:block"
          />
        </Link>

        <nav className="hidden sm:flex items-center gap-8 text-[14px] text-body">
          {/* Case studies dropdown */}
          <div className="relative group">
            <a
              href="#results"
              className="inline-flex items-center gap-1 hover:text-ink transition-colors"
            >
              Case studies
              <span className="text-[10px] text-faint group-hover:text-navy transition-colors">
                ▾
              </span>
            </a>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150">
              <div className="w-64 rounded-xl border border-line bg-card shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] p-2">
                {CASES.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="block rounded-lg px-3 py-2.5 text-[14px] text-ink2 hover:bg-bg transition-colors"
                  >
                    {c.label}
                    <span className="block text-[12px] text-faint2">
                      View the full case study →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <a href="#services" className="hover:text-ink transition-colors">
            What we do
          </a>
          <Link href="/resources" className="hover:text-ink transition-colors">
            Free Resources
          </Link>
          <a href="#faq" className="hover:text-ink transition-colors">
            FAQ
          </a>
        </nav>

        <a
          href="#book"
          className="h-10 px-5 inline-flex items-center rounded-full bg-navy text-onnavy text-[14px] font-medium hover:bg-navydeep transition-colors"
        >
          Book a call
        </a>
      </div>
    </header>
  );
}

/* ----------------------------------------------------------------- Hero */

function Hero() {
  return (
    <section className="px-6 pt-20 md:pt-28 pb-16">
      <div className="max-w-[1000px] mx-auto text-center">
        <p
          className="hero-in font-mono text-[12px] tracking-[0.2em] uppercase text-subtle"
          style={{ ["--d" as string]: "0ms" }}
        >
          Retention for Ecommerce brands
        </p>
        <h1 className="mt-8 text-[40px] sm:text-6xl md:text-[76px] leading-[1.04] tracking-[-0.03em] font-medium">
          <span
            className="hero-in block"
            style={{ ["--d" as string]: "100ms" }}
          >
            Lower your CAC.
          </span>
          <span
            className="hero-in block text-subtle"
            style={{ ["--d" as string]: "180ms" }}
          >
            Raise your LTV.
          </span>
        </h1>
        <p
          className="hero-in mt-8 max-w-xl mx-auto text-[18px] md:text-[20px] leading-[1.6] text-body3"
          style={{ ["--d" as string]: "300ms" }}
        >
          We build the email and SMS retention that turns one-time buyers into
          repeat revenue so you lean less on paid ads to grow.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#book"
            className="hero-cta h-14 px-8 inline-flex items-center justify-center rounded-full bg-navy text-onnavy font-medium text-[16px] hover:bg-navydeep transition-colors"
            style={{ ["--d" as string]: "420ms" }}
          >
            Book a call
          </a>
          <a
            href="#results"
            className="hero-cta h-14 px-8 inline-flex items-center justify-center rounded-full border border-line2 text-ink font-medium text-[16px] hover:bg-card transition-colors"
            style={{ ["--d" as string]: "490ms" }}
          >
            See the results
          </a>
        </div>

        <div
          className="hero-video max-w-[860px] mx-auto mt-16"
          style={{ ["--d" as string]: "580ms" }}
        >
          <VSL id="teiaovJMeHI" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- ProofBar */

function ProofBar() {
  const stats = [
    {
      node: <CountUp prefix="$" to={41} suffix="M+" />,
      l: "in retention revenue generated for clients",
    },
    { node: <CountUp to={55} suffix="+" />, l: "ecommerce brands" },
    {
      node: <CountUp prefix="18–" to={35} suffix="%" />,
      l: "of revenue from email, typically",
    },
  ];
  return (
    <section className="px-6 py-16 border-y border-linesoft bg-card">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-4 text-center">
        {stats.map((s) => (
          <div key={s.l} className="sm:px-4">
            <div className="text-4xl md:text-5xl font-medium tracking-[-0.03em] tabular-nums">
              {s.node}
            </div>
            <p className="mt-3 text-[15px] text-body2 leading-snug max-w-[16rem] mx-auto">
              {s.l}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Services */

function Services() {
  const items = [
    {
      k: "01",
      t: "Flows",
      d: "The automated emails that run whether you show up or not: welcome, abandoned checkout, post-purchase, win-back. Built once, earning every day.",
    },
    {
      k: "02",
      t: "Campaigns",
      d: "A real sending calendar tied to your launches, restocks, and season. Every send with a reason behind it, not a blast to everyone when someone remembers.",
    },
    {
      k: "03",
      t: "Segmentation & SMS",
      d: "The right message to the right people. We split your list by how customers actually behave, and add SMS where it earns its place.",
    },
  ];
  return (
    <section id="services" className="px-6 py-24 md:py-32">
      <div className="max-w-[1120px] mx-auto text-center">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-subtle">
          What we do
        </p>
        <h2 className="mt-5 max-w-2xl mx-auto text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.02em] font-medium">
          One channel, run properly.
        </h2>
        <div className="mt-16 grid md:grid-cols-3 gap-x-10 gap-y-12 border-t border-line pt-14">
          {items.map((it) => (
            <div key={it.k} className="flex flex-col items-center">
              <span className="font-mono text-[12px] text-faint">{it.k}</span>
              <h3 className="mt-4 text-[22px] font-medium tracking-[-0.01em]">
                {it.t}
              </h3>
              <p className="mt-4 max-w-sm text-[16px] leading-[1.65] text-body">
                {it.d}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Difference */

function Difference() {
  return (
    <section className="px-6 py-24 md:py-32 bg-card border-y border-linesoft">
      <div className="max-w-[1120px] mx-auto text-center">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-subtle">
          How we&rsquo;re different
        </p>
        <h2 className="mt-5 max-w-2xl mx-auto text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.02em] font-medium">
          Most email agencies do the opposite of this.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-[16px] md:text-[18px] text-body leading-relaxed">
          Why 55+ ecommerce brands partner with BinaryGen over standard agency
          retainers.
        </p>

        <div className="mt-14 rounded-2xl border border-line bg-cream/60 p-6 md:p-10">
          <ComparisonLedger />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Testimonials */

function Testimonials() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="max-w-[1120px] mx-auto text-center">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-subtle">
          In their words
        </p>
        <h2 className="mt-5 max-w-2xl mx-auto text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.02em] font-medium">
          The founders, on camera.
        </h2>
        <div className="mt-14">
          <TestimonialDrum />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ FAQ */

function FAQ() {
  const faqs = [
    {
      q: "Who do you work with?",
      a: "Ecommerce brands doing real volume that are leaving money in the customers they already have. We've run retention for 55+ brands across fashion, beauty, supplements, and accessories.",
    },
    {
      q: "What makes you different?",
      a: "Most agencies treat email like a newsletter. We treat it like a revenue channel and run it like operators: segmented, tested, and tied to your numbers. Senior people on your account, not juniors learning on your brand.",
    },
    {
      q: "How fast will we see results?",
      a: "The flows start earning the day they go live. The bigger lift usually shows in the first couple of months, as your segmentation and sending calendar compound.",
    },
    {
      q: "Do we need to be on Klaviyo?",
      a: "It's what we build on and what we recommend. If you're already there, great. If not, we'll tell you honestly whether the move is worth it for you.",
    },
    {
      q: "What if our email already works?",
      a: "Then we'll audit it and show you exactly where the gaps are before you commit to anything. If there's no room to grow, we'll say so. We don't take on brands we can't move.",
    },
  ];
  return (
    <section id="faq" className="px-6 py-24 md:py-32 bg-card border-y border-linesoft">
      <div className="max-w-[820px] mx-auto">
        <h2 className="text-center text-[32px] md:text-[46px] leading-[1.05] tracking-[-0.02em] font-medium">
          Questions.
        </h2>
        <div className="mt-12 border-t border-line">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group border-b border-line"
            >
              <summary className="flex items-center justify-between gap-6 cursor-pointer list-none py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[19px] font-medium tracking-[-0.01em]">
                  {f.q}
                </h3>
                <span className="shrink-0 text-2xl leading-none text-subtle transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-6 pr-8 -mt-1 text-[17px] leading-[1.6] text-body">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Book (CTA) */

function BookSection() {
  return (
    <section id="book" className="px-6 py-24 md:py-32 scroll-mt-20">
      <div className="max-w-[900px] mx-auto text-center">
        <h2 className="text-[34px] md:text-[52px] leading-[1.08] tracking-[-0.02em] font-medium">
          See where your revenue is hiding.
        </h2>
        <p className="mt-5 text-[18px] md:text-[20px] text-body max-w-xl mx-auto">
          Pick a time below. A short, honest call. We&rsquo;ll show you the gap
          in your account. No pitch, no pressure.
        </p>
        <div className="mt-12">
          <CalendlyInline />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Footer */

function FooterLight() {
  return (
    <footer className="px-6 py-12 border-t border-linesoft">
      <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <Image
          src="/BGR-logo.png"
          alt="BinaryGen"
          width={1450}
          height={620}
          className="h-6 w-auto dark:hidden"
        />
        <Image
          src="/BGR-logo-White.png"
          alt="BinaryGen"
          width={1450}
          height={620}
          className="h-6 w-auto hidden dark:block"
        />
        <div className="flex items-center gap-6 text-[14px] text-body">
          <a
            href="https://x.com/39Sazzan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-ink transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[15px] w-[15px] shrink-0"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            
          </a>
          <a
            href="https://www.linkedin.com/company/getbinarygen/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-ink transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[15px] w-[15px] shrink-0"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455zM5.337 7.433a2.06 2.06 0 1 1 0-4.121 2.06 2.06 0 0 1 0 4.121M7.114 20.452H3.558V9h3.556zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
            </svg>
          </a>
          <a
            href="#book"
            className="inline-flex items-center gap-1.5 hover:text-ink transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[15px] w-[15px] shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="17" rx="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="16" y1="2" x2="16" y2="6" />
            </svg>
            Book a call
          </a>
        </div>
      </div>
      <div className="max-w-[1120px] mx-auto mt-8 text-center text-[13px] text-faint2">
        © {new Date().getFullYear()} BinaryGen. Email &amp; SMS retention for
        ecommerce.
      </div>
    </footer>
  );
}
