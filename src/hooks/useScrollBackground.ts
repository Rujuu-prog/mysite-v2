"use client";

import { useEffect } from "react";

const sectionColors: { id: string; color: string }[] = [
  { id: "home", color: "#252525" },
  { id: "works", color: "#272727" },
  { id: "about", color: "#292929" },
  { id: "experience", color: "#2b2b2b" },
];

export function useScrollBackground() {
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibleSections = new Map<string, IntersectionObserverEntry>();

    for (const { id } of sectionColors) {
      const el = document.getElementById(id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              visibleSections.set(id, entry);
            } else {
              visibleSections.delete(id);
            }
          }

          // Find the topmost visible section
          let topmost: { id: string; top: number } | null = null;
          for (const [sectionId, entry] of visibleSections) {
            const top = entry.boundingClientRect.top;
            if (!topmost || top < topmost.top) {
              topmost = { id: sectionId, top };
            }
          }

          if (topmost) {
            const match = sectionColors.find((s) => s.id === topmost?.id);
            if (match) {
              document.body.style.backgroundColor = match.color;
            }
          }
        },
        { threshold: 0.1 },
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      for (const observer of observers) {
        observer.disconnect();
      }
    };
  }, []);
}
