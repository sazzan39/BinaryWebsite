"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Teaser gate. The wrapped content renders in the clear for a few seconds so
 * the reader can see it is real, then blurs behind a short form. Unlocking is
 * remembered per browser and per resource, so a returning reader is not gated
 * twice but each playbook still captures its own lead.
 */

// Before per-resource keys existed, this one key unlocked the No-Discount
// playbook; it still does, so those readers are not gated again.
const LEGACY_KEY = "bg:playbook-unlocked";
const LEGACY_RESOURCE = "no-discount-growth-playbook";
const LEAD_KEY = "bg:playbook-lead";
const REVEAL_MS = 2000;

type Status = "idle" | "submitting" | "error";

const SEGMENTS = [
  { value: "brand", label: "Brand" },
  { value: "agency", label: "Agency" },
  { value: "freelancer", label: "Freelancer" },
  { value: "tech-partner", label: "Tech Partner" },
];

const REVENUES = [
  { value: "under-100k", label: "Below $100k MRR" },
  { value: "100k-250k", label: "$100k – $250k MRR" },
  { value: "250k-500k", label: "$250k – $500k MRR" },
  { value: "500k-1m", label: "$500k – $1M MRR" },
  { value: "1m-plus", label: "$1M+ MRR" },
];

export function EmailGate({
  resource,
  children,
}: {
  /** Slug saved with the lead, e.g. "subscription-retention-playbook". */
  resource: string;
  children: React.ReactNode;
}) {
  const storageKey = `bg:playbook-unlocked:${resource}`;
  // Starts locked-but-visible: `unlocked` is resolved from storage on mount,
  // and the blur only lands once the reveal timer fires.
  const [unlocked, setUnlocked] = useState(false);
  const [blurred, setBlurred] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [segment, setSegment] = useState("");
  const [revenue, setRevenue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let alreadyUnlocked = false;
    try {
      alreadyUnlocked =
        window.localStorage.getItem(storageKey) === "1" ||
        (resource === LEGACY_RESOURCE &&
          window.localStorage.getItem(LEGACY_KEY) === "1");
    } catch {
      // Private mode / blocked storage, so fall through and gate as normal.
    }
    if (alreadyUnlocked) {
      setUnlocked(true);
      return;
    }
    const timer = window.setTimeout(() => setBlurred(true), REVEAL_MS);
    return () => window.clearTimeout(timer);
  }, [storageKey, resource]);

  const locked = blurred && !unlocked;

  // Hold the page still behind the form, and put focus where the reader needs
  // it the moment the gate lands.
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    emailRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);

  function persistAndUnlock() {
    try {
      window.localStorage.setItem(storageKey, "1");
      window.localStorage.setItem(
        LEAD_KEY,
        JSON.stringify({
          email,
          name,
          segment,
          revenue,
          resource,
          date: new Date().toISOString(),
        }),
      );
    } catch {
      // Unlock for this session only if storage is unavailable.
    }
    setUnlocked(true);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/playbook-access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, name, segment, revenue, resource }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;

        if (data?.error === "invalid_email") {
          setStatus("error");
          setMessage("That address does not look right. Check it and try again.");
          return;
        }
        if (data?.error === "invalid_segment") {
          setStatus("error");
          setMessage("Pick what best describes you from the dropdown.");
          return;
        }

        // Any unexpected server-side error: keep the lead locally and unlock
        // anyway so the reader is never blocked from a page we captured.
        persistAndUnlock();
        return;
      }

      persistAndUnlock();
    } catch {
      // Network failure: keep the lead locally and unlock.
      persistAndUnlock();
    }
  }

  return (
    <div className="relative">
      <div
        aria-hidden={locked || undefined}
        className={
          locked
            ? "blur-[7px] select-none pointer-events-none transition-[filter] duration-700 ease-out"
            : "transition-[filter] duration-700 ease-out"
        }
      >
        {children}
      </div>

      {locked && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gate-title"
          className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-bg/70 backdrop-blur-sm animate-[gateIn_.35s_ease-out]"
        >
          <div className="w-full max-w-[460px] rounded-2xl border border-line bg-card p-7 sm:p-9 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_40px_90px_-45px_rgba(0,0,0,0.4)] animate-[gateCard_.4s_cubic-bezier(0.16,1,0.3,1)]">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-subtle">
              Premium resource
            </p>
            <h2
              id="gate-title"
              className="mt-4 text-[22px] sm:text-[26px] leading-[1.2] tracking-[-0.01em] font-medium"
            >
              Read the rest of the playbook
            </h2>
            <p className="mt-3 text-[15px] text-body leading-relaxed">
              Tell us who you are and the page unlocks. No sequence, no drip —
              just the playbook and the occasional teardown.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
              <Field label="Email" htmlFor="gate-email">
                <input
                  ref={emailRef}
                  id="gate-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@brand.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Name" htmlFor="gate-name" optional>
                <input
                  id="gate-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="First name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="What best describes you" htmlFor="gate-segment">
                <SelectShell>
                  <select
                    id="gate-segment"
                    name="segment"
                    required
                    value={segment}
                    onChange={(e) => setSegment(e.target.value)}
                    className={selectClass}
                  >
                    <option value="" disabled>
                      Select one…
                    </option>
                    {SEGMENTS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                </SelectShell>
              </Field>

              <Field label="Monthly revenue" htmlFor="gate-revenue" optional>
                <SelectShell>
                  <select
                    id="gate-revenue"
                    name="revenue"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                    className={selectClass}
                  >
                    <option value="">Prefer not to say</option>
                    {REVENUES.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </SelectShell>
              </Field>

              {status === "error" && message && (
                <p role="alert" className="text-[14px] text-body2">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-1 w-full h-12 inline-flex items-center justify-center rounded-xl bg-navy text-onnavy font-medium text-[15px] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_-12px_rgba(20,30,60,0.6)] hover:bg-navydeep hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 transition-all duration-150"
              >
                {status === "submitting" ? "Unlocking…" : "Unlock the playbook"}
              </button>
            </form>

            <p className="mt-4 text-[12px] text-faint2 leading-relaxed">
              We use this to send the PDF and the occasional teardown.
              Unsubscribe in one click.
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes gateIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes gateCard {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

/* --------------------------------------------------------------- pieces */

// Shared input styling — one clean, quiet field style across the form.
const inputClass =
  "mt-1.5 w-full h-11 px-3.5 rounded-lg border border-line bg-bg text-ink text-[15px] " +
  "placeholder:text-faint outline-none focus:border-navy focus:ring-[3px] focus:ring-navy/12 " +
  "transition-[border-color,box-shadow] duration-150";

const selectClass =
  "peer w-full h-11 pl-3.5 pr-10 rounded-lg border border-line bg-bg text-ink text-[15px] " +
  "outline-none focus:border-navy focus:ring-[3px] focus:ring-navy/12 " +
  "transition-[border-color,box-shadow] duration-150 appearance-none cursor-pointer " +
  "invalid:text-faint";

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] uppercase text-subtle"
      >
        {label}
        {optional && (
          <span className="tracking-normal font-sans text-[11px] normal-case text-faint2">
            optional
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

// Wraps a native select so we can draw our own chevron; the default OS arrow
// is what makes a select look unstyled, so we hide it and place our own.
function SelectShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mt-1.5">
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-faint peer-focus:text-navy transition-colors"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}
