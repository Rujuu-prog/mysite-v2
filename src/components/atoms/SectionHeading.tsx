"use client";

import type { Variants } from "motion/react";
import { motion } from "motion/react";
import { useMousePosition } from "@/hooks/useMousePosition";

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
  const { x, y } = useMousePosition();

  const shadowX = x * 1;
  const shadowY = y * 1;
  const textShadow = `${shadowX}px ${shadowY}px 2px rgba(230, 22, 69, 0.06)`;

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
          style={{
            ...(char === " " ? { width: "0.25em" } : undefined),
            textShadow,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.h2>
  );
}
