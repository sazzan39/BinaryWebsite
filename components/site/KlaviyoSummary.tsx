/**
 * Faithful recreation of Klaviyo's "Business performance summary" card,
 * populated with a client's REAL numbers. Renders instantly (no image file
 * needed) and reads like the actual dashboard. Uses Klaviyo's own light-UI
 * greys rather than the site theme, so it looks like the product.
 */

type Delta = { dir: "up" | "down"; pct: string; period: string };
type Break = { label: string; value: string; pct?: string };

export function KlaviyoSummary({
  dateLabel,
  total,
  totalDelta,
  attributed,
  attributedSharePct,
  attributedDelta,
  breakdown,
}: {
  dateLabel: string;
  total: string;
  totalDelta?: Delta;
  attributed: string;
  attributedSharePct: string;
  attributedDelta?: Delta;
  breakdown?: Break[];
}) {
  return (
    <div className="rounded-2xl border border-[#E4E6EB] bg-white overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_-30px_rgba(0,0,0,0.22)] text-[#1F2328]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-6 md:px-8 pt-6 pb-5">
        <div>
          <p className="text-[16px] font-semibold">Business performance summary</p>
          <p className="mt-1 text-[13px] text-[#6B7280]">{dateLabel}</p>
        </div>
        <span className="hidden sm:inline-flex h-8 items-center px-3 rounded-md border border-[#D1D5DB] text-[13px] text-[#374151]">
          View dashboard
        </span>
      </div>

      {/* Big numbers */}
      <div className="mx-6 md:mx-8 rounded-xl border border-[#E4E6EB] px-6 md:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Figure
          value={total}
          label="Total revenue"
          delta={totalDelta}
        />
        <Figure
          value={attributed}
          label={`Attributed revenue (${attributedSharePct}% of total)`}
          delta={attributedDelta}
        />
      </div>

      {/* Breakdown */}
      {breakdown && breakdown.length > 0 && (
        <div className="px-6 md:px-8 pt-6 pb-7">
          <p className="text-[14px] font-semibold">Attributed revenue</p>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-y-4 gap-x-4 border-t border-[#EEF0F3] pt-4">
            {breakdown.map((b) => (
              <div key={b.label}>
                <p className="text-[12px] text-[#6B7280]">{b.label}</p>
                <p className="mt-1 text-[15px] tabular-nums">{b.value}</p>
                {b.pct && (
                  <p className="text-[12px] text-[#6B7280] tabular-nums">{b.pct}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Figure({
  value,
  label,
  delta,
}: {
  value: string;
  label: string;
  delta?: Delta;
}) {
  return (
    <div>
      <div className="text-4xl md:text-[42px] leading-none tracking-[-0.01em] tabular-nums">
        {value}
      </div>
      <p className="mt-3 text-[14px] text-[#374151]">{label}</p>
      {delta && (
        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#F3F4F6] pl-2 pr-2.5 py-1">
          <span
            className={`text-[12px] ${
              delta.dir === "up" ? "text-[#12805C]" : "text-[#C0362C]"
            }`}
          >
            {delta.dir === "up" ? "↗" : "↘"}
          </span>
          <span
            className={`text-[12px] font-medium tabular-nums ${
              delta.dir === "up" ? "text-[#12805C]" : "text-[#C0362C]"
            }`}
          >
            {delta.pct}
          </span>
          <span className="text-[12px] text-[#6B7280]">{delta.period}</span>
        </div>
      )}
    </div>
  );
}
