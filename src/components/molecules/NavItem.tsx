"use client";

import { motion } from "motion/react";
import type { NavLink } from "@/types";

type Props = {
  link: NavLink;
  isActive: boolean;
  onClick?: () => void;
  enableLayoutAnimation?: boolean;
};

export function NavItem({
  link,
  isActive,
  onClick,
  enableLayoutAnimation = false,
}: Props) {
  return (
    <a
      href={link.href}
      onClick={onClick}
      aria-current={isActive ? "true" : undefined}
      className={`relative block px-4 py-2 text-sm transition-colors duration-200 ${
        isActive ? "text-accent" : "text-muted hover:text-foreground"
      }`}
    >
      {isActive && enableLayoutAnimation ? (
        <motion.span
          layoutId="sidebar-indicator"
          className="absolute left-0 top-0 h-full w-0.5 bg-accent"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      ) : (
        <span
          className={`absolute left-0 top-0 h-full w-0.5 ${
            isActive ? "bg-accent" : "bg-transparent"
          }`}
        />
      )}
      {link.label}
    </a>
  );
}
