"use client";

import { motion } from "motion/react";

type Props = {
  href: string;
  label: string;
  children: React.ReactNode;
};

export function IconLink({ href, label, children }: Props) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-muted transition-colors duration-200 hover:text-accent"
      whileHover={{ y: -2, scale: 1.1 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.a>
  );
}
