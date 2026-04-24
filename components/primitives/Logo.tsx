import Link from "next/link";

type Props = {
  variant?: "mark" | "full";
  className?: string;
  href?: string;
};

const LOGO_SRC = "/BGR.png";

export function Logo({ variant = "mark", className = "", href = "#top" }: Props) {
  const content = LOGO_SRC ? (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={LOGO_SRC}
      alt="BinaryGen"
      className={variant === "full" ? "h-8 w-auto" : "h-7 w-auto"}
    />
  ) : (
    <span className="font-mono text-sm tracking-widest text-bone">
      BGR<span className="text-amber">.</span>
    </span>
  );

  return (
    <Link
      href={href}
      className={`inline-flex items-center hover:opacity-80 transition-opacity ${className}`}
      aria-label="BinaryGen home"
    >
      {content}
    </Link>
  );
}
