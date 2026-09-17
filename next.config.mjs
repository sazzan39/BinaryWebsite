import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: projectRoot,
  },
  outputFileTracingRoot: projectRoot,
  // Codespaces serves the dev server through a forwarded *.app.github.dev
  // origin, and VS Code's own port-forwarding proxy fronts that as
  // 127.0.0.1 — without both, Next.js's dev cross-origin guard silently
  // blocks HMR/asset requests, which breaks client-side interactivity
  // (toggles, scroll-reveal, etc).
  allowedDevOrigins: ["*.app.github.dev", "127.0.0.1", "localhost"],
};

export default nextConfig;
