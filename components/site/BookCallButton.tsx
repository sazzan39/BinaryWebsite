"use client";

import { PopupButton } from "react-calendly";
import { useEffect, useState } from "react";

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ?? "https://calendly.com/thedhakalguy/15min";

type Variant = "primary" | "ghost" | "jumbo";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  utm?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
  };
  prefill?: {
    name?: string;
    email?: string;
  };
  className?: string;
};

const STYLES: Record<Variant, string> = {
  primary:
    "h-14 px-8 rounded-full bg-amber text-white font-semibold text-sm tracking-wide hover:bg-amber/90 transition-all hover:scale-[1.02]",
  ghost:
    "h-14 px-8 rounded-full border border-bone/20 text-bone font-mono text-sm tracking-wide hover:border-amber hover:text-amber transition-colors",
  jumbo:
    "h-16 md:h-20 px-10 md:px-14 rounded-full bg-amber text-white font-semibold text-base md:text-lg tracking-wide hover:bg-amber/90 transition-all hover:scale-[1.02] shadow-[0_20px_60px_rgba(91,127,255,0.35)]",
};

export function BookCallButton({
  children,
  variant = "primary",
  utm,
  prefill,
  className,
}: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button disabled className={`${STYLES[variant]} ${className ?? ""} opacity-50`}>
        {children}
      </button>
    );
  }

  const utmPayload = utm
    ? {
        utmSource: utm.utm_source ?? "",
        utmMedium: utm.utm_medium ?? "",
        utmCampaign: utm.utm_campaign ?? "",
        utmContent: utm.utm_content ?? "",
      }
    : undefined;

  return (
    <PopupButton
      url={CALENDLY_URL}
      rootElement={document.body}
      text={children as string}
      className={`${STYLES[variant]} ${className ?? ""}`}
      prefill={prefill}
      utm={utmPayload}
    />
  );
}
