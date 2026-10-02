import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { EmailGate } from "@/components/site/EmailGate";
import { VSL } from "@/components/site/VSL";
import { KlaviyoScorecard } from "@/components/site/KlaviyoScorecard";
import { CALENDLY_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "The 7-Point Klaviyo Audit | BinaryGen",
  description:
    "Score your account in two minutes, then watch the walkthrough. Seven diagnostic questions you can answer from memory to see where your account is actually leaking.",
};

/* ------------------------------------------------------------ primitives */

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-16 pt-10 border-t border-line text-[24px] md:text-[30px] leading-[1.18] tracking-[-0.02em] font-medium">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 text-[16px] md:text-[17px] text-body leading-[1.7]">
      {children}
    </p>
  );
}

function Pull({
  label,
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <blockquote className="mt-8 border-l-2 border-navy/40 pl-6 text-[16px] md:text-[17px] text-body2 italic leading-[1.7]">
      {label && <strong className="not-italic text-ink2">{label} </strong>}
      {children}
    </blockquote>
  );
}

/* ------------------------------------------------------------------ page */

export default function SevenPointKlaviyoAuditPage() {
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
          href="/resources"
          className="font-mono text-[12px] tracking-wide text-body2 hover:text-ink transition-colors"
        >
          ← Resources
        </Link>
      </header>

      <article className="max-w-[760px] mx-auto px-6 pt-14 md:pt-20 pb-28">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-subtle">
          BinaryGen · Premium resource
        </p>
        <h1 className="mt-6 text-[34px] sm:text-[44px] md:text-[52px] leading-[1.06] tracking-[-0.03em] font-medium">
          The 7-Point Klaviyo Audit
        </h1>
        <p className="mt-4 text-[18px] md:text-[20px] text-body leading-[1.5]">
          Score your account in two minutes, then watch the walkthrough.
        </p>
        <p className="mt-3 font-mono text-[12px] text-subtle">
          Oct 1, 2026 · BinaryGen
        </p>

        <div className="mt-8 space-y-5 text-[16px] md:text-[17px] text-body leading-[1.7]">
          <p>
            Most audits start by opening Klaviyo. This one starts with seven
            questions you can answer from memory.
          </p>
          <p>
            That&rsquo;s deliberate. If you can&rsquo;t answer them without
            logging in, you&rsquo;re not running the account on these numbers,
            and that gap is the finding. Score yourself first. The video then
            walks through where each one lives and what to do about it.
          </p>
        </div>

        <EmailGate resource="7-point-klaviyo-audit">
          {/* Video Walkthrough Embed */}
          <section className="mt-10">
            <VSL
              id="VymhbmEq5dM"
              title="The 7-Point Klaviyo Audit Walkthrough"
              alt="Watch The 7-Point Klaviyo Audit Walkthrough"
            />
            <p className="mt-3 text-center font-mono text-[12px] text-faint2">
              Watch it with your score in hand
            </p>
          </section>

          {/* Scorecard & What the number means */}
          <KlaviyoScorecard />

          {/* Section: Why these seven */}
          <section className="mt-16 pt-10 border-t border-line">
            <h2 className="text-[24px] md:text-[30px] leading-[1.18] tracking-[-0.02em] font-medium">
              Why these seven
            </h2>
            <P>
              There&rsquo;s a standard list that gets checked instead, and
              it&rsquo;s the wrong list.
            </P>
            <P>
              <strong className="text-ink">Open rate</strong> is the usual
              starting point. Apple Mail Privacy Protection auto-opens mail, so
              the number moves without anyone reading anything. It still works
              as a relative signal inside one segment tracked over months. As a
              health metric it&rsquo;s decorative.
            </P>
            <P>
              <strong className="text-ink">Template design</strong> comes next. A
              well-built email to the wrong segment at the wrong moment still
              fails, and redesigning is far more satisfying than fixing timing,
              which is why it happens first and shouldn&rsquo;t.
            </P>
            <P>
              <strong className="text-ink">Subject line testing</strong> is the
              third. A few percent on one send, while something structural goes
              untouched for another quarter.
            </P>
            <P>
              None of those are wrong to do. They&rsquo;re wrong to do first,
              because each one is a small multiplier on a system that may not be
              running. The seven checks in the video all ask the same underlying
              question: is the machine built, and is it pointed at the right
              moments? Once the answer is yes, subject lines start to matter.
            </P>
          </section>

          {/* Section: The part nobody wants to hear */}
          <section className="mt-16 pt-10 border-t border-line">
            <h2 className="text-[24px] md:text-[30px] leading-[1.18] tracking-[-0.02em] font-medium">
              The part nobody wants to hear
            </h2>
            <P>
              Five of the seven checks have nothing to do with writing emails.
              They&rsquo;re about timing, segmentation and measurement.
            </P>
            <P>
              That&rsquo;s usually the real finding. Brands come in thinking
              they have a copy problem, and most of the time copy is the one
              thing that&rsquo;s fine. The flows fire at the wrong moment, to
              the wrong group, and nobody has looked at the split in a year.
            </P>

            <Pull label="Finding:">
              If the timing and segments are wrong, better words just deliver the
              same mismatch faster.
            </Pull>
          </section>

          {/* CTA Box */}
          <div className="mt-16 p-8 md:p-10 rounded-3xl border border-line bg-card shadow-lg shadow-black/5">
            <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-navy font-medium">
              Next step
            </p>
            <h3 className="mt-3 text-[22px] md:text-[26px] font-medium tracking-[-0.01em]">
              Review your Klaviyo account with us
            </h3>
            <p className="mt-3 text-[16px] text-body leading-relaxed">
              Scored under 4 and would rather not do it alone? Bring your Klaviyo
              open and we&rsquo;ll go through all seven live &mdash; real
              numbers, where the account is actually leaking, and the first
              thing to change.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="h-12 px-7 inline-flex items-center justify-center rounded-full bg-navy text-onnavy font-medium text-[15px] hover:bg-navydeep transition-colors"
              >
                Book a 15-minute review →
              </a>
              <span className="font-mono text-[12px] text-subtle">
                BinaryGen ·{" "}
                <Link href="/" className="hover:text-ink underline">
                  getbinarygen.com
                </Link>
              </span>
            </div>
          </div>
        </EmailGate>
      </article>
    </div>
  );
}
