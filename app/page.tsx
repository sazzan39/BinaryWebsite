import Image from "next/image";
import Link from "next/link";
import { ResultsTeaser } from "@/components/site/ResultsTeaser";
import { RetentionCalculator } from "@/components/site/RetentionCalculator";
import { EmailGallery } from "@/components/site/EmailGallery";
import { CalendlyInline } from "@/components/site/CalendlyInline";

/**
 * Homepage — BinaryGen (light editorial).
 * Retention/email & SMS agency. Founder-voice copy, real proof.
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAF9] text-[#12100E] selection:bg-[#1E2A54] selection:text-[#FAFAF9]">
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
    <header className="sticky top-0 z-50 bg-[#FAFAF9]/85 backdrop-blur-md border-b border-[#EAE7DF]">
      <div className="max-w-[1120px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="BinaryGen home">
          <Image
            src="/BGR-logo.png"
            alt="BinaryGen"
            width={1450}
            height={620}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav className="hidden sm:flex items-center gap-8 text-[14px] text-[#5A564C]">
          {/* Case studies dropdown */}
          <div className="relative group">
            <a
              href="#results"
              className="inline-flex items-center gap-1 hover:text-[#12100E] transition-colors"
            >
              Case studies
              <span className="text-[10px] text-[#B7B2A6] group-hover:text-[#1E2A54] transition-colors">
                ▾
              </span>
            </a>
            <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-150">
              <div className="w-64 rounded-xl border border-[#E6E3DB] bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.25)] p-2">
                {CASES.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="block rounded-lg px-3 py-2.5 text-[14px] text-[#38352E] hover:bg-[#FAFAF9] transition-colors"
                  >
                    {c.label}
                    <span className="block text-[12px] text-[#A39E92]">
                      View the full case study →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <a href="#services" className="hover:text-[#12100E] transition-colors">
            What we do
          </a>
          <a href="#faq" className="hover:text-[#12100E] transition-colors">
            FAQ
          </a>
        </nav>

        <a
          href="#book"
          className="h-10 px-5 inline-flex items-center rounded-full bg-[#1E2A54] text-[#FAFAF9] text-[14px] font-medium hover:bg-[#141C3B] transition-colors"
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
        <p className="font-mono text-[12px] tracking-[0.2em] uppercase text-[#8A8578]">
          Retention for ecommerce brands
        </p>
        <h1 className="mt-8 text-[40px] sm:text-6xl md:text-[76px] leading-[1.04] tracking-[-0.03em] font-medium">
          Lower your CAC.
          <br />
          <span className="text-[#8A8578]">Raise your LTV.</span>
        </h1>
        <p className="mt-8 max-w-xl mx-auto text-[18px] md:text-[20px] leading-[1.6] text-[#4A473F]">
          We build the email and SMS retention that turns one-time buyers into
          repeat revenue — so you lean less on paid ads to grow.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="#book"
            className="h-14 px-8 inline-flex items-center justify-center rounded-full bg-[#1E2A54] text-[#FAFAF9] font-medium text-[16px] hover:bg-[#141C3B] transition-colors"
          >
            Book a call
          </a>
          <a
            href="#results"
            className="h-14 px-8 inline-flex items-center justify-center rounded-full border border-[#D8D4C9] text-[#12100E] font-medium text-[16px] hover:bg-white transition-colors"
          >
            See the results
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- ProofBar */

function ProofBar() {
  const stats = [
    { v: "$41M+", l: "in retention revenue generated for clients" },
    { v: "55+", l: "ecommerce brands" },
    { v: "18–35%", l: "of revenue from email, typically" },
  ];
  return (
    <section className="px-6 py-16 border-y border-[#EAE7DF] bg-white">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-4 text-center sm:text-left">
        {stats.map((s) => (
          <div key={s.l} className="sm:px-4">
            <div className="text-4xl md:text-5xl font-medium tracking-[-0.03em] tabular-nums">
              {s.v}
            </div>
            <p className="mt-3 text-[15px] text-[#6B665B] leading-snug max-w-[16rem] mx-auto sm:mx-0">
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
      d: "The automated emails that run whether you show up or not — welcome, abandoned checkout, post-purchase, win-back. Built once, earning every day.",
    },
    {
      k: "02",
      t: "Campaigns",
      d: "A real sending calendar tied to your launches, restocks, and season. Every send with a reason behind it — not a blast to everyone when someone remembers.",
    },
    {
      k: "03",
      t: "Segmentation & SMS",
      d: "The right message to the right people. We split your list by how customers actually behave, and add SMS where it earns its place.",
    },
  ];
  return (
    <section id="services" className="px-6 py-24 md:py-32">
      <div className="max-w-[1120px] mx-auto">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#8A8578]">
          What we do
        </p>
        <h2 className="mt-5 max-w-2xl text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.02em] font-medium">
          One channel, run properly.
        </h2>
        <div className="mt-16 grid md:grid-cols-3 gap-x-10 gap-y-12 border-t border-[#E6E3DB] pt-14">
          {items.map((it) => (
            <div key={it.k}>
              <span className="font-mono text-[12px] text-[#B7B2A6]">{it.k}</span>
              <h3 className="mt-4 text-[22px] font-medium tracking-[-0.01em]">
                {it.t}
              </h3>
              <p className="mt-4 text-[16px] leading-[1.65] text-[#5A564C]">
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
  const rows = [
    ["Blast the whole list and hope", "Segment by real behavior"],
    ["Chase open rates", "Measure revenue"],
    ["Junior account managers", "Senior operators on your account"],
    ["Set up flows and disappear", "In it every week"],
  ];
  return (
    <section className="px-6 py-24 md:py-32 bg-white border-y border-[#EAE7DF]">
      <div className="max-w-[1120px] mx-auto">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#8A8578]">
          How we&rsquo;re different
        </p>
        <h2 className="mt-5 max-w-2xl text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.02em] font-medium">
          Most email agencies do the opposite of this.
        </h2>
        <div className="mt-14 grid sm:grid-cols-2 gap-px bg-[#E6E3DB] border border-[#E6E3DB] rounded-2xl overflow-hidden">
          <div className="bg-[#FAFAF9] p-8 md:p-10">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#A39E92]">
              Most agencies
            </p>
            <ul className="mt-6 space-y-4">
              {rows.map((r) => (
                <li key={r[0]} className="text-[17px] text-[#8A8578]">
                  {r[0]}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-8 md:p-10">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#1E2A54]">
              BinaryGen
            </p>
            <ul className="mt-6 space-y-4">
              {rows.map((r) => (
                <li
                  key={r[1]}
                  className="text-[17px] font-medium text-[#12100E]"
                >
                  {r[1]}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Testimonials */

function Testimonials() {
  const videos = [{ id: "Azw5u1ChjBo" }, { id: "ElsY79XAfrY" }, { id: "YnTypVQVBRA" }];
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="max-w-[1120px] mx-auto">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#8A8578]">
          In their words
        </p>
        <h2 className="mt-5 max-w-2xl text-[32px] md:text-[48px] leading-[1.05] tracking-[-0.02em] font-medium">
          The founders, on camera.
        </h2>
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-[840px]">
          {videos.map((v) => (
            <figure key={v.id}>
              <a
                href={`https://www.youtube.com/shorts/${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[9/16] rounded-2xl overflow-hidden border border-[#E6E3DB] bg-[#12100E]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://i.ytimg.com/vi/${v.id}/oardefault.jpg`}
                  alt="Founder testimonial"
                  className="absolute inset-0 h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="h-14 w-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                    <span className="ml-0.5 border-y-[9px] border-y-transparent border-l-[15px] border-l-[#12100E]" />
                  </span>
                </span>
              </a>
            </figure>
          ))}
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
      a: "Most agencies treat email like a newsletter. We treat it like a revenue channel and run it like operators — segmented, tested, and tied to your numbers. Senior people on your account, not juniors learning on your brand.",
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
      a: "Then we'll audit it and show you exactly where the gaps are before you commit to anything. If there's no room to grow, we'll say so — we don't take on brands we can't move.",
    },
  ];
  return (
    <section id="faq" className="px-6 py-24 md:py-32 bg-white border-y border-[#EAE7DF]">
      <div className="max-w-[820px] mx-auto">
        <h2 className="text-[32px] md:text-[46px] leading-[1.05] tracking-[-0.02em] font-medium">
          Questions.
        </h2>
        <div className="mt-12 border-t border-[#E6E3DB]">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group border-b border-[#E6E3DB]"
            >
              <summary className="flex items-center justify-between gap-6 cursor-pointer list-none py-6 [&::-webkit-details-marker]:hidden">
                <h3 className="text-[19px] font-medium tracking-[-0.01em]">
                  {f.q}
                </h3>
                <span className="shrink-0 text-2xl leading-none text-[#8A8578] transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-6 pr-8 -mt-1 text-[17px] leading-[1.6] text-[#5A564C]">
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
        <p className="mt-5 text-[18px] md:text-[20px] text-[#5A564C] max-w-xl mx-auto">
          Pick a time below. A short, honest call — we&rsquo;ll show you the gap
          in your account. No pitch, no pressure.
        </p>
        <div className="mt-12 text-left">
          <CalendlyInline />
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Footer */

function FooterLight() {
  return (
    <footer className="px-6 py-12 border-t border-[#EAE7DF]">
      <div className="max-w-[1120px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <Image
          src="/BGR-logo.png"
          alt="BinaryGen"
          width={1450}
          height={620}
          className="h-6 w-auto"
        />
        <div className="flex items-center gap-6 text-[14px] text-[#5A564C]">
          <a
            href="https://x.com/39Sazzan"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#12100E] transition-colors"
          >
            X
          </a>
          <a
            href="https://www.linkedin.com/company/getbinarygen/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#12100E] transition-colors"
          >
            LinkedIn
          </a>
          <a href="#book" className="hover:text-[#12100E] transition-colors">
            Book a call
          </a>
        </div>
      </div>
      <div className="max-w-[1120px] mx-auto mt-8 text-[13px] text-[#A39E92]">
        © {new Date().getFullYear()} BinaryGen. Email &amp; SMS retention for
        ecommerce.
      </div>
    </footer>
  );
}
