import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Resources | BinaryGen",
  description:
    "Premium guides on ecommerce email & SMS retention: The No-Discount Growth Playbook and the Q4 Ecommerce Retention Playbook.",
};

// `href` is what makes a card live. An entry without one renders as a disabled
// "Coming soon" card until its page exists.
const RESOURCES: {
  title: string;
  description: string;
  tag: string;
  href?: string;
  cta?: string;
}[] = [
  {
    title: "The No-Discount Growth Playbook",
    description:
      "How to scale email revenue without training your list to wait for a code: the twelve-step sequence we run to swap the welcome discount, prove real incrementality with a holdout, and rebuild relevance so price stops being the only lever.",
    tag: "Guide",
    href: "/resources/no-discount-growth-playbook",
    cta: "Read it",
  },
  {
    title: "Q4 Ecommerce Retention Playbook",
    description:
      "The flows, segmentation, and sending calendar we use to get brands ready for BFCM and the rest of Q4: the same playbook behind the case studies on this site.",
    tag: "Guide",
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-bg text-ink selection:bg-navy selection:text-onnavy">
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

      <section className="max-w-[900px] mx-auto px-6 pt-16 md:pt-24 pb-24 text-center">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-subtle">
          Premium Resources
        </p>
        <h1 className="mt-6 text-[34px] sm:text-[48px] md:text-[56px] leading-[1.05] tracking-[-0.02em] font-medium">
          Guides on getting more revenue from email.
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-[17px] md:text-[18px] text-body leading-relaxed">
          The same frameworks we run for our retainer clients, written out in
          full.
        </p>

        <div className="mt-16 grid gap-6 text-left">
          {RESOURCES.map((r) => (
            <div
              key={r.title}
              className="rounded-2xl border border-line bg-card p-8 md:p-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            >
              <div>
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-navy">
                  {r.tag}
                </span>
                <h2 className="mt-3 text-[20px] md:text-[24px] font-medium tracking-[-0.01em]">
                  {r.title}
                </h2>
                <p className="mt-2 text-[15px] text-body leading-relaxed max-w-md">
                  {r.description}
                </p>
              </div>
              {r.href ? (
                <Link
                  href={r.href}
                  className="shrink-0 h-12 px-7 inline-flex items-center justify-center rounded-full bg-navy text-onnavy font-medium text-[15px] hover:bg-navydeep transition-colors"
                >
                  {r.cta ?? "Read it"} →
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  title="Coming soon"
                  className="shrink-0 h-12 px-7 inline-flex items-center justify-center rounded-full bg-navy/40 text-onnavy font-medium text-[15px] cursor-not-allowed"
                >
                  Coming soon
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
