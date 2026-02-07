"use client";

import { motion } from "motion/react";
import { slideUp } from "@/lib/animations";

type Props = {
  children: React.ReactNode;
};

export function SectionHeading({ children }: Props) {
  return (
    <motion.h2
      className="mb-8 text-foreground"
      variants={slideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.h2>
  );
}
