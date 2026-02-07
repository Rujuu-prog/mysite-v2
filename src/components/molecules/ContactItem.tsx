type Props = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

export function ContactItem({ href, icon, label }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-muted transition-colors duration-200 hover:text-accent"
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        {icon}
      </span>
      <span className="text-sm">{label}</span>
    </a>
  );
}
