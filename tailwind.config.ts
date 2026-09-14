import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Theme tokens — light values in :root, dark values under .dark
           (see app/globals.css). Channel triplets so /opacity still works. */
        bg: "rgb(var(--c-bg) / <alpha-value>)",
        card: "rgb(var(--c-card) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        ink2: "rgb(var(--c-ink2) / <alpha-value>)",
        body: "rgb(var(--c-body) / <alpha-value>)",
        body2: "rgb(var(--c-body2) / <alpha-value>)",
        body3: "rgb(var(--c-body3) / <alpha-value>)",
        subtle: "rgb(var(--c-subtle) / <alpha-value>)",
        faint: "rgb(var(--c-faint) / <alpha-value>)",
        faint2: "rgb(var(--c-faint2) / <alpha-value>)",
        faint3: "rgb(var(--c-faint3) / <alpha-value>)",
        line: "rgb(var(--c-line) / <alpha-value>)",
        line2: "rgb(var(--c-line2) / <alpha-value>)",
        linesoft: "rgb(var(--c-linesoft) / <alpha-value>)",
        linesoft2: "rgb(var(--c-linesoft2) / <alpha-value>)",
        linesoft3: "rgb(var(--c-linesoft3) / <alpha-value>)",
        creamline: "rgb(var(--c-creamline) / <alpha-value>)",
        cream: "rgb(var(--c-cream) / <alpha-value>)",
        cream2: "rgb(var(--c-cream2) / <alpha-value>)",
        navy: "rgb(var(--c-navy) / <alpha-value>)",
        navydeep: "rgb(var(--c-navydeep) / <alpha-value>)",
        navysoft: "rgb(var(--c-navysoft) / <alpha-value>)",
        navyfaint: "rgb(var(--c-navyfaint) / <alpha-value>)",
        /* Constant in both themes */
        onnavy: "#FAFAF9",
        bezel: "#12100E",

        obsidian: "#05081A",
        panel: "#0D142B",
        surface: "#141E3A",
        bone: "#F5F3EF",
        signal: "#67E8F9",
        amber: "#5B7FFF",
        muted: "#7683A3",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      animation: {
        blink: "blink 1s step-end infinite",
        marquee: "marquee 50s linear infinite",
        marqueeFast: "marquee 30s linear infinite",
        pulseSoft: "pulseSoft 2.4s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        blink: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.9", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
