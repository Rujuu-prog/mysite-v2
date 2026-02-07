"use client";

import { AnimatePresence, motion } from "motion/react";
import { loaderText } from "@/lib/animations";

type PageLoaderProps = {
  isLoading: boolean;
};

export function PageLoader({ isLoading }: PageLoaderProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeIn" } }}
        >
          <motion.p
            className="text-2xl font-bold text-foreground"
            variants={loaderText}
            initial="hidden"
            animate="visible"
          >
            rujuu.com
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
