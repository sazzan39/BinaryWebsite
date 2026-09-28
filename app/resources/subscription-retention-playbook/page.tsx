import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { EmailGate } from "@/components/site/EmailGate";

export const metadata: Metadata = {
  title: "The Subscription Retention Playbook | BinaryGen",
  description:
    "For DTC brands where the next order is already scheduled and the job is stopping it from being cancelled. A supplement case study ($0 to $57,571 in email revenue in eight weeks), then the full thirteen-section playbook.",
};

/* ------------------------------------------------------------ primitives */

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-16 pt-10 border-t border-line text-[24px] md:text-[30px] leading-[1.18] tracking-[-0.02em] font-medium">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-10 text-[17px] md:text-[18px] font-medium tracking-[-0.01em]">
      {children}
    </h3>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-5 text-[16px] md:text-[17px] text-body leading-[1.7]">
      {children}
    </p>
  );
}

function Pull({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <blockquote className="mt-8 border-l-2 border-navy/40 pl-6 text-[16px] md:text-[17px] text-body2 italic leading-[1.7]">
      {label && <strong className="not-italic text-ink2">{label} </strong>}
      {children}
    </blockquote>
  );
}

function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative pl-6 text-[16px] md:text-[17px] text-body leading-[1.7] before:absolute before:left-0 before:top-[0.7em] before:h-[5px] before:w-[5px] before:rounded-full before:bg-navy/60"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function Numbers({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="mt-6 space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-4">
          <span className="shrink-0 font-mono text-[12px] text-navy pt-[0.35em]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-[16px] md:text-[17px] text-body leading-[1.7]">
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

