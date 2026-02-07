type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  external = false,
}: Props) {
  const base =
    "inline-flex items-center gap-2 rounded px-4 py-2 text-sm font-medium transition-colors duration-200";
  const variants = {
    primary: "bg-accent text-background hover:bg-accent/80",
    secondary:
      "border border-border text-foreground hover:border-accent hover:text-accent",
  };

  return (
    <a
      href={href}
      className={`${base} ${variants[variant]}`}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}
