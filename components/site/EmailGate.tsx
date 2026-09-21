"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Teaser gate. The wrapped content renders in the clear for a few seconds so
 * the reader can see it is real, then blurs behind an email form. Unlocking is
 * remembered per browser so a returning reader is not gated twice.
 */

const STORAGE_KEY = "bg:playbook-unlocked";
const REVEAL_MS = 2000;

type Status = "idle" | "submitting" | "error";

export function EmailGate({ children }: { children: React.ReactNode }) {
  // Starts locked-but-visible: `unlocked` is resolved from storage on mount,
  // and the blur only lands once the reveal timer fires.
  const [unlocked, setUnlocked] = useState(false);
  const [blurred, setBlurred] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let alreadyUnlocked = false;
    try {
      alreadyUnlocked = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // Private mode / blocked storage, so fall through and gate as normal.
    }
    if (alreadyUnlocked) {
      setUnlocked(true);
      return;
    }
    const timer = window.setTimeout(() => setBlurred(true), REVEAL_MS);
    return () => window.clearTimeout(timer);
  }, []);

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setMessage("");

    try {
      const res = await fetch("/api/playbook-access", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setStatus("error");
        setMessage(
          data.error === "invalid_email"
            ? "That address does not look right. Check it and try again."
            : "Something went wrong on our end. Try again in a moment.",
        );
        return;
      }
      try {
        window.localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // Unlock for this session only if storage is unavailable.
      }
      setUnlocked(true);
    } catch {
      setStatus("error");
      setMessage("Could not reach the server. Check your connection.");
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
          className="fixed inset-0 z-50 flex items-center justify-center px-6 bg-bg/70"
        >
          <div className="w-full max-w-[440px] rounded-2xl border border-line bg-card p-8 md:p-10 shadow-2xl shadow-black/10">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-subtle">
              Premium resource
            </p>
            <h2
              id="gate-title"
              className="mt-4 text-[22px] md:text-[26px] leading-[1.2] tracking-[-0.01em] font-medium"
            >
              Read the rest of the playbook
            </h2>
            <p className="mt-3 text-[15px] text-body leading-relaxed">
              Tell us where to send it and the page unlocks. No sequence, no
              drip. Just one email with the PDF if you want it.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label
                  htmlFor="gate-email"
                  className="block font-mono text-[11px] tracking-[0.16em] uppercase text-subtle"
                >
                  Email
                </label>
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
                  className="mt-2 w-full h-12 px-4 rounded-xl border border-line bg-bg text-ink text-[15px] placeholder:text-faint outline-none focus:border-navy transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="gate-role"
                  className="block font-mono text-[11px] tracking-[0.16em] uppercase text-subtle"
                >
                  Brand or agency
                </label>
                <select
                  id="gate-role"
                  name="role"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-2 w-full h-12 px-4 rounded-xl border border-line bg-bg text-ink text-[15px] outline-none focus:border-navy transition-colors appearance-none"
                >
                  <option value="" disabled>
                    Select one…
                  </option>
                  <option value="brand">Brand</option>
                  <option value="agency">Agency</option>
                </select>
              </div>

              {status === "error" && message && (
                <p role="alert" className="text-[14px] text-body2">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full h-12 inline-flex items-center justify-center rounded-full bg-navy text-onnavy font-medium text-[15px] hover:bg-navydeep disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {status === "submitting" ? "Unlocking…" : "Unlock the playbook"}
              </button>
            </form>

            <p className="mt-5 text-[12px] text-faint2 leading-relaxed">
              We use this to send the PDF and the occasional teardown. Unsubscribe
              in one click.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
