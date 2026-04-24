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
  title: "BinaryGen — Revenue Intelligence System",
  description:
    "A Revenue Intelligence System that diagnoses and rebuilds the economic gap between your CAC and LTV. Built for DTC brands.",
  metadataBase: new URL("https://getbinarygen.com"),
  openGraph: {
    title: "BinaryGen — Revenue Intelligence System",
    description:
      "Your CAC keeps rising. Your LTV isn't moving. That's an economics problem Not a marketing problem.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="font-sans bg-obsidian text-bone">{children}</body>
    </html>
  );
}
