"use client";

import type { NavLink } from "@/types";

type Props = {
  link: NavLink;
  isActive: boolean;
  onClick?: () => void;
};

export function NavItem({ link, isActive, onClick }: Props) {
  return (
    <a
      href={link.href}
      onClick={onClick}
      aria-current={isActive ? "true" : undefined}
      className={`block px-4 py-2 text-sm transition-colors duration-200 ${
        isActive
          ? "text-accent border-l-2 border-accent"
          : "text-muted hover:text-foreground border-l-2 border-transparent"
      }`}
    >
      {link.label}
    </a>
  );
}
