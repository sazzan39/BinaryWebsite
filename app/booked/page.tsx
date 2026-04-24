import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booked · BinaryGen",
  description: "Your BGR Audit is scheduled.",
};

export default function BookedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-xl text-center">
        <p className="font-mono text-[11px] text-muted tracking-[0.3em] mb-8">
          CONFIRMED — SESSION SCHEDULED
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-bone leading-tight">
          We&rsquo;ll see you then.
        </h1>
        <p className="mt-10 text-bone/70 leading-relaxed">
          A calendar invite is on the way. Before the call, run the Revenue
          Diagnosis at{" "}
          <a href="/#diagnose" className="text-signal underline">
            binarygen.com/#diagnose
          </a>
          . Founders who come in with the output run a sharper session — we
          spend 45 minutes on the rebuild, not 20 minutes on the baseline.
        </p>
        <p className="mt-14 font-mono text-xs text-muted">
          Questions before the call? Reply to the calendar invite.
        </p>
        <div className="mt-12">
          <a
            href="/"
            className="font-mono text-xs text-bone/60 hover:text-signal transition-colors"
          >
            ← back to binarygen
          </a>
        </div>
      </div>
    </main>
  );
}
