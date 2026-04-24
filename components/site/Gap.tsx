export function Gap() {
  const stages = [
    { name: "Purchase", drop: 38, reason: "no welcome architecture" },
    { name: "Repeat", drop: 61, reason: "no reactivation logic" },
    { name: "Loyal", drop: 82, reason: "no expansion system" },
  ];

  return (
    <section id="gap" className="py-20 md:py-24 px-6 border-t border-panel">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="font-mono text-[11px] text-muted tracking-[0.3em] mb-8">
            02 — GAP
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-bone leading-tight">
            LTV isn&rsquo;t growing because your backend was never built to
            grow it.
          </h2>

          <div className="mt-10 space-y-5 text-bone/70 leading-relaxed">
            <p>
              You&rsquo;re acquiring customers through a sophisticated
              machine&mdash;attribution, creatives, landing pages, tested
              offers. Then you hand them off to:
            </p>
            <ul className="space-y-2 font-mono text-sm text-bone/60">
              <li>— A generic welcome email</li>
              <li>— A broken abandonment flow</li>
              <li>— Zero post-purchase sequencing</li>
              <li>— A winback that fires 90 days too late</li>
              <li>
                — No segmentation past &ldquo;purchased / didn&rsquo;t
                purchase&rdquo;
              </li>
            </ul>
            <p>
              The asymmetry is brutal: a{" "}
              <span className="text-bone">$100k/mo acquisition system</span>{" "}
              feeding a{" "}
              <span className="text-bone">$2k/mo retention system</span>. This
              is the gap.
            </p>
          </div>
        </div>

        <div className="border border-panel p-10 bg-panel/20">
          <p className="font-mono text-[10px] text-muted tracking-widest mb-8">
            REVENUE TOPOLOGY — TYPICAL
          </p>

          <div className="space-y-6">
            <StageRow name="Traffic" drop={null} reason={null} />
            {stages.map((s) => (
              <StageRow key={s.name} name={s.name} drop={s.drop} reason={s.reason} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StageRow({
  name,
  drop,
  reason,
}: {
  name: string;
  drop: number | null;
  reason: string | null;
}) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="w-3 h-3 rounded-full bg-signal shrink-0" />
        <p className="font-mono text-sm text-bone">{name}</p>
        {drop !== null && (
          <p className="ml-auto font-mono text-xs text-bone/50">↓ {drop}%</p>
        )}
      </div>
      {drop !== null && reason && (
        <div className="mt-2 ml-7 border-l border-signal/40 pl-4 py-1">
          <p className="font-mono text-[11px] text-muted">LEAK · {reason}</p>
        </div>
      )}
      {drop === null && <div className="ml-1.5 h-6 w-px bg-bone/20 mt-2" />}
    </div>
  );
}
