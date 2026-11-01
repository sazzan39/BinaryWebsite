"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Top navigation. On >=sm the links sit inline; below sm they collapse behind
 * a hamburger toggle so they stay reachable on phones (the inline nav is
 * `hidden` there and would otherwise leave mobile visitors with no way to
 * reach case studies, services, resources or the FAQ).
 */

const CASES = [
  { href: "/work/fashion-revenue-scaling", label: "Fashion ($230K Added)" },
  { href: "/work/fashion-accessories", label: "Fashion & Accessories" },
  { href: "/work/health-supplement", label: "Health & Supplement" },
];

// Each mobile menu row is a bordered rectangle button with a subtle press
// state, so the sheet reads as tappable controls rather than plain links.
const mobileItem =
  "flex items-center justify-between rounded-xl border border-line bg-card px-4 py-3.5 " +
  "text-[16px] font-medium text-ink shadow-[0_1px_2px_rgba(0,0,0,0.03)] " +
  "hover:bg-bg hover:border-line2 active:scale-[0.99] transition-all duration-150";

// Nested case-study rows: lighter than a top-level button, indented under the
// Case studies expander.
const subItem =
  "flex items-center justify-between rounded-lg px-3.5 py-3 " +
  "text-[15px] text-ink2 hover:bg-card hover:text-ink active:scale-[0.99] transition-all duration-150";

// `down` points the chevron down (an expander affordance); `open` rotates it
// 180° when its section is expanded. Bare, it points right (a link affordance).
function Chevron({ open, down }: { open?: boolean; down?: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={
        "shrink-0 text-faint transition-transform duration-200" +
        (open ? " rotate-180" : "")
      }
      aria-hidden="true"
    >
      {down ? <path d="M6 9l6 6 6-6" /> : <path d="M9 6l6 6-6 6" />}
    </svg>
  );
}

export function NavLight() {
  const [menuOpen, setMenuOpen] = useState(false);
  // Whether the Case studies sub-section is expanded inside the mobile sheet.
  const [casesOpen, setCasesOpen] = useState(false);

  // Lock the page behind the open sheet, and never leave the menu mounted when
  // the viewport grows past the mobile breakpoint.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onResize = () => {
      if (window.matchMedia("(min-width: 640px)").matches) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const close = () => {
    setMenuOpen(false);
    setCasesOpen(false);
  };

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
            Premium Resources
          </Link>
          <a href="#faq" className="hover:text-ink transition-colors">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#book"
            className="h-10 px-5 inline-flex items-center rounded-full bg-navy text-onnavy text-[14px] font-medium hover:bg-navydeep transition-colors"
          >
            Book a call
          </a>

          {/* Mobile menu toggle — only below the sm breakpoint. */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden h-10 w-10 -mr-1 inline-flex items-center justify-center rounded-full text-ink hover:bg-linesoft/60 transition-colors"
          >
            {menuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      {menuOpen && (
        <div className="sm:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="fixed inset-x-0 top-16 bottom-0 z-40 bg-bg/40"
          />
          <nav
            id="mobile-nav"
            className="relative z-50 border-t border-linesoft bg-bg px-5 py-5 text-[16px] text-body"
          >
            <div className="grid grid-cols-1 gap-2.5">
              {/* Case studies — tap to expand its two sub-items. */}
              <div>
                <button
                  type="button"
                  onClick={() => setCasesOpen((v) => !v)}
                  aria-expanded={casesOpen}
                  aria-controls="mobile-cases"
                  className={mobileItem + " w-full"}
                >
                  <span>Case studies</span>
                  <Chevron open={casesOpen} down />
                </button>

                <div
                  id="mobile-cases"
                  className="grid transition-[grid-template-rows] duration-200 ease-out"
                  style={{ gridTemplateRows: casesOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="mt-2 ml-3 grid grid-cols-1 gap-2 border-l border-line pl-3">
                      {CASES.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={close}
                          className={subItem}
                        >
                          <span>{c.label}</span>
                          <Chevron />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <a href="#services" onClick={close} className={mobileItem}>
                <span>What we do</span>
                <Chevron />
              </a>
              <Link href="/resources" onClick={close} className={mobileItem}>
                <span>Premium Resources</span>
                <Chevron />
              </Link>
              <a href="#faq" onClick={close} className={mobileItem}>
                <span>FAQ</span>
                <Chevron />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
