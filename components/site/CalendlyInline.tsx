import { CALENDLY_URL } from "@/lib/site";

/**
 * Inline Calendly scheduler embedded directly on the page (no external tab).
 * Loads in place so booking stays fast and on-site.
 */
export function CalendlyInline() {
  const src = `${CALENDLY_URL}?hide_gdpr_banner=1&background_color=ffffff&text_color=12100e&primary_color=1e2a54`;
  return (
    <div className="rounded-2xl border border-[#E6E3DB] overflow-hidden bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_-30px_rgba(0,0,0,0.2)]">
      <iframe
        src={src}
        title="Book a call with BinaryGen"
        loading="lazy"
        className="w-full"
        style={{ height: 720, border: 0 }}
      />
    </div>
  );
}
