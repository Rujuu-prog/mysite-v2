"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const StarfieldCanvas = dynamic(
  () => import("@/components/three/StarfieldCanvas"),
  { ssr: false },
);

export function StarfieldOverlay() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (shouldMount) return;

    let rafId: number;
    const check = () => {
      const val = getComputedStyle(document.documentElement)
        .getPropertyValue("--overscroll-stars")
        .trim();
      if (Number.parseFloat(val) > 0) {
        setShouldMount(true);
        return;
      }
      rafId = requestAnimationFrame(check);
    };
    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, [shouldMount]);

  return (
    <div
      className="pointer-events-none fixed inset-0"
      style={{ zIndex: 55 }}
      aria-hidden="true"
    >
      {/* Blur layer — blurs underlying content */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(calc(var(--overscroll-stars, 0) * 16px))",
          WebkitBackdropFilter: "blur(calc(var(--overscroll-stars, 0) * 16px))",
          opacity: "var(--overscroll-stars, 0)",
        }}
      />

      {/* Dark sky layer */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#08081a",
          opacity: "calc(var(--overscroll-stars, 0) * 0.95)",
        }}
      />

      {/* Star container */}
      <div
        className="absolute inset-0"
        style={{
          opacity: "var(--overscroll-stars, 0)",
        }}
      >
        {/* Nebula glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 40% 30% at 30% 40%, rgba(88,152,185,0.06) 0%, transparent 70%), radial-gradient(ellipse 30% 40% at 70% 60%, rgba(230,22,69,0.03) 0%, transparent 70%)",
          }}
        />

        {/* Three.js starfield (lazy-mounted on first overscroll) */}
        {shouldMount && <StarfieldCanvas />}
      </div>
    </div>
  );
}
