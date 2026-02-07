"use client";

import { useSyncExternalStore } from "react";

type NormalizedPosition = {
  x: number;
  y: number;
};

const defaultPosition: NormalizedPosition = { x: 0, y: 0 };

let currentPosition: NormalizedPosition = defaultPosition;
let rafId = 0;
const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void): () => void {
  if (listeners.size === 0) {
    window.addEventListener("mousemove", handleMouseMove);
  }
  listeners.add(onStoreChange);

  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0) {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
  };
}

function handleMouseMove(e: MouseEvent) {
  const x = (e.clientX / window.innerWidth) * 2 - 1;
  const y = (e.clientY / window.innerHeight) * 2 - 1;

  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    currentPosition = { x, y };
    for (const listener of listeners) listener();
    rafId = 0;
  });
}

function getSnapshot(): NormalizedPosition {
  return currentPosition;
}

function getServerSnapshot(): NormalizedPosition {
  return defaultPosition;
}

export function useMousePosition(): NormalizedPosition {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
