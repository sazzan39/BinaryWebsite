export function BeliefBreak() {
  const rows = [
    { told: "Scale ad spend", actual: "CAC rises until margin breaks" },
    { told: "Improve creatives", actual: "70% of revenue leaks post-purchase" },
    { told: "Optimize funnels", actual: "Retention is where LTV is built" },
  ];

  return (
    <section id="break" className="py-32 px-6 border-t border-panel">
      <div className="max-w-[960px] mx-auto text-center">
        <p className="font-mono text-[11px] text-muted tracking-[0.3em] mb-10">
          01 — BREAK
        </p>

        <h2 className="font-serif italic text-4xl md:text-6xl text-bone leading-tight">
          &ldquo;More ads won&rsquo;t fix
          <br />a broken economic engine.&rdquo;
        </h2>

        <p className="mt-10 text-bone/60 max-w-2xl mx-auto leading-relaxed">
          Every brand we audit is pouring more money into acquisition to
          compensate for a customer that isn&rsquo;t coming back. That&rsquo;s
          not scale. That&rsquo;s a leak with a bigger hose pointed at it.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-px bg-panel border border-panel">
          {rows.map((r, i) => (
            <div key={i} className="bg-obsidian p-8 text-left">
              <p className="font-mono text-[10px] text-muted tracking-widest mb-4">
                WHAT YOU&rsquo;RE TOLD
              </p>
              <p className="font-serif text-xl text-bone/70 line-through decoration-bone/30 mb-8">
                {r.told}
              </p>
              <p className="font-mono text-[10px] text-signal tracking-widest mb-4">
                WHAT&rsquo;S TRUE
              </p>
              <p className="font-serif text-xl text-bone">{r.actual}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
