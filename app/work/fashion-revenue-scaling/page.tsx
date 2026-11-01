import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CalendlyInline } from "@/components/site/CalendlyInline";

export const metadata: Metadata = {
  title:
    "Case Study: How We Added $230K in Klaviyo Revenue-Without New Traffic or Extra Discounts | BinaryGen",
  description:
    "Here's how we turned a stuck fashion brand into a backend growth machine—and added over $230K in email revenue in 30 days without new traffic or extra discounts.",
};

export default function CaseStudyPage() {
  return (
    <div className="min-h-screen bg-bg text-ink selection:bg-navy selection:text-onnavy">
      {/* Top bar */}
      <header className="max-w-[840px] mx-auto px-6 h-20 flex items-center justify-between border-b border-linesoft">
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
          ← Back to home
        </Link>
      </header>

      {/* Main Document Content */}
      <article className="max-w-[840px] mx-auto px-6 py-12 md:py-16 text-[17px] md:text-[18px] leading-[1.7] text-ink2">
        {/* Title */}
        <h1 className="text-[30px] sm:text-[40px] md:text-[46px] font-bold leading-[1.12] tracking-[-0.025em] text-ink">
          Case Study: How We Added $230K in Klaviyo Revenue-Without New Traffic or Extra Discounts
        </h1>

        {/* Image right below title as in docx */}
        <div className="mt-8">
          <div className="rounded-2xl border border-line bg-white p-2 sm:p-4 max-w-[560px] shadow-[0_1px_2px_rgba(0,0,0,0.04),0_20px_50px_-24px_rgba(0,0,0,0.18)]">
            <Image
              src="/case-studies/klaviyo-230k.png"
              alt="Conversion Summary: $230,289.34 Klaviyo attributed conversions"
              width={896}
              height={764}
              priority
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>

        {/* Divider as in docx */}
        <div className="my-10 border-t border-line" />

        {/* Section: The Problem Most Agencies Ignore */}
        <section className="space-y-4">
          <h2 className="text-[24px] md:text-[28px] font-semibold text-ink tracking-[-0.015em]">
            The Problem Most Agencies Ignore
          </h2>

          <p>
            Everyone’s obsessed with TOF (Top-of-funnel) : More ads, More influencers, More content.
          </p>

          <p>
            But this fashion brand wasn’t struggling with reach….. they were leaking revenue <em className="italic">post-click</em>.
          </p>

          <ul className="space-y-1.5 pl-6 list-disc text-ink">
            <li>No proper Flow.</li>
            <li>Unsegmented campaigns</li>
            <li>No Lifecycle thinking</li>
          </ul>

          <p className="pt-2">
            <strong className="font-semibold text-ink italic">We didn’t fix this with hype. We fixed it with a system.</strong>
          </p>

          <p>
            Here’s how we turned a stuck brand into a backend growth machine — and added over $230K in email revenue in 30 days.
          </p>
        </section>

        {/* Section 1 */}
        <section className="mt-12 pt-8 border-t border-linesoft space-y-4">
          <h2 className="text-[22px] md:text-[26px] font-bold text-ink tracking-[-0.015em]">
            1. Segmentation That Converts - Not Just &ldquo;Openers&rdquo;
          </h2>

          <p>
            Most agencies segment by openers or by “engaged last 90 days.” We went 10 layers deeper.
          </p>

          <p>We built dynamic audiences based on:</p>

          <ul className="space-y-1.5 pl-6 list-disc">
            <li>High AOV lapsed buyers</li>
            <li>UGC clickers who hadn’t converted</li>
            <li>Category-specific engagers</li>
            <li>Customers who clicked 2+ emails but never checked out</li>
          </ul>

          <p>Each got their own messaging, timing, and flow triggers.</p>

          <div className="rounded-xl border border-line bg-card p-5 my-4 space-y-2">
            <p className="font-bold text-ink">Impact:</p>
            <ul className="space-y-1.5 pl-6 list-disc text-body">
              <li>Revenue per campaign went up 29%</li>
              <li>Spam complaints dropped 41%</li>
              <li>Inbox Placement improved across (Gmail + Yahoo)</li>
            </ul>
          </div>

          <p className="font-medium text-navy italic">
            Smart brands segment by behavior - Scalable brands segment by intent.
          </p>

          <div className="space-y-2.5 pt-2">
            <p><strong>1. High AOV lapsed buyers:</strong> received winback flows with high-value bundles</p>
            <p><strong>2. UGC engagers who hadn’t purchased:</strong> entered a narrative-driven flow with product storytelling and social proof</p>
            <p><strong>3. Category-specific clickers:</strong> funneled into product-focused campaigns tied to their exact interest (e.g., outerwear vs. accessories)</p>
            <p><strong>4. Multi-click non-buyers:</strong> retargeted through plain-text emails that broke down product use cases, not just benefits</p>
            <p><strong>5. Repeat buyers:</strong> segmented into loyalty, upsell, and early-access drops</p>
          </div>

          <div className="pt-2">
            <p className="italic font-medium text-ink">Each audience had custom:</p>
            <ul className="space-y-1.5 pl-6 list-disc text-body mt-2">
              <li>Campaign creative</li>
              <li>Timing logic (based on last seen / last clicked)</li>
              <li>Flow experience that mirrored their browsing behavior</li>
            </ul>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mt-12 pt-8 border-t border-linesoft space-y-4">
          <h2 className="text-[22px] md:text-[26px] font-bold text-ink tracking-[-0.015em]">
            2. Welcome Flow Rebuilt to Create Obsession - Not Just Give Discounts
          </h2>

          <p>
            The old welcome flow was 3 emails long and shouted “10% OFF” on every one.
          </p>

          <p>We replaced it with:</p>

          <ul className="space-y-2 pl-6 list-none border-l-2 border-line pl-4">
            <li><strong>Email 1:</strong> Brand origin + founder story</li>
            <li><strong>Email 2:</strong> Styling tips with real customer photos</li>
            <li><strong>Email 3:</strong> Product breakdown with emotional angles</li>
            <li><strong>Email 4:</strong> Reviews from their exact customer archetype</li>
            <li><strong>Email 5:</strong> Offer positioned as an <em className="italic">invite</em>, not a bribe</li>
          </ul>

          <div className="rounded-xl border border-line bg-card p-5 my-4 space-y-2">
            <p className="font-bold text-ink">Result:</p>
            <ul className="space-y-1.5 pl-6 list-disc text-body">
              <li>Welcome flow revenue doubled</li>
              <li>First-purchase rate from subscribers went up 36%</li>
            </ul>
          </div>

          <p className="font-medium text-navy italic text-[19px]">
            We didn’t just sell Product. We sold Belief.
          </p>
        </section>

        {/* Section 3 */}
        <section className="mt-12 pt-8 border-t border-linesoft space-y-4">
          <h2 className="text-[22px] md:text-[26px] font-bold text-ink tracking-[-0.015em]">
            3. Abandonment Flows That Act Like People - Not Robots
          </h2>

          <p>
            Most brands lose money in the first 3 hours after a cart is abandoned — especially in fashion, where decisions are emotional and impulsive.
          </p>

          <p>
            Their existing flows? A slow drip 3 - 4 days between Emails -
          </p>
          <ul className="space-y-1 pl-6 list-disc text-ink">
            <li>Zero urgency.</li>
            <li>Zero personalization.</li>
          </ul>

          <p className="pt-2">We rebuilt it to match how real people shop:</p>

          <div className="space-y-2.5 pl-4 border-l-2 border-navy/40">
            <p>
              <strong>1st Email (1 hr later):</strong> A subtle nudge — product image, clear CTA, no pressure
            </p>
            <p>
              <strong>2nd Email (24 hrs):</strong> Real buyer reviews and styled UGC of the product in use
            </p>
            <p>
              <strong>3rd Email (48 hrs):</strong> Timed scarcity — “Inventory on hold expires soon”
            </p>
          </div>

          <p>
            Each email was designed to feel personal, fast, and frictionless. No loud graphics. No coupons. Just trust and timing.
          </p>

          <div className="rounded-xl border border-line bg-card p-5 space-y-2">
            <p className="font-bold text-ink">What we added behind the scenes:</p>
            <ul className="space-y-1.5 pl-6 list-disc text-body">
              <li>Dynamic product blocks based on what was abandoned</li>
              <li>Geo-adjusted send times (fashion is seasonal — so should your reminders be)</li>
              <li>Split-tested copy tones: casual text vs. urgent CTA vs. playful persona</li>
            </ul>
          </div>
        </section>

        {/* Section 4 */}
        <section className="mt-12 pt-8 border-t border-linesoft space-y-4">
          <h2 className="text-[22px] md:text-[26px] font-bold text-ink tracking-[-0.015em]">
            4. Plain Text Performed Like a Power Tool
          </h2>

          <p>
            Fashion brands love “Looking premium” but aesthetics don’t always sell.
          </p>

          <p>We tested:</p>

          <ul className="space-y-1.5 pl-6 list-disc">
            <li>Founder-style letters</li>
            <li>Launch alerts that looked like a friend texting you</li>
            <li>“P.S.” product highlights in short-form text blocks</li>
          </ul>

          <div className="rounded-xl border border-line bg-card p-5 my-4 space-y-2">
            <p className="font-bold text-ink">
              Result: <span className="font-normal text-subtle">(Inboxes are personal. So should your emails be)</span>
            </p>
            <ul className="space-y-1.5 pl-6 list-disc text-body">
              <li>Plain-text emails had 2.7x higher click-throughs</li>
              <li>One plain-text email drove $18K+ alone</li>
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section className="mt-12 pt-8 border-t border-linesoft space-y-4">
          <h2 className="text-[22px] md:text-[26px] font-bold text-ink tracking-[-0.015em]">
            5. Campaigns vs. Flows - The Hidden Leverage Most Brands Waste
          </h2>

          <p>
            Everyone wants campaign wins. But the real money? It compounds through flows.
          </p>

          <div className="rounded-xl border border-line bg-card p-6 my-4">
            <p className="font-mono text-[12px] uppercase tracking-wider text-navy mb-3">
              30-day Klaviyo snapshot:
            </p>
            <div className="space-y-2 text-[18px]">
              <p className="font-bold text-[22px] text-ink">$230,289.34 in total email revenue</p>
              <p className="text-body2">• $128,651.50 (56%) from flows</p>
              <p className="text-body2">• $101,637.84 (44%) from campaigns</p>
            </div>
          </div>

          <p className="font-medium text-ink">
            We turned automations into a second revenue engine.
          </p>
        </section>

        {/* Section: What Changed Everything? */}
        <section className="mt-12 pt-8 border-t border-linesoft space-y-4">
          <h2 className="text-[24px] md:text-[28px] font-semibold text-ink tracking-[-0.015em]">
            What Changed Everything?
          </h2>

          <p>
            We didn’t scale harder. We scaled <em className="italic font-medium">smarter</em>.
          </p>

          <p>
            We treated email like the operating system of the brand — not just a sales tool.
          </p>

          <ul className="space-y-2 pl-6 list-disc text-ink">
            <li><strong>Lists</strong> = behavioral data, not just subscribers</li>
            <li><strong>Flows</strong> = lifecycle systems, not email “sequences”</li>
            <li><strong>Campaigns</strong> = narrative control, not promotion blasts</li>
          </ul>

          <p className="pt-2 text-[20px]">
            This isn’t Email marketing. This is <strong className="font-bold text-ink">Back-End scaling.</strong>
          </p>
        </section>

        {/* Section: Difference in Numbers? */}
        <section className="mt-12 pt-8 border-t border-linesoft space-y-4">
          <h2 className="text-[22px] md:text-[26px] font-bold text-ink tracking-[-0.015em]">
            Difference in Numbers?
          </h2>

          <ul className="space-y-2.5 pl-6 list-disc text-[18px] text-ink font-medium">
            <li>$77K —&gt; $125K/month in Email revenue</li>
            <li>+$48K backend gained in just 34 days</li>
            <li>$230K+ Klaviyo revenue</li>
            <li>56% of it fully automated via flows</li>
            <li>No new traffic….No extra discounting…. No agency fluff</li>
          </ul>
        </section>

        {/* Section: Want This Done For You? */}
        <section className="mt-14 pt-10 border-t-2 border-line space-y-6">
          <h2 className="text-[26px] md:text-[32px] font-bold text-ink tracking-[-0.02em]">
            Want This Done For You?
          </h2>

          <p className="text-[19px] md:text-[20px] font-semibold text-ink">
            If your brand is doing $50k–$200k/month and you’re serious about hitting 7 figures...
          </p>

          <p className="text-[19px]">
            <strong className="font-bold italic">Book a FREE strategic call: </strong>
            <a
              href="https://calendly.com/thedhakalguy/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold italic text-navy underline hover:text-navydeep break-all"
            >
              https://calendly.com/thedhakalguy/15min
            </a>
          </p>

          <p>
            I’ll show you exactly how to turn email into your most profitable channel.
          </p>

          <p className="text-body2 italic">
            (This is how Real brands scale - Quietly - Profitably - Relationally )
          </p>

          <div className="pt-8">
            <CalendlyInline />
          </div>
        </section>
      </article>
    </div>
  );
}
