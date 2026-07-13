import type { Metadata } from "next";
import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BinaryGen — Lower your CAC. Raise your LTV.",
  description:
    "We build the email and SMS retention that turns one-time buyers into repeat revenue for ecommerce brands.",
  metadataBase: new URL("https://getbinarygen.com"),
  openGraph: {
    title: "BinaryGen - Lower your CAC. Raise your LTV.",
    description:
      "Email and SMS retention that raises LTV and eases the pressure on your CAC — usually 18–35% of revenue from email.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <head>
        <link rel="preconnect" href="https://calendly.com" />
        <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://calendly.com" />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
