"use client";

import { useCallback, useEffect, useRef } from "react";

const MAX_ACCUMULATED = 1200;
const DELTA_CAP = 100;

export function useOverscrollStars(enabled: boolean) {
  const accumulatedRef = useRef(0);
  const activeRef = useRef(false);

  const setProgress = useCallback((value: number) => {
    const root = document.documentElement.style;
    root.setProperty("--overscroll-progress", String(value));
    // Hint: front half 0→1, back half 1→0
    const hint = value <= 0.5 ? value * 2 : (1 - value) * 2;
    root.setProperty("--overscroll-hint", String(hint));
    // Stars: front half fixed 0, back half 0→1
    const stars = value <= 0.5 ? 0 : (value - 0.5) * 2;
    root.setProperty("--overscroll-stars", String(stars));
  }, []);

  const lockScroll = useCallback(() => {
    if (activeRef.current) return;
    activeRef.current = true;
    document.body.style.overflow = "hidden";
    document.documentElement.style.scrollBehavior = "auto";
    document.documentElement.style.overscrollBehaviorY = "none";
  }, []);

  const unlockScroll = useCallback(() => {
    if (!activeRef.current) return;
    activeRef.current = false;
    document.body.style.overflow = "";
    document.documentElement.style.scrollBehavior = "";
    document.documentElement.style.overscrollBehaviorY = "";
  }, []);

  useEffect(() => {
    if (!enabled) {
      setProgress(0);
      unlockScroll();
      return;
    }

    let touchStartY = 0;
    let isTouching = false;

    const updateProgress = () => {
      const progress = Math.min(accumulatedRef.current / MAX_ACCUMULATED, 1);
      setProgress(progress);

      if (progress > 0) {
        lockScroll();
      } else {
        unlockScroll();
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const atTop = window.scrollY <= 1;

      if (accumulatedRef.current > 0) {
        e.preventDefault();

        if (e.deltaY > 0) {
          // Scrolling down → reduce accumulated
          const delta = Math.min(Math.abs(e.deltaY), DELTA_CAP);
          accumulatedRef.current = Math.max(accumulatedRef.current - delta, 0);
        } else {
          // Scrolling up → increase accumulated
          const delta = Math.min(Math.abs(e.deltaY), DELTA_CAP);
          accumulatedRef.current = Math.min(
            accumulatedRef.current + delta,
            MAX_ACCUMULATED,
          );
        }

        updateProgress();
        return;
      }

      // Only start overscroll from top
      if (atTop && e.deltaY < 0) {
        e.preventDefault();
        const delta = Math.min(Math.abs(e.deltaY), DELTA_CAP);
        accumulatedRef.current = Math.min(
          accumulatedRef.current + delta,
          MAX_ACCUMULATED,
        );
        updateProgress();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      isTouching = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouching) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY; // positive = scroll down, negative = scroll up
      touchStartY = touchY;

      const atTop = window.scrollY <= 1;

      if (accumulatedRef.current > 0) {
        e.preventDefault();

        if (deltaY > 0) {
          // Finger moving up (scroll down) → reduce accumulated
          const delta = Math.min(Math.abs(deltaY), DELTA_CAP);
          accumulatedRef.current = Math.max(accumulatedRef.current - delta, 0);
        } else {
          // Finger moving down (scroll up) → increase accumulated
          const delta = Math.min(Math.abs(deltaY), DELTA_CAP);
          accumulatedRef.current = Math.min(
            accumulatedRef.current + delta,
            MAX_ACCUMULATED,
          );
        }

        updateProgress();
        return;
      }

      if (atTop && deltaY < 0) {
        e.preventDefault();
        const delta = Math.min(Math.abs(deltaY), DELTA_CAP);
        accumulatedRef.current = Math.min(
          accumulatedRef.current + delta,
          MAX_ACCUMULATED,
        );
        updateProgress();
      }
    };

    const handleTouchEnd = () => {
      isTouching = false;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      setProgress(0);
      unlockScroll();
    };
  }, [enabled, setProgress, lockScroll, unlockScroll]);
}
