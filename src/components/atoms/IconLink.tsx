type Props = {
  href: string;
  label: string;
  children: React.ReactNode;
};

export function IconLink({ href, label, children }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-muted transition-colors duration-200 hover:text-accent"
    >
      {children}
    </a>
  );
}
