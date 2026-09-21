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
  { href: "/work/fashion-accessories", label: "Fashion & Accessories" },
  { href: "/work/health-supplement", label: "Health & Supplement" },
];

export function NavLight() {
  const [menuOpen, setMenuOpen] = useState(false);

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

  const close = () => setMenuOpen(false);

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
            className="relative z-50 border-t border-linesoft bg-bg px-6 py-4 text-[16px] text-body"
          >
            <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-subtle">
              Case studies
            </p>
            <div className="mt-1 mb-3">
              {CASES.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  onClick={close}
                  className="block py-2.5 text-ink2 hover:text-ink transition-colors"
                >
                  {c.label}
                </Link>
              ))}
            </div>

            <a
              href="#services"
              onClick={close}
              className="block py-3 border-t border-linesoft hover:text-ink transition-colors"
            >
              What we do
            </a>
            <Link
              href="/resources"
              onClick={close}
              className="block py-3 border-t border-linesoft hover:text-ink transition-colors"
            >
              Premium Resources
            </Link>
            <a
              href="#faq"
              onClick={close}
              className="block py-3 border-t border-linesoft hover:text-ink transition-colors"
            >
              FAQ
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
