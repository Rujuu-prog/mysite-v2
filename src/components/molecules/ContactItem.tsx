"use client";

import { motion } from "motion/react";

type Props = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

export function ContactItem({ href, icon, label }: Props) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex cursor-alias items-center gap-3 text-muted transition-colors duration-200 hover:text-accent"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <motion.span
        className="flex h-5 w-5 shrink-0 items-center justify-center"
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2 }}
      >
        {icon}
      </motion.span>
      <span className="text-sm">{label}</span>
    </motion.a>
  );
}
