"use client";

import { motion, useAnimationControls } from "motion/react";
import { useEffect, useRef } from "react";

import { siteConfig } from "@/data/site";
import { fadeIn, slideUp } from "@/lib/animations";

type Props = {
  hasReachedBottom: boolean;
};

export function HomeSection({ hasReachedBottom }: Props) {
  const controls = useAnimationControls();
  const hasAnimated = useRef(false);

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <section
      id="home"
      className="flex min-h-screen flex-col items-start justify-center px-6 py-24 md:px-12"
    >
      <motion.div variants={fadeIn} initial="hidden" animate="visible">
        <motion.h1
          variants={slideUp}
          initial="hidden"
          animate={controls}
          onViewportEnter={() => {
            if (hasReachedBottom && !hasAnimated.current) {
              hasAnimated.current = true;
              controls.start({
                scale: [1, 1.02, 1],
                opacity: [1, 0.85, 1],
                transition: { duration: 0.6, ease: "easeInOut" },
              });
            }
          }}
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
    </section>
  );
}
