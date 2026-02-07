"use client";

import { useCallback, useEffect, useState } from "react";

const MAX_STARS = 4;

interface Twinkle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  baseOpacity: number;
  keyframes: string;
}

let twinkleIdCounter = 0;

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateKeyframes(animName: string, baseOpacity: number): string {
  const fadeInEnd = 8;
  const fadeOutStart = 92;

  const points: { pct: number; op: number }[] = [];
  const count = Math.floor(randomBetween(5, 9));

  for (let i = 0; i < count; i++) {
    points.push({
      pct: randomBetween(fadeInEnd + 1, fadeOutStart - 1),
      op: baseOpacity * randomBetween(0.55, 1),
    });
  }
  points.sort((a, b) => a.pct - b.pct);

  const steps = [
    "0% { opacity: 0 }",
    `${fadeInEnd}% { opacity: ${baseOpacity} }`,
    ...points.map(
      (p) => `${p.pct.toFixed(1)}% { opacity: ${p.op.toFixed(3)} }`,
    ),
    `${fadeOutStart}% { opacity: ${baseOpacity} }`,
    "100% { opacity: 0 }",
  ];

  return `@keyframes ${animName} { ${steps.join(" ")} }`;
}

function createTwinkle(): Twinkle {
  const id = twinkleIdCounter++;
  const baseOpacity = randomBetween(0.4, 0.7);

  return {
    id,
    x: randomBetween(0, 100),
    y: randomBetween(45, 100),
    size: randomBetween(2, 4),
    duration: randomBetween(8, 20),
    baseOpacity,
    keyframes: generateKeyframes(`twinkle-${id}`, baseOpacity),
  };
}

export function TwinklingStar() {
  const [twinkles, setTwinkles] = useState<Twinkle[]>([]);

  const spawnTwinkle = useCallback(() => {
    setTwinkles((prev) => {
      if (prev.length >= MAX_STARS) return prev;
      return [...prev, createTwinkle()];
    });
  }, []);

  const removeTwinkle = useCallback((id: number) => {
    setTwinkles((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      const delay = randomBetween(1.5, 3.5) * 1000;
      timeoutId = setTimeout(() => {
        spawnTwinkle();
        scheduleNext();
      }, delay);
    };

    timeoutId = setTimeout(() => {
      spawnTwinkle();
      scheduleNext();
    }, randomBetween(0.3, 1) * 1000);

    return () => clearTimeout(timeoutId);
  }, [spawnTwinkle]);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {twinkles.map((t) => {
        const animName = `twinkle-${t.id}`;

        return (
          <div key={t.id}>
            <style>{t.keyframes}</style>
            <div
              style={{
                position: "absolute",
                left: `${t.x}%`,
                top: `${t.y}%`,
                width: `${t.size}px`,
                height: `${t.size}px`,
                borderRadius: "50%",
                background: "rgba(255,255,255,1)",
                boxShadow:
                  "0 0 3px rgba(255,255,255,0.6), 0 0 6px rgba(88,152,185,0.3)",
                filter: "blur(0.7px)",
                animation: `${animName} ${t.duration}s ease-in-out forwards`,
              }}
              onAnimationEnd={() => removeTwinkle(t.id)}
            />
          </div>
        );
      })}
    </div>
  );
}
