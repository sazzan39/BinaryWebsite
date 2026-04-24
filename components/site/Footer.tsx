import { Logo } from "@/components/primitives/Logo";

export function Footer() {
  return (
    <footer className="py-14 md:py-20 px-6 border-t border-panel bg-obsidian">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 md:gap-8">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm text-bone/60 leading-relaxed">
              A Revenue Intelligence System that rebuilds the economics of
              DTC brands. CAC pressure down, LTV compounding.
            </p>
          </div>

          <FooterCol
            title="Diagnose"
            links={[
              { href: "#diagnose", label: "Revenue Intelligence" },
              { href: "#proof", label: "Proof" },
              { href: "#funnel", label: "Retention Funnel" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { href: "#outcomes", label: "Outcomes" },
              { href: "#offer", label: "Book an audit" },
              { href: "#faq", label: "FAQ" },
            ]}
          />
          <FooterCol
            title="Contact"
            links={[
              { href: "mailto:founders@binarygen.com", label: "founders@binarygen.com" },
              { href: "#offer", label: "Book a call" },
            ]}
          />
        </div>

        <div className="mt-14 pt-6 border-t border-panel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-muted tracking-widest">
            © {new Date().getFullYear()} BINARYGEN · ALL RIGHTS RESERVED
          </p>
          <p className="font-mono text-[11px] text-muted tracking-widest">
            BUILT FOR OPERATORS
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p className="font-mono text-[10px] text-muted tracking-widest mb-4">
        {title.toUpperCase()}
      </p>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-sm text-bone/70 hover:text-amber transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
