"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { loaderText } from "@/lib/animations";

const NOISE_UPDATE_INTERVAL = 125; // ~8FPS

type PageLoaderProps = {
  isLoading: boolean;
};

export function PageLoader({ isLoading }: PageLoaderProps) {
  const [seed, setSeed] = useState(1);
  const rafRef = useRef<number>(0);
  const lastUpdateRef = useRef<number>(0);

  const animate = useCallback((timestamp: number) => {
    if (timestamp - lastUpdateRef.current >= NOISE_UPDATE_INTERVAL) {
      setSeed(Math.floor(Math.random() * 1000));
      lastUpdateRef.current = timestamp;
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isLoading, animate]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeIn" } }}
        >
          <svg aria-hidden="true" className="absolute h-0 w-0">
            <filter id="noise-filter">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.85"
                numOctaves={5}
                seed={seed}
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </svg>
          <div
            className="pointer-events-none absolute inset-0"
            style={{ filter: "url(#noise-filter)", opacity: 0.12 }}
          />
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
