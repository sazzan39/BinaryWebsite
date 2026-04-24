export function SystemGrid() {
  const quadrants = [
    {
      name: "CAPTURE",
      body: "Convert strangers into first-time buyers with behavioral triggers tied to intent — not batch sends.",
      outcome: "First-order CVR ↑ 18–34%",
    },
    {
      name: "RECOVER",
      body: "Recover the 68% of revenue that silently walks out between cart and checkout, and between checkout and repeat.",
      outcome: "Abandonment recovery ↑ 2.1–3.4×",
    },
    {
      name: "RETAIN",
      body: "Architect the post-purchase window so customers return before they drift — not after.",
      outcome: "Repeat rate ↑ 1.8–2.6×",
    },
    {
      name: "EXPAND",
      body: "Systematize the 2nd, 3rd, 4th order with behavioral segmentation, pricing ladders, and reactivation logic.",
      outcome: "365-day LTV ↑ 2.1–3.2×",
    },
  ];

  return (
    <section id="system" className="py-32 px-6 border-t border-panel">
      <div className="max-w-[1200px] mx-auto">
        <header className="text-center mb-20">
          <p className="font-mono text-[11px] text-muted tracking-[0.3em] mb-6">
            THE SYSTEM
          </p>
          <h2 className="font-serif text-4xl md:text-6xl text-bone leading-tight">
            Capture. Recover.
            <br />
            Retain. Expand.
          </h2>
          <p className="mt-8 text-bone/60 max-w-lg mx-auto">
            Four interlocking engines. Built together or not at all.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-px bg-panel border border-panel">
          {quadrants.map((q) => (
            <div
              key={q.name}
              className="bg-obsidian p-12 relative group overflow-hidden"
            >
              <p className="font-mono text-sm text-bone tracking-widest mb-6">
                {q.name}
              </p>
              <p className="font-serif text-xl text-bone/80 leading-snug mb-10">
                {q.body}
              </p>
              <div className="pt-6 border-t border-panel">
                <p className="font-mono text-[10px] text-muted tracking-widest mb-2">
                  OUTCOME
                </p>
                <p className="font-mono text-sm text-signal">{q.outcome}</p>
              </div>

              <div className="absolute bottom-0 left-0 h-px bg-signal w-0 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
