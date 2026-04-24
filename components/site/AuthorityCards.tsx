export function AuthorityCards() {
  const cards = [
    {
      title: "Customer decay curves",
      body: "Every brand has a repurchase half-life, the day at which 50% of buyers have drifted. We map it per SKU, per segment, per acquisition source, then fire interventions before the decay, not after.",
      visual: "decay",
    },
    {
      title: "Margin-first sequencing",
      body: "Most flows are optimized for open rate. We optimize for contribution margin per send. A 3% open rate on a high-margin reactivation beats a 42% open rate on a blast.",
      visual: "bars",
    },
    {
      title: "Revenue topology",
      body: "Acquisition, activation, retention, and expansion are not channels — they're a topology. A leak in one redistributes pressure to the others. We map the whole shape before touching a single flow.",
      visual: "graph",
    },
  ];

  return (
    <section id="authority" className="py-32 px-6 border-t border-panel">
      <div className="max-w-[1200px] mx-auto">
        <header className="text-center mb-20">
          <p className="font-mono text-[11px] text-muted tracking-[0.3em] mb-6">
            HOW WE SEE YOUR BUSINESS
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-bone">
            We don&rsquo;t send emails.
            <br />
            We read behavior.
          </h2>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c) => (
            <div
              key={c.title}
              className="border border-panel p-8 hover:border-signal/40 transition-colors"
            >
              <div className="h-24 mb-8 border-b border-panel">
                <Visual kind={c.visual as Visuals} />
              </div>
              <p className="font-mono text-[10px] text-muted tracking-widest mb-4">
                BEHAVIORAL PATTERN
              </p>
              <h3 className="font-serif text-xl text-bone mb-4">{c.title}</h3>
              <p className="text-sm text-bone/70 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type Visuals = "decay" | "bars" | "graph";

function Visual({ kind }: { kind: Visuals }) {
  if (kind === "decay") {
    return (
      <svg viewBox="0 0 200 80" className="w-full h-full">
        <path
          d="M0,10 Q60,18 100,40 T200,72"
          stroke="#F5F3EF"
          strokeOpacity="0.6"
          strokeWidth="1.5"
          fill="none"
        />
        <line x1="100" y1="0" x2="100" y2="80" stroke="#E8FF5C" strokeDasharray="2 3" strokeWidth="1" />
        <text x="104" y="16" fill="#E8FF5C" fontSize="7" fontFamily="monospace">
          INTERVENTION
        </text>
      </svg>
    );
  }
  if (kind === "bars") {
    return (
      <svg viewBox="0 0 200 80" className="w-full h-full">
        {[16, 32, 24, 48, 20, 56, 28, 64].map((h, i) => (
          <rect
            key={i}
            x={i * 24}
            y={80 - h}
            width="12"
            height={h}
            fill={i % 3 === 0 ? "#E8FF5C" : "#F5F3EF"}
            opacity={i % 3 === 0 ? 1 : 0.4}
          />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <g stroke="#F5F3EF" strokeOpacity="0.3">
        <line x1="30" y1="40" x2="100" y2="20" />
        <line x1="30" y1="40" x2="100" y2="60" />
        <line x1="100" y1="20" x2="170" y2="40" />
        <line x1="100" y1="60" x2="170" y2="40" />
      </g>
      <circle cx="30" cy="40" r="6" fill="#F5F3EF" />
      <circle cx="100" cy="20" r="6" fill="#E8FF5C" className="animate-pulseSoft" />
      <circle cx="100" cy="60" r="6" fill="#F5F3EF" />
      <circle cx="170" cy="40" r="6" fill="#F5F3EF" />
    </svg>
  );
}
