"use client";

import type { Variants } from "motion/react";
import { motion } from "motion/react";

type Props = {
  children: string;
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" as const, delay: i * 0.03 },
  }),
};

export function SectionHeading({ children }: Props) {
  const chars = children.split("");

  return (
    <motion.h2
      className="mb-8 text-foreground"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={`${i}-${char}`}
          custom={i}
          variants={charVariants}
          className="inline-block"
          style={char === " " ? { width: "0.25em" } : undefined}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h2>
  );
}
