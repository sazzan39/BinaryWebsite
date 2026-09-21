import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { EmailGate } from "@/components/site/EmailGate";

export const metadata: Metadata = {
  title: "The No-Discount Growth Playbook | BinaryGen",
  description:
    "How to scale email revenue without training your list to wait for a code. The full twelve-section playbook, from killing the welcome discount to running the holdout that settles the argument.",
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

/* ------------------------------------------------------------- page data */

const SWAPS: [string, string][] = [
  ["10–20% off", "Free shipping above a threshold set just over current AOV"],
  ["First-order discount", "A genuinely useful guide, protocol, sizing tool, or diagnostic"],
  ["Site-wide sale", "Early access to a limited release"],
  ["Coupon code", "A sample or trial size with the first order"],
  ["Discount for signup", "Entry to a member tier with non-price benefits"],
];

/* ------------------------------------------------------------------ page */

export default function NoDiscountGrowthPlaybook() {
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
          The No-Discount Growth Playbook
        </h1>
        <p className="mt-6 text-[18px] md:text-[20px] text-body leading-[1.6]">
          How to scale email revenue without training your list to wait for a
          code.
        </p>

        <EmailGate>
          <H2>First, who&rsquo;s writing this</H2>
          <P>
            I&rsquo;m Sajan Dhakal. I started BinaryGen about four years ago, and
            it began the way most useful things do, with a problem I kept
            watching people around me run into.
          </P>
          <P>
            Friends and people in my circle were building real DTC brands. Good
            products, decent traffic, money going out the door on ads every
            single month. Nearly all of them had the same blind spot: the
            customers they had already paid to acquire were quietly walking away,
            and nobody was doing anything about it. Email sat in the corner of
            the stack, technically switched on, firing a welcome discount and
            then nothing.
          </P>
          <P>
            And that welcome discount is where this particular playbook starts,
            because for most of those brands, the discount <em>was</em> the
            strategy. It was the only lever anyone knew how to pull.
          </P>
          <P>
            One of those accounts was doing around $24,000 a month. Email
            contributed $1,314 of it. The dashboard read{" "}
            <strong className="text-ink">campaigns: $0.00</strong>. Not a low
            number. A zero.
          </P>
          <P>
            Seven months later the same store did $410,377 in a month, with
            $104,359 of it from email.
          </P>

          <figure className="mt-10">
            {/* Klaviyo screenshot: light UI, so it keeps its own white plate in
                both themes rather than glaring out of the dark one. */}
            <div className="rounded-2xl border border-line overflow-hidden bg-white p-2 sm:p-3">
              <Image
                src="/Picture1.jpg"
                alt="Klaviyo business performance summary, before and after. Before, Jul 27 to Aug 30 2024: $24,566.11 total revenue and $1,314.83 attributed revenue at 5.35% of total, with campaigns at $0.00 and flows at $1,314.83. After, Nov 2 to Dec 2 2024: $153,615.28 total revenue and $55,274.01 attributed revenue at 35.98% of total, with $10,162.68 from campaigns and $45,111.33 from flows."
                width={1296}
                height={1353}
                sizes="(max-width: 768px) 100vw, 672px"
                className="w-full h-auto rounded-xl"
              />
            </div>
            <figcaption className="mt-3 text-[13px] text-faint2 leading-relaxed">
              The same account in Klaviyo, before and after: attributed revenue
              from 5.35% of total to 35.98%, with campaigns off a standing zero.
            </figcaption>
          </figure>
          <P>
            That is the whole reason BinaryGen exists. We&rsquo;ve since done
            this work across supplement, wellness and skincare brands in the US
            and Canada: rebuilding flow architecture, repairing sender
            reputation on lists up to 272,000 recipients, and dragging email from
            single digits up to the 30–40% of total revenue it should be
            producing.
          </P>

          <H3>Why nothing here is held back</H3>
          <P>Because the diagnosis was never the hard part. The execution is.</P>
          <P>
            Everything below is what we actually do, in the order we actually do
            it. No withheld step, no &ldquo;book a call to find out the
            rest.&rdquo; If you read this and fix your own program, that is a
            genuinely good outcome and I&rsquo;d rather you had it.
          </P>
          <P>
            And if you get three sections in and realise you don&rsquo;t have the
            hours to run any of it, you know where to find me.
          </P>
          <P>Let&rsquo;s get into it.</P>

          <H2>1. A discount is a loan against future margin</H2>
          <P>Every discount does two things.</P>
          <P>
            It produces revenue today, which you see immediately and measure
            obsessively. And it lowers the price the customer believes your
            product is worth, which you see nine months later in average order
            value and full-price conversion, by which point nobody connects the
            two.
          </P>
          <P>
            That asymmetry in measurement is the whole problem. The benefit is
            instant and attributed. The cost is delayed and unattributed. Any
            system measured that way will over-produce discounts.
          </P>
          <Pull>
            The benefit of a discount is instant and attributed. The cost is
            delayed and unattributed. Any system measured that way will
            over-produce discounts forever, not because anyone decided to, but
            because nobody is holding the other end of the ledger.
          </Pull>

          <H2>2. The Lesson: what your list has already learned</H2>
          <P>
            A brand offering 20% off to new subscribers, then running monthly
            promotions, has taught its list one rule:{" "}
            <strong className="text-ink">
              never buy at full price, something better is coming.
            </strong>
          </P>
          <P>
            The list learns this quickly and permanently. Full-price conversion
            falls, which makes revenue look soft, which prompts another
            promotion, which reinforces the lesson. By the time anyone notices,
            the brand has a list that only responds to discounts and a margin
            structure built around a price nobody pays.
          </P>

          <H3>The mechanism nobody models</H3>
          <P>
            The damage is not the margin on the discounted order. It is the
            margin on every subsequent order that would have been full price and
            now is not, from a customer who has learned to wait.
          </P>
          <P>
            One discounted order costs you the discount. A discounting habit
            costs you the difference between your list price and your effective
            price, forever, across your entire list.
          </P>
          <Pull label="The Lesson.">
            One discounted order costs you the discount. A discounting habit
            costs you the gap between your list price and your effective price,
            across your entire list, permanently. You are not running a
            promotion. You are renegotiating your prices in public.
          </Pull>

          <H2>3. You may be paying people who were already buying</H2>
          <P>This is the part that reframes everything else in this document.</P>
          <P>
            Last-click attribution credits a promotional email for purchases that
            would have happened anyway. Someone already intending to buy sees 20%
            off, uses it, and the campaign takes credit for revenue it did not
            create, while handing away margin on an order you had already won.
          </P>
          <Pull>
            Here is the uncomfortable version: a discount disproportionately
            attracts the people who were already going to buy. You are not
            converting the undecided. You are handing margin to the decided, then
            crediting the campaign for revenue you already had.
          </Pull>

          <H3>What the evidence suggests</H3>
          <P>
            Flow revenue is mostly incremental. An abandoned checkout email
            genuinely recovers orders that would otherwise be lost; a welcome
            series converts subscribers who needed nurturing. These are
            high-confidence attributions.
          </P>
          <P>
            <strong className="text-ink">
              Campaign revenue is only partially incremental: a realistic figure
              is 40–60% of what gets reported.
            </strong>{" "}
            And promotional campaigns sit at the weak end of that range, because
            discounts disproportionately attract people who were already going to
            buy.
          </P>

          <H3>Run the test before you argue about it</H3>
          <P>
            Suppress 10% of your list from campaigns for two weeks. Measure the
            revenue difference. That gap is your true incremental impact, and for
            a heavily discounting brand it is frequently a shock.
          </P>
          <P>
            A 10–20% holdout is usually sufficient. Run for at least two weeks;
            shorter tests are noisy. If the confidence interval spans zero, you
            need a longer test, not a conclusion.
          </P>

          <H3>Then do the margin arithmetic</H3>
          <P>
            Incremental revenue is not profit. At a 40% contribution margin,
            €20,000 of incremental revenue is €8,000 of contribution before you
            subtract the cost of running the promotion, which means break-even
            incremental ROAS is 1 ÷ 0.40 = 2.5×, not 1×.
          </P>
          <P>
            Agree the relevant margin with whoever owns finance before you set a
            target: returns, discounts, fulfilment, and the customer-value
            horizon all belong in that number. A campaign can generate additional
            revenue and still lose money.
          </P>

          <H2>4. The Leak: your code is on a coupon site right now</H2>
          <P>
            A discount code intended for one segment does not stay in that
            segment.
          </P>
          <P>
            Codes leak onto public coupon sites, browser extensions, and deal
            forums. When that happens, revenue still gets attributed correctly to
            the channel (the code came from your email, so email gets
            credit), while margin quietly erodes on orders that would have been
            full price.
          </P>
          <P>
            This is a failure mode neither last-click nor incrementality testing
            catches cleanly, because the attribution is technically correct. The
            order came through the campaign. It just cost you more than the
            dashboard shows.
          </P>
          <Pull label="The Leak.">
            This one is invisible to every measurement tool you own, because the
            attribution is correct. The order came through your campaign. It just
            cost you 20% more than it should have, on a customer who found the
            code on a deal forum and was never on your list.
          </Pull>

          <H3>The controls</H3>
          <Bullets
            items={[
              <>
                <strong className="text-ink">Unique single-use codes</strong>, not
                a shared one. More work, eliminates the leak entirely.
              </>,
              <>
                <strong className="text-ink">
                  Automatic discounts tied to a segment
                </strong>{" "}
                rather than a typed code, where your platform supports it.
              </>,
              <>
                <strong className="text-ink">Short expiry windows.</strong> A code
                that dies in 72 hours has less time to propagate.
              </>,
              <>
                <strong className="text-ink">
                  Search your own codes monthly.
                </strong>{" "}
                If your welcome code is on a coupon aggregator, your welcome offer
                is now a public site-wide sale.
              </>,
            ]}
          />

          <H2>5. Kill the welcome discount, keep the conversion</H2>
          <P>
            The welcome popup is where most brands start the habit. It does not
            have to be a discount.
          </P>

          <div className="mt-8 overflow-hidden rounded-2xl border border-line">
            <div className="grid grid-cols-[1fr_1.4fr] bg-cream/40 border-b border-line">
              <div className="px-5 py-3 font-mono text-[11px] tracking-[0.16em] uppercase text-subtle">
                Instead of
              </div>
              <div className="px-5 py-3 font-mono text-[11px] tracking-[0.16em] uppercase text-subtle border-l border-line">
                Offer
              </div>
            </div>
            {SWAPS.map(([from, to], i) => (
              <div
                key={from}
                className={`grid grid-cols-[1fr_1.4fr] ${
                  i > 0 ? "border-t border-line" : ""
                }`}
              >
                <div className="px-5 py-4 text-[15px] text-body2 leading-relaxed">
                  {from}
                </div>
                <div className="px-5 py-4 text-[15px] text-ink2 leading-relaxed border-l border-line">
                  {to}
                </div>
              </div>
            ))}
          </div>

          <P>
            The common property: each has real perceived value, and none tells the
            customer your list price is fiction.
          </P>
          <P>
            <strong className="text-ink">
              Free shipping above a threshold is the strongest starting swap for
              most brands.
            </strong>{" "}
            It reads as a saving, costs less than a percentage discount, and
            actively raises order value instead of lowering it.
          </P>

          <H3>The quiz as a welcome offer</H3>
          <P>
            The most underrated replacement: make the value exchange{" "}
            <em>diagnostic</em> rather than monetary. A three-to-seven question
            recommendation quiz gives the customer a genuinely personalised
            answer, which is worth more to them than 15% off, and gives you
            something worth far more than a list signup.
          </P>
          <P>
            Each answer writes to a Klaviyo profile property you can segment,
            personalise and automate against. Five questions, five properties,
            five segments you could not build from behavioural data at all.
          </P>
          <P>
            Vendor numbers here are uncontrolled and enthusiastic: Octane AI
            reports skincare brand Geologie moving quiz-completion-to-purchase
            from roughly 9% to 13%; Klaviyo cites a health-food brand reporting a
            triple-digit lift in flow revenue after pairing a quiz with segmented
            flows. Each is single-brand and vendor-stated. Read them as evidence
            the mechanism works in high-fit categories, not as a forecast.
          </P>
          <P>
            But the strategic point stands independently of the numbers:{" "}
            <strong className="text-ink">
              a quiz replaces a price-based value exchange with an
              information-based one
            </strong>
            , and the information compounds while the discount does not.
          </P>

          <H2>6. Sell the mechanism, not the markdown</H2>
          <P>
            If you will not compete on price, you have to compete on
            understanding. Harder, and it compounds. That is the trade.
          </P>
          <P>
            The pattern that works: a welcome and post-purchase sequence
            explaining{" "}
            <strong className="text-ink">why the product works</strong>, not what
            it costs. Ingredient sourcing. Manufacturing decisions. The specific
            problem it solves. What actually differs from the cheaper option the
            customer is weighing.
          </P>
          <P>
            A customer who understands the mechanism has a reason to pay more. A
            customer who only knows the price has only the price.
          </P>

          <H3>Why this beats a discount on the same send</H3>
          <P>
            A discount converts the people already close to buying. Education
            moves people who were not close yet, which is a larger population and
            a more durable effect: the understanding persists after the campaign
            ends, and the discount does not.
          </P>

          <H2>7. Five kinds of urgency that never touch price</H2>
          <P>
            Discounts get reached for because they manufacture urgency. Urgency is
            available without them:
          </P>
          <Bullets
            items={[
              <>
                <strong className="text-ink">Inventory.</strong> Limited stock,
                genuinely stated. Never fabricate this; customers check, and
                getting caught is more expensive than any promotion.
              </>,
              <>
                <strong className="text-ink">Time-bound access.</strong> A drop
                window, a seasonal item, a production run that ends.
              </>,
              <>
                <strong className="text-ink">Cohort.</strong> A program,
                challenge, or batch that starts on a date. Powerful because the
                urgency is structural rather than manufactured.
              </>,
              <>
                <strong className="text-ink">Restock.</strong> Back-in-stock
                notifications carry natural urgency and convert extremely well,
                because the customer generated the intent themselves.
              </>,
              <>
                <strong className="text-ink">Consumption.</strong> For
                consumables, &ldquo;you are about to run out&rdquo; is urgency the
                customer already feels. You are not creating pressure, you are
                being useful at the right moment.
              </>,
            ]}
          />
          <P>Each creates a reason to act now that never touches price.</P>

          <H2>8. Move the basket up instead of the price down</H2>
          <P>Same revenue effect, opposite margin effect.</P>
          <Bullets
            items={[
              <>
                <strong className="text-ink">Bundles at a modest saving.</strong>{" "}
                A three-pack at a small discount raises AOV and reads as value,
                without discounting the single unit, which protects the anchor on
                the SKU you want people paying full price for.
              </>,
              <>
                <strong className="text-ink">Free shipping thresholds</strong> set
                just above current AOV, revisited quarterly as AOV moves.
              </>,
              <>
                <strong className="text-ink">Gift with purchase</strong> above a
                threshold. Costs you wholesale, reads as retail value. One of the
                best margin-to-perception ratios available.
              </>,
              <>
                <strong className="text-ink">Tiered rewards.</strong> Spend more,
                unlock something non-monetary: early access, a community, a
                service.
              </>,
            ]}
          />

          <H2>9. Discounting is what you do when you don&rsquo;t know them</H2>
          <P>
            The reason most brands discount is that they have nothing else to say.
            A generic email to a generic segment has no lever except price.
          </P>
          <P>
            This is where the data work pays for itself. With declared preferences
            and predictive properties in place, you can send a message that is
            relevant enough to convert without an offer attached:
          </P>
          <Bullets
            items={[
              <>
                <strong className="text-ink">Predicted next purchase date:</strong>{" "}
                reach someone while the decision is live, which needs no
                discount
              </>,
              <>
                <strong className="text-ink">Declared concern or goal</strong> from
                a quiz: speak to the specific problem rather than the category
              </>,
              <>
                <strong className="text-ink">
                  Churn risk crossing a threshold
                :
                </strong>{" "}
                intervene with a check-in rather than a code
              </>,
              <>
                <strong className="text-ink">RFM segment migration:</strong> catch
                a lapsing customer weeks before the discount-or-lose-them moment
              </>,
            ]}
          />
          <P>
            A discount is what you use when you do not know enough about someone
            to be relevant. Fix the knowledge problem and the discount becomes
            optional.
          </P>
          <Pull>
            A discount is what you reach for when you have nothing specific to
            say. Know someone&rsquo;s goal, their concern, or their reorder date,
            and you have a message that converts on relevance. Know nothing, and
            price is the only lever left.
          </Pull>

          <H2>10. Six rules for when you have to discount anyway</H2>
          <P>Some moments require it. Black Friday exists.</P>
          <Numbers
            items={[
              <>
                <strong className="text-ink">
                  Never discount your warm segment.
                </strong>{" "}
                They were converting anyway, so the discount is pure margin loss
                on revenue you already had. Your best offer goes to the coldest
                tier that still has a pulse: people who need a reason to return,
                not people who need a nudge.
              </>,
              <>
                <strong className="text-ink">
                  Time-box hard and keep the promise.
                </strong>{" "}
                A sale that quietly extends teaches the list that your deadlines
                are fake, and it undermines every future time-bound send.
              </>,
              <>
                <strong className="text-ink">
                  Discount a bundle, not the hero SKU.
                </strong>{" "}
                Protects the anchor price on the product that matters.
              </>,
              <>
                <strong className="text-ink">
                  Cap at twice a month, absolute maximum.
                </strong>{" "}
                Past that the lesson sticks.
              </>,
              <>
                <strong className="text-ink">
                  Never discount to save a cancellation or a failed payment.
                </strong>{" "}
                Those customers were not leaving over price, and discounting
                resets their anchor permanently.
              </>,
              <>
                <strong className="text-ink">Use unique codes.</strong> See section
                4: a shared code is a public sale with extra steps.
              </>,
            ]}
          />

          <H2>11. Three numbers that catch the damage early</H2>
          <P>Blended conversion rate hides all of this. Three numbers instead:</P>
          <P>
            <strong className="text-ink">Full-price conversion rate.</strong>{" "}
            Orders placed with no code applied, as a share of total. If this falls
            while revenue holds, you are training your list and the bill arrives
            later.
          </P>
          <P>
            <strong className="text-ink">
              Average order value on non-promotional sends.
            </strong>{" "}
            The earliest visible symptom of anchor damage. It moves months before
            revenue does, which makes it the leading indicator worth watching
            weekly.
          </P>
          <P>
            <strong className="text-ink">
              Incremental contribution margin per campaign.
            </strong>{" "}
            Not revenue. Revenue minus discount, minus COGS, minus fulfilment,
            adjusted for the incrementality factor from your holdout. This is the
            only number that tells you whether a promotion made money.
          </P>

          <H3>The quarterly review</H3>
          <P>
            Plot full-price conversion rate and promotional frequency on the same
            chart, over eighteen months. If one rises as the other falls, you have
            your answer and it does not require further debate.
          </P>

          <H2>12. What this actually costs you</H2>
          <P>
            A no-discount program grows more slowly at first. There is no version
            of this where you remove discounts and revenue rises the following
            month. Anyone who tells you otherwise is selling something.
          </P>
          <P>What you get instead:</P>
          <Bullets
            items={[
              "Margin that survives scale",
              "A list that responds to product rather than price",
              "The ability to run a promotion that actually works when you genuinely need one, because it will be the first in six months rather than the fourth this quarter",
              "An acquisition funnel that is not structurally dependent on your cheapest customers",
            ]}
          />

          <H3>The transition</H3>
          <P>Do not stop cold. Sequence it:</P>
          <Bullets
            items={[
              <>
                <strong className="text-ink">Month 1.</strong> Swap the welcome
                discount for a threshold or diagnostic offer. Leave existing
                campaign cadence alone. Start measuring full-price conversion
                rate.
              </>,
              <>
                <strong className="text-ink">Month 2–3.</strong> Run a holdout on
                promotional campaigns specifically. Get the real incrementality
                number before you argue with anyone about frequency.
              </>,
              <>
                <strong className="text-ink">Month 4–6.</strong> Cut promotional
                frequency using the holdout data as the argument. Replace the
                removed sends with education and mechanism content, not silence.
              </>,
              <>
                <strong className="text-ink">Month 6+.</strong> Build the
                personalisation infrastructure (zero-party capture, predictive
                triggers) that makes relevance a permanent substitute for
                price.
              </>,
            ]}
          />

          <H2>The one-line version</H2>
          <p className="mt-5 text-[18px] md:text-[20px] text-ink leading-[1.6] font-medium tracking-[-0.01em]">
            You are not choosing between discounting and not discounting. You are
            choosing between paying for revenue now and owning it later, and most
            brands make that choice without ever seeing the second number.
          </p>

          <div className="mt-16 pt-10 border-t border-line">
            <h2 className="text-[24px] md:text-[30px] leading-[1.18] tracking-[-0.02em] font-medium">
              Run the holdout before you argue about it
            </h2>
            <P>
              The fastest way to settle whether your discounting is working is not
              a debate. It is a two-week test on 10% of your list.
            </P>
            <P>
              Most brands discover their promotional campaigns are far less
              incremental than the dashboard claims, and once that number exists,
              every other decision in this playbook makes itself.
            </P>
            <Link
              href="/#book"
              className="mt-8 h-12 px-7 inline-flex items-center justify-center rounded-full bg-navy text-onnavy font-medium text-[15px] hover:bg-navydeep transition-colors"
            >
              Book a 15-minute account review →
            </Link>
            <P>
              Bring your Klaviyo. We will set up the holdout, agree the
              contribution margin to measure against, and pull your full-price
              conversion rate over the last eighteen months. If your anchor is
              intact, that is what you will hear.
            </P>
          </div>
        </EmailGate>
      </article>
    </div>
  );
}
