export function OutcomesTable() {
  const rows = [
    { label: "CAC", before: "$74", after: "$58", delta: "↓ 22%" },
    { label: "LTV (90-day)", before: "$112", after: "$228", delta: "↑ 103%" },
    { label: "LTV:CAC", before: "1.5×", after: "3.9×", delta: "↑ 160%" },
    { label: "Repeat rate", before: "17%", after: "34%", delta: "↑ 100%" },
    { label: "Email rev contribution", before: "9%", after: "29%", delta: "↑ 222%" },
    { label: "Contribution margin", before: "11%", after: "27%", delta: "↑ 145%" },
  ];

  return (
    <section id="outcomes" className="py-32 px-6 border-t border-panel">
      <div className="max-w-[1000px] mx-auto">
        <header className="text-center mb-16">
          <p className="font-mono text-[11px] text-muted tracking-[0.3em] mb-6">
            ECONOMIC SHIFT
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-bone">
            What changes on your P&amp;L.
          </h2>
        </header>

        <div className="border border-panel bg-panel/20">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr]font-mono text-[10px] text-muted tracking-widest px-4 sm:px-6 md:px-8 py-5 md:py-6 text-sm md:text-base border-b border-panel">
            <p>&nbsp;</p>
            <p className="text-right">BEFORE</p>
            <p className="text-right">AFTER</p>
            <p className="text-right">DELTA</p>
          </div>

          {rows.map((r) => (
            <div
              key={r.label}
              className="grid grid-cols-[1.4fr_1fr_1fr_1fr]px-4 sm:px-6 md:px-8 py-5 md:py-6 text-sm md:text-base border-b border-panel/60 last:border-b-0"
            >
              <p className="text-bone/80">{r.label}</p>
              <p className="text-right font-mono text-bone/60">{r.before}</p>
              <p className="text-right font-mono text-bone">{r.after}</p>
              <p className="text-right font-mono text-signal">{r.delta}</p>
            </div>
          ))}

          <div className="grid grid-cols-2 border-t border-panel bg-obsidian">
            <div className="p-8 border-r border-panel">
              <p className="font-mono text-[10px] text-muted tracking-widest mb-3">
                CAC PRESSURE
              </p>
              <p className="font-serif text-2xl">
                <span className="text-bone/40 line-through mr-3">HIGH</span>
                <span className="text-signal">LOW</span>
              </p>
            </div>
            <div className="p-8">
              <p className="font-mono text-[10px] text-muted tracking-widest mb-3">
                GROWTH HEADROOM
              </p>
              <p className="font-serif text-2xl">
                <span className="text-bone/40 line-through mr-3">CAPPED</span>
                <span className="text-signal">COMPOUNDING</span>
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center font-mono text-xs text-muted">
          Not projections. Median across our portfolio over the last 18 months.
        </p>
      </div>
    </section>
  );
}
