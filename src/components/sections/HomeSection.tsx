"use client";

import { motion } from "motion/react";
import { ScrollHint } from "@/components/atoms/ScrollHint";
import { siteConfig } from "@/data/site";
import { fadeIn, slideUp } from "@/lib/animations";

export function HomeSection() {
  return (
    <section
      id="home"
      className="flex min-h-screen flex-col items-start justify-center px-6 py-24 md:px-12"
    >
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <motion.h1
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="text-foreground"
        >
          {siteConfig.heroMessage}
        </motion.h1>
        <motion.p
          variants={slideUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="mt-2 text-lg text-muted"
        >
          {siteConfig.heroSubMessage}
        </motion.p>
      </motion.div>
      <ScrollHint />
    </section>
  );
}