/** Bordered table in the same style as the No-Discount playbook's swap table. */
function Table({
  head,
  rows,
  cols,
}: {
  head: string[];
  rows: React.ReactNode[][];
  cols: string;
}) {
  return (
    <div className="mt-8 overflow-x-auto rounded-2xl border border-line">
      <div className="min-w-[520px]">
        <div
          className="grid bg-cream/40 border-b border-line"
          style={{ gridTemplateColumns: cols }}
        >
          {head.map((h, i) => (
            <div
              key={h}
              className={`px-5 py-3 font-mono text-[11px] tracking-[0.16em] uppercase text-subtle ${
                i > 0 ? "border-l border-line" : ""
              }`}
            >
              {h}
            </div>
          ))}
        </div>
        {rows.map((row, r) => (
          <div
            key={r}
            className={`grid ${r > 0 ? "border-t border-line" : ""}`}
            style={{ gridTemplateColumns: cols }}
          >
            {row.map((cell, c) => (
              <div
                key={c}
                className={`px-5 py-4 text-[15px] leading-relaxed ${
                  c === 0 ? "text-body2" : "text-ink2 border-l border-line"
                }`}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Klaviyo screenshots are light UI, so they keep a white plate in both themes. */
function Shot({
  src,
  alt,
  width,
  height,
  caption,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: React.ReactNode;
}) {
  return (
    <figure className="mt-10">
      <div className="rounded-2xl border border-line overflow-hidden bg-white p-2 sm:p-3">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, 672px"
          className="w-full h-auto rounded-xl"
        />
      </div>
      <figcaption className="mt-3 text-[13px] text-faint2 leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}

function Stat({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-card px-5 py-5">
      <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-subtle">
        {label}
      </p>
      <p className="mt-2 text-[26px] md:text-[30px] leading-none tracking-[-0.02em] font-medium text-ink">
        {value}
      </p>
      {note && <p className="mt-2 text-[13px] text-body2">{note}</p>}
    </div>
  );
}

/* ------------------------------------------------------------- diagrams */

function Node({
  children,
  tone = "plain",
}: {
  children: React.ReactNode;
  tone?: "plain" | "strong" | "bad" | "good";
}) {
  const tones = {
    plain: "border-line bg-card text-ink2",
    strong: "border-navy/50 bg-navy/[0.06] text-ink",
    bad: "border-line bg-cream/40 text-body2",
    good: "border-navy/50 bg-navy/[0.06] text-ink",
  };
  return (
    <div
      className={`rounded-xl border px-4 py-3 text-[14px] leading-snug text-center ${tones[tone]}`}
    >
      {children}
    </div>
  );
}

function Arrow() {
  return (
    <span
      aria-hidden
      className="self-center font-mono text-[14px] text-navy/70 rotate-90 sm:rotate-0"
    >
      →
    </span>
  );
}

function Diagram({
  label,
  caption,
  children,
}: {
  label: string;
  caption: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <figure className="mt-8" aria-label={label}>
      <div className="rounded-2xl border border-line bg-bg p-5 sm:p-6">
        {children}
      </div>
      <figcaption className="mt-3 text-[13px] text-faint2 leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------- page data */

const DUNNING: React.ReactNode[][] = [
  ["1", "Immediate", "One-click update", "Plain text often beats designed HTML: it reads as a system notice"],
  ["2", "Day 3", "Specificity", "Name the exact date the next box ships or access lapses"],
  ["3", "Day 7", "Offer pause", "A paused subscriber is worth far more than a lapsed one"],
  ["4", "Day 12", "Final notice", "Make the post-lapse reactivation path one click"],
  ["5", "Day 25", "Reactivation", "After the lapse. Different tone: this is a winback now"],
];

const TRADE: React.ReactNode[][] = [
  ["A small rise in clean cancellations", "A meaningful drop in chargebacks"],
  ["Some revenue you would have collected this cycle", "Fewer spam complaints against your domain"],
  ["", "Fewer support tickets"],
  ["", "A customer you can win back rather than one who disputed you"],
];

const CYCLES: React.ReactNode[][] = [
  ["Cycle 1", "Deciding whether this was a good idea", "Deliver first value fast, set expectations honestly"],
  ["Cycle 2", "The real churn moment", "Prove the second delivery is not a repeat of the first"],
  ["Cycle 3", "Habit forming", "Reinforce routine and identity"],
  ["Cycle 4+", "Stable", "Expand, upsell, refer"],
];

const BEFORE_AFTER: React.ReactNode[][] = [
  ["Total revenue", "$74,936.77", "$212,463.23"],
  ["Email revenue", "$0.00", "$57,571.60"],
  ["Share of total", "0.00%", "27.10%"],
  ["Campaigns", "$0.00", "$43,304.88 (75%)"],
  ["Flows", "$0.00", "$14,266.72 (25%)"],
  ["Per recipient", "$0.00", "$0.87"],
];

const PER_DAY: React.ReactNode[][] = [
  ["Store revenue", "$2,025", "$3,727 (+84%)"],
  ["Email revenue", "$0", "$1,010"],
];

const READINGS: [string, string][] = [
  ["Email did not cause the growth", "Revenue was already +158%. Email decides whether it is keepable."],
  ["75% campaigns is right at week 8", "And wrong at month 6. That ratio has to invert."],
  ["$0.87 per recipient is healthy", "Not spectacular. Per-recipient flatters small lists."],
  ["Eight weeks is a direction", "No seasonal dip or full cycle tested yet."],
];

const BUILD: [string, string][] = [
  ["Days 1–7", "Authenticate + warm"],
  ["Days 7–21", "Dunning sequence"],
  ["Days 14–35", "Post-purchase spine"],
  ["Days 21–56", "Widen + campaign"],
];

/* ------------------------------------------------------------------ page */

export default function SubscriptionRetentionPlaybook() {
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

      <article className="max-w-[720px] mx-auto px-6 pt-14 md:pt-20 pb-28">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-subtle">
          BinaryGen · Premium resource
        </p>
        <h1 className="mt-6 text-[34px] sm:text-[44px] md:text-[52px] leading-[1.06] tracking-[-0.03em] font-medium">
          The Subscription Retention Playbook
        </h1>
        <p className="mt-6 text-[18px] md:text-[20px] text-body leading-[1.6]">
          For DTC brands where the next order is already scheduled, and the job
          is stopping it from being cancelled.
        </p>

        <EmailGate resource="subscription-retention-playbook">
          <H2>Who&rsquo;s writing this</H2>
          <P>I&rsquo;m Sajan Dhakal, founder of BinaryGen.</P>
          <P>
            I started BinaryGen after seeing the same problem across DTC brands:
            founders were spending heavily to acquire customers, while the
            customers they already paid for were quietly disappearing.
          </P>
          <P>
            One brand was doing around $24k/month, with just $1,314 coming from
            email. Campaign revenue was literally{" "}
            <strong className="text-ink">$0</strong>.
          </P>
          <P>
            Seven months later, that same store did $410k in a month, with $104k
            from email.
          </P>
          <P>
            That&rsquo;s why BinaryGen exists. Since then, we&rsquo;ve worked
            with supplement, wellness and skincare brands across the US and
            Canada, rebuilding retention systems, fixing deliverability, and
            turning email into a much bigger revenue channel.
          </P>

          <H3>Why I&rsquo;m giving this away</H3>
          <P>
            Because knowing what&rsquo;s broken was never the hard part.
            Actually fixing it is.
          </P>
          <P>
            Everything below is the same process we use with clients, step by
            step. No hidden &ldquo;book a call to find out more.&rdquo;
          </P>
          <P>
            If you can implement it yourself, great. And if you get halfway
            through and realise you&rsquo;d rather have someone else handle it,
            you know where to find me.
          </P>
          <P>The latest case study comes first, followed by the full playbook.</P>

          {/* ------------------------------------------------ case study */}

          <H2>Case study: The $75,000 Blind Spot</H2>
          <p className="mt-4 font-mono text-[11px] tracking-[0.16em] uppercase text-navy">
            Supplement brand · Subscription · Shopify + Klaviyo
          </p>
          <p className="mt-5 text-[18px] md:text-[20px] text-ink leading-[1.5] font-medium tracking-[-0.01em]">
            Eight weeks. $0.00 → $57,571.60.
          </p>

          <H3>Before · 37 days, Jun 25 – Jul 31</H3>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Stat label="Total revenue" value="$74,936.77" />
            <Stat label="Growth" value="+158%" note="vs. previous period" />
            <Stat label="Email revenue" value="$0.00" />
          </div>
          <Shot
            src="/subscription-case-study/before.png"
            alt="Klaviyo business performance summary for Jun 25 to Jul 31 2026: $74,936.77 total revenue, up 158% vs. previous period, and $0.00 attributed revenue at 0.00% of total. Per recipient, campaigns, flows and email all read $0.00; push and text messaging show setup prompts."
            width={1390}
            height={802}
            caption="Before: revenue up 158%, attributed revenue at $0.00 across campaigns, flows and email."
          />
          <P>
            Revenue up 158%. Email at absolute zero. Not underperforming:{" "}
            <strong className="text-ink">absent</strong>.
          </P>

          <H3>What that meant in practice</H3>
          <Diagram
            label="Three churn causes, one ending"
            caption="Three customers, three reasons, one ending, and nothing sent at any step."
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="grid gap-2 sm:w-[34%]">
                <Node>Card expires</Node>
                <Node>Cycle 2 feels like Cycle 1</Node>
                <Node>Over-supplied, wants to skip</Node>
              </div>
              <Arrow />
              <Node tone="bad">No email</Node>
              <Arrow />
              <Node>Subscription ends</Node>
              <Arrow />
              <Node tone="strong">Logged as churn</Node>
            </div>
          </Diagram>
          <Pull label="The Blind Spot.">
            The missing revenue was never the problem. The missing floor was.
            Growth hides a retention hole perfectly, then stops hiding it at the
            worst possible moment.
          </Pull>

          <H3>Why we could not just email the list</H3>
          <Diagram
            label="The cold start problem"
            caption="A never-mailed list on a domain with no history: the first big send decides how inboxes judge you."
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <Node>List never mailed</Node>
              <Arrow />
              <Node>Domain has no sending history</Node>
              <Arrow />
              <Node tone="strong">First big send</Node>
              <Arrow />
              <div className="grid gap-2 sm:w-[36%]">
                <Node tone="bad">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-subtle">
                    Blast
                  </span>
                  <br />
                  Reads as spam. No record to judge it
                </Node>
                <Node tone="good">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-navy">
                    Ramp
                  </span>
                  <br />
                  Signals earned. Placement holds
                </Node>
              </div>
            </div>
          </Diagram>
          <Pull label="The Cold Start Problem.">
            The risk is not list fatigue. It is teaching every inbox provider to
            distrust your domain in week one.
          </Pull>

          <H3>The build</H3>
          <ol className="mt-6 grid gap-3 sm:grid-cols-4">
            {BUILD.map(([when, what], i) => (
              <li
                key={when}
                className="rounded-2xl border border-line bg-card px-4 py-4"
              >
                <span className="font-mono text-[11px] text-navy">
                  {String(i + 1).padStart(2, "0")} · {when}
                </span>
                <p className="mt-2 text-[15px] text-ink2 leading-snug">{what}</p>
              </li>
            ))}
          </ol>
          <P>
            Payment recovery ships before promotion, because it recovers
            customers who never chose to leave.
          </P>

          <H3>After · 57 days, Aug 1 – Sep 26</H3>
          <Shot
            src="/subscription-case-study/after.png"
            alt="Klaviyo business performance summary for Aug 1 to Sep 26 2026: $212,463.23 total revenue, up 116% vs. previous period, and $57,571.60 attributed revenue at 27.10% of total. Per recipient $0.87, campaigns $43,304.88 (75.22%), flows $14,266.72 (24.78%), email $57,571.60 (100%)."
            width={1372}
            height={812}
            caption="After: $57,571.60 attributed, 27.10% of total revenue, from a channel that produced nothing eight weeks earlier."
          />
          <Table
            head={["", "Before", "After"]}
            cols="1.1fr 1fr 1.2fr"
            rows={BEFORE_AFTER}
          />
          <P>Different window lengths, so per day:</P>
          <Table
            head={["Per day", "Before", "After"]}
            cols="1.1fr 1fr 1.2fr"
            rows={PER_DAY}
          />
          <P>
            <strong className="text-ink">
              Roughly $368,000 a year from a channel that produced nothing eight
              weeks earlier.
            </strong>
          </P>

          <H3>The curve</H3>
          <Shot
            src="/subscription-case-study/growth-curve.png"
            alt="Klaviyo growth overview, Aug 3 to Sep 14: $207,152.98 total revenue, up 106.9%, with $57.6K attributed at 27.79%. Weekly stacked bars show attributed revenue growing from zero alongside unattributed revenue, with a total-recipients line rising to about 14.8K before dropping sharply in the final week."
            width={1444}
            height={748}
            caption="Attributed revenue (blue) climbs from zero in week one. The recipient line (yellow) drops on purpose."
          />
          <P>
            The recipient line drops on purpose. Volume pulled back after
            widening: a controlled ramp.
          </P>

          <H3>Four honest readings</H3>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {READINGS.map(([title, body]) => (
              <div
                key={title}
                className="rounded-2xl border border-line bg-card px-5 py-5"
              >
                <p className="text-[15px] font-medium text-ink">{title}</p>
                <p className="mt-2 text-[15px] text-body leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <H3>Still open</H3>
          <Bullets
            items={[
              <>
                <strong className="text-ink">Flows at 25% must invert.</strong>{" "}
                Campaigns are labour, flows are an asset.
              </>,
              <>
                <strong className="text-ink">SMS and push at zero.</strong> Both
                dashboards still show the setup prompts.
              </>,
              <>
                <strong className="text-ink">Cycle-two data is not in.</strong>{" "}
                The number that will actually decide this account.
              </>,
            ]}
          />

          {/* -------------------------------------------------- playbook */}

          <H2>1. The Inversion</H2>
          <P>
            In a one-time-purchase business, email&rsquo;s job is to produce the
            next order. In a subscription business, the next order is already
            scheduled.{" "}
            <strong className="text-ink">
              Email&rsquo;s job is to stop it from being cancelled.
            </strong>
          </P>
          <P>
            That inversion changes every priority. Most subscription brands run
            an email program designed for a non-subscription business (welcome,
            abandoned cart, promotional campaigns) then wonder why churn does
            not move. The flows are competent. They are aimed at the wrong
            event.
          </P>
          <P>The program should be organised around three questions:</P>
          <Numbers
            items={[
              "What is about to cause a cancellation that we can prevent?",
              "What is about to cause a failed payment that we can pre-empt?",
              "What makes cycle two feel different from cycle one?",
            ]}
          />
          <P>Everything below serves those three.</P>

          <H2>2. The Silent Third</H2>
          <P>
            Involuntary churn (failed payments, expired cards, insufficient
            funds, issuer declines) is churn you never earned. The customer did
            not decide to leave. A card expired.
          </P>
          <P>
            This is the most under-attended revenue leak in subscription
            commerce, and the reason is structural: it looks like a billing
            problem, so it sits with finance or ops, and the retention team
            never touches it.
          </P>
          <P>
            <strong className="text-ink">
              Pull this number before anything else: involuntary churn as a
              percentage of total churn.
            </strong>{" "}
            Above 20% and your dunning sequence is the cheapest revenue
            available to you this quarter. No amount of copy improvement
            elsewhere will match it.
          </P>

          <H3>Why it compounds quietly</H3>
          <P>
            A failed payment does not just cost you that cycle. It ends a
            subscription with months or years of remaining value, for a customer
            who was, by revealed preference, happy. They were still subscribed.
            They were still paying. Nothing about the relationship had broken.
          </P>
          <P>
            Every other intervention in this document argues someone out of a
            decision. Dunning is the only one where there was no decision to
            argue with.
          </P>
          <Pull label="The Silent Third.">
            In most subscription accounts, a large share of cancellations were
            never decisions. They were expired cards. You are losing customers
            who wanted to stay, and it lands in your churn number as though they
            walked.
          </Pull>

          <H2>3. Dunning is a retention flow, not a receipt</H2>
          <P>
            Most dunning sequences are a billing notification sent three times.
            Here is what a retention-grade one looks like.
          </P>

          <H3>Framing first</H3>
          <P>
            Never say &ldquo;payment failed.&rdquo; Say the card needs updating.
            The first implies the customer did something wrong, or worse, that
            they have no money. The second implies routine admin. The conversion
            gap between those two framings is larger than anything you will
            achieve rewriting the body copy.
          </P>
          <Pull>
            Two phrasings, wildly different outcomes. &ldquo;Payment
            failed&rdquo; tells a customer they did something wrong, or that
            they are broke. &ldquo;Your card needs updating&rdquo; tells them a
            date expired. Same event. Only one of them gets clicked.
          </Pull>

          <H3>The sequence</H3>
          <Table
            head={["Send", "Timing", "Job", "Note"]}
            cols="0.5fr 0.9fr 1.1fr 2fr"
            rows={DUNNING}
          />

          <H3>Rules</H3>
          <Bullets
            items={[
              <>
                <strong className="text-ink">
                  Never discount inside a dunning sequence.
                </strong>{" "}
                The customer did not ask for a lower price; they have a card
                problem. Discounting gives away margin on a subscriber who was
                not leaving, and teaches the list that letting a card expire
                produces a discount.
              </>,
              <>
                <strong className="text-ink">
                  Use a different sender profile or subdomain.
                </strong>{" "}
                Dunning is quasi-transactional and belongs in the primary inbox,
                not Promotions. Sending it from your marketing subdomain buries
                it beside your campaigns.
              </>,
              <>
                <strong className="text-ink">
                  Retry schedule matters more than copy.
                </strong>{" "}
                Coordinate email timing with your processor&rsquo;s retry logic.
                An email arriving after the final retry has fired is a
                notification, not an intervention.
              </>,
            ]}
          />

          <H2>4. The Trade Nobody Takes</H2>
          <P>The counterintuitive one, and most brands refuse it.</P>
          <P>
            Telling customers they are about to be charged will raise voluntary
            cancellations. That is true, measurable, and exactly why the notice
            does not get sent.
          </P>
          <P>
            <strong className="text-ink">Send it anyway.</strong>
          </P>
          <Table
            head={["What you lose", "What you gain"]}
            cols="1fr 1fr"
            rows={TRADE}
          />
          <P>
            A surprise charge produces a customer who disputes it, marks you as
            spam, and never returns. At scale those complaints are a
            deliverability problem: they accrue against your sending domain and
            degrade inbox placement for your entire list, including the people
            who love you.
          </P>
          <P>A cancellation produces a customer you can win back.</P>
          <Pull label="The Trade Nobody Takes.">
            You give up a handful of clean cancellations. You get back every
            chargeback, every spam complaint and every furious support ticket a
            surprise charge would have produced, plus the domain reputation
            those complaints were quietly eating.
          </Pull>

          <H3>How to send it</H3>
          <P>
            Five to seven days before the charge. Include what was delivered
            since the last one: a renewal notice is one of the few moments where
            reminding someone why they subscribed is welcome rather than
            promotional.
          </P>
          <P>
            Put skip and pause directly in the email. If someone is
            over-supplied you want them skipping, and you want them discovering
            that option from you rather than from a cancellation page.
          </P>

          <H2>5. The switch almost nobody flips</H2>
          <P>
            The most underused capability in the Klaviyo stack, available to any
            account with a connected store and enough order history. Three
            properties matter:
          </P>
          <Bullets
            items={[
              <>
                <strong className="text-ink">Churn Risk Prediction.</strong> Flags
                customers with high predicted churn probability before they
                lapse, so winback becomes proactive rather than reactive. The
                score exports as a number between 0 and 1: 0.45 means a 45%
                risk.
              </>,
              <>
                <strong className="text-ink">
                  Predicted Customer Lifetime Value.
                </strong>{" "}
                Projects future value from behaviour, so you can treat
                high-predicted-CLV customers with VIP intensity before they have
                hit a spending threshold.
              </>,
              <>
                <strong className="text-ink">Expected Date of Next Order.</strong>{" "}
                The trigger almost nobody uses. A date-based flow firing just
                before the predicted reorder date reaches the customer while the
                decision is live.
              </>,
            ]}
          />

          <H3>Availability</H3>
          <P>
            Segmenting on CLV requires at least 500 customers to have placed an
            order: not 500 active profiles, 500 people who actually bought. The
            predictive suite generally needs a connected store and roughly 500+
            orders of history.
          </P>

          <H3>The flows to build on it</H3>
          <Bullets
            items={[
              <>
                <strong className="text-ink">Proactive save.</strong> Triggers
                when a high-value customer crosses a churn-risk threshold, before
                they have missed anything. The message is not a discount: it is a
                check-in, a usage tip, or a frequency adjustment.
              </>,
              <>
                <strong className="text-ink">Segment migration alert.</strong>{" "}
                Fires when a customer moves from a healthy RFM segment into an
                at-risk one. The transition is the signal, not the absolute
                state.
              </>,
              <>
                <strong className="text-ink">Pre-emptive reorder.</strong>{" "}
                Date-triggered on Expected Date of Next Order, minus a few days.
              </>,
            ]}
          />
          <P>
            One caution: a large base of one-time purchasers drags average churn
            risk upward. That is a signal about your post-first-purchase
            retention, not about the model.
          </P>

          <H2>6. The Cycle-Two Cliff</H2>
          <P>
            Days-since-signup is a weak variable. Cycle position is the strong
            one.
          </P>
          <Table
            head={["Cycle", "What is happening", "What email must do"]}
            cols="0.7fr 1.4fr 1.6fr"
            rows={CYCLES}
          />

          <H3>The cycle-two problem</H3>
          <P>
            Churn clusters hard at cycle two, and the cause is almost always the
            same: the second delivery felt identical to the first. Novelty is
            gone, habit has not formed, and nothing in the experience changed.
          </P>
          <P>
            Whatever your product, something about cycle two should be
            different. A new variant. A different piece of education. An unlock.
            A milestone acknowledgement. The mechanism matters less than the
            customer registering a change.
          </P>
          <Pull label="The Cycle-Two Cliff.">
            Cycle one is curiosity. Cycle three is habit. Cycle two is the gap
            between them, and it is where subscription businesses quietly bleed
            out, because the second delivery felt exactly like the first.
          </Pull>
          <P>
            Most brands spend their creative energy on the welcome sequence,
            where the customer is already maximally engaged, and send nothing
            distinctive at the one moment where the relationship is actually
            decided.
          </P>

          <H2>7. Kill every email that isn&rsquo;t first value</H2>
          <P>
            A new subscriber does not need to understand your brand. They need
            to experience the thing they subscribed for, quickly.
          </P>
          <P>
            Cut every email in the first two weeks that does not move them
            toward first use. Brand story, founder letter, category education,
            sustainability commitments: all of it waits until cycle two.
          </P>
          <P>
            Not because that content is bad, but because it competes for
            attention with the only job that matters in week one. In
            subscription, a customer who has not experienced value before the
            second charge is a customer who cancels at the second charge.
          </P>

          <H3>The test</H3>
          <P>
            Write down the single moment where your customer first gets what
            they paid for. Count how many emails you send before that moment,
            and how many of them help them reach it. For most brands the ratio
            is bad.
          </P>

          <H2>8. The Ladder: five rungs before &ldquo;cancel&rdquo;</H2>
          <P>
            Most brands put all their retention effort into the cancellation
            page and none into the sequence around it. In strict order:
          </P>
          <Numbers
            items={[
              <>
                <strong className="text-ink">Pause.</strong> Always first. Costs
                nothing, retains the relationship, and a substantial share of
                pauses resume on their own.
              </>,
              <>
                <strong className="text-ink">Skip.</strong> For consumables where
                the customer is over-supplied. Frequently the real problem,
                misdiagnosed as dissatisfaction.
              </>,
              <>
                <strong className="text-ink">Change frequency.</strong> Frequency
                mismatch is among the most common true causes of cancellation
                and the easiest to fix.
              </>,
              <>
                <strong className="text-ink">Change the product.</strong>{" "}
                Different variant, size, or tier.
              </>,
              <>
                <strong className="text-ink">Cancel cleanly</strong>, into a
                winback flow that does not start for 30 days.
              </>,
            ]}
          />

          <H3>The exit survey is a retention asset</H3>
          <P>
            One question on the cancellation flow, structured options, feeding a
            Klaviyo profile property. Within a quarter you will know which rungs
            actually matter for your brand and can weight the ladder
            accordingly.
          </P>
          <P>Most brands either do not ask, or ask in free text nobody reads.</P>

          <H2>9. The Anchor Tax</H2>
          <P>
            A save-offer discount converts well and costs far more than it
            appears to.
          </P>
          <P>
            You have permanently reset that customer&rsquo;s price anchor. They
            now know the real price is lower. Every future renewal is judged
            against the discounted one, and the moment you return them to full
            price you get the cancellation you postponed.
          </P>
          <P>
            You have also taught them that threatening to cancel produces a
            discount. Customers share this.
          </P>
          <Pull label="The Anchor Tax.">
            A save-discount does not cost you one month&rsquo;s margin. It costs
            you the gap between your real price and your discounted price on
            every renewal that customer ever makes again, because you just told
            them what the product is actually worth.
          </Pull>
          <P>
            Pause and skip cost nothing and leave the anchor intact. If you must
            use an incentive, make it non-monetary: an upgrade for one cycle, an
            add-on, early access. Perceived value, no price implication.
          </P>

          <H2>10. The questions behaviour cannot answer</H2>
          <P>
            Behavioural data tells you what someone did. It cannot tell you why,
            and in subscription the why is the retention lever.
          </P>
          <P>
            Some segments are structurally impossible to build from behavioural
            signals alone. You cannot infer skin type from browsing behaviour.
            You cannot reliably infer primary concern from purchase history. No
            observational signal tells you whether someone is buying as a gift.
            These have to be asked.
          </P>

          <H3>How it works mechanically</H3>
          <P>
            Quiz answers become Klaviyo profile properties you can segment,
            personalise and automate on from the same place you run every other
            channel: profile property writes for the answers, event emission
            for the quiz moments.
          </P>
          <P>
            A well-built recommendation quiz asks three to seven diagnostic
            questions, each mapping to a specific custom property. Five
            questions, five properties, five segments you could not build
            yesterday.
          </P>

          <H3>What to ask a subscriber</H3>
          <P>
            For subscription, the highest-value questions predict the
            cancellation reason:
          </P>
          <Bullets
            items={[
              <>
                <strong className="text-ink">
                  What outcome are you hoping for?
                </strong>{" "}
                Sets the expectation you will measure against at cycle two.
              </>,
              <>
                <strong className="text-ink">
                  How often do you expect to use this?
                </strong>{" "}
                Predicts frequency mismatch before it causes a cancel.
              </>,
              <>
                <strong className="text-ink">What have you tried before?</strong>{" "}
                Tells you which comparison you are being judged against.
              </>,
            ]}
          />
          <P>
            Each answer becomes a branch in onboarding and a variable in the
            save flow.
          </P>

          <H3>The honest read on quiz case studies</H3>
          <P>
            Vendor numbers here are enthusiastic. Octane AI&rsquo;s case study on
            skincare brand Geologie reports roughly a 50% lift in
            quiz-completion-to-purchase conversion, cited as a move from about 9%
            to 13%. Klaviyo&rsquo;s own write-ups cite a health-food brand
            reporting a triple-digit increase in flow revenue after pairing a
            quiz with segmented flows.
          </P>
          <P>
            Each is vendor-stated, single-brand, no control group. Treat them as
            illustrations of mechanism, not forecasts. The cross-category pattern
            (beauty, skincare, supplements, apparel) is more useful than any
            single percentage.
          </P>

          <H2>11. Monthly churn is a lie your dashboard tells</H2>
          <P>
            Monthly churn is an average, and averages hide the thing you need to
            see.
          </P>

          <H3>Read the cohort curve instead</H3>
          <P>
            Plot retention by signup cohort against cycle number. A program that
            works flattens after cycle two. A program buying growth shows a
            stable monthly churn figure while each successive cohort retains
            worse than the last, and that divergence is invisible in the blended
            number until it is severe.
          </P>

          <H3>The two secondary metrics</H3>
          <Bullets
            items={[
              <>
                <strong className="text-ink">
                  Involuntary churn as a share of total.
                </strong>{" "}
                Above 20% means dunning is your cheapest win.
              </>,
              <>
                <strong className="text-ink">Cycle-two survival rate.</strong>{" "}
                The single number most predictive of long-run subscription
                economics.
              </>,
            ]}
          />

          <H2>12. The number that makes your reporting honest</H2>
          <P>
            The part almost no agency will show you, because it makes the
            attributed-revenue number smaller.
          </P>

          <H3>Why attributed revenue overstates</H3>
          <P>
            Last-click credits email for purchases that would have happened
            anyway. Someone already intending to buy clicks the email because it
            was there; the email takes the credit but changed nothing.
          </P>
          <P>
            Flow revenue is mostly incremental: an abandoned checkout email
            genuinely recovers orders that would otherwise be lost.{" "}
            <strong className="text-ink">
              Campaign revenue is only partially incremental, and a realistic
              figure is 40–60% of what gets reported.
            </strong>
          </P>

          <H3>How to run one</H3>
          <P>
            Suppress 10% of your list from campaigns for two weeks and measure
            the revenue difference. That gap is your true incremental impact. Run
            it quarterly.
          </P>
          <P>
            A 10–20% holdout is usually enough; larger gives more statistical
            power at the cost of more forgone revenue. Run user-level tests for a
            minimum of two weeks: shorter tests produce noisy results. Watch the
            confidence interval: a positive result whose interval spans zero is
            not significant, it means you need a longer test or a bigger
            holdout.
          </P>

          <H3>Why it is worth the discomfort</H3>
          <P>
            Once you apply incrementality adjustments, email and SMS economics
            still beat paid channels by something like 5–10x rather than 15–25x.
            Still an overwhelming advantage.
          </P>
          <P>
            You lose a flattering number and gain one you can make decisions
            with. For a subscription brand deciding between dunning, campaigns,
            and acquisition, that distinction is the whole game.
          </P>

          <H2>13. The first 90 days</H2>
          <Bullets
            items={[
              <>
                <strong className="text-ink">Days 1–14.</strong> Pull involuntary
                churn as a share of total. Pull the cohort retention curve.
                Rebuild dunning. Check SPF, DKIM and DMARC on a dedicated sending
                subdomain.
              </>,
              <>
                <strong className="text-ink">Days 15–30.</strong> Ship the
                pre-renewal notice. Build the cancel ladder with pause and skip
                surfaced before any offer. Add the one-question exit survey.
              </>,
              <>
                <strong className="text-ink">Days 31–60.</strong> Switch on
                predictive properties. Build the proactive save flow on churn
                risk and the pre-emptive reorder flow on Expected Date of Next
                Order. Rebuild onboarding around time-to-first-value.
              </>,
              <>
                <strong className="text-ink">Days 61–90.</strong> Ship cycle-two
                differentiation. Stand up zero-party capture. Run the first
                holdout test.
              </>,
            ]}
          />

          <div className="mt-16 pt-10 border-t border-line">
            <h2 className="text-[24px] md:text-[30px] leading-[1.18] tracking-[-0.02em] font-medium">
              Start with the cheapest number
            </h2>
            <P>
              Before rebuilding anything, pull one figure: involuntary churn as a
              percentage of total churn.
            </P>
            <P>
              If it is above 20%, your dunning sequence is worth more this
              quarter than every other play in this document combined, and it is
              a week of work, not a quarter.
            </P>
            <Link
              href="/#book"
              className="mt-8 h-12 px-7 inline-flex items-center justify-center rounded-full bg-navy text-onnavy font-medium text-[15px] hover:bg-navydeep transition-colors"
            >
              Book a 15-minute account review →
            </Link>
            <P>
              Bring your billing data and your Klaviyo. We will split voluntary
              from involuntary churn, read your cohort curve for the cycle-two
              drop, and tell you which of the two is actually costing you more.
              If dunning is already tight, we will say so and move to the cancel
              ladder.
            </P>
          </div>
        </EmailGate>
      </article>
    </div>
  );
}
