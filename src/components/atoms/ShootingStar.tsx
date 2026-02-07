"use client";

import { useCallback, useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  angle: number;
  length: number;
  duration: number;
  curvature: number;
}

let starIdCounter = 0;

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function createStar(): Star {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const diagonal = Math.sqrt(vw * vw + vh * vh);

  const angle = randomBetween(42, 48);
  const length = diagonal * randomBetween(0.12, 0.22);
  const duration = randomBetween(0.6, 2.5);
  const curvature = randomBetween(-0.04, 0.04);

  // Start from top edge or left edge (outside viewport)
  // Stars move from upper-left to lower-right
  const fromTop = Math.random() > 0.4;
  let x: number;
  let y: number;

  if (fromTop) {
    x = randomBetween(0, 70);
    y = (-length / vh) * 100;
  } else {
    x = (-length / vw) * 100;
    y = randomBetween(-10, 50);
  }

  return {
    id: starIdCounter++,
    x,
    y,
    angle,
    length,
    duration,
    curvature,
  };
}

export function ShootingStar() {
  const [stars, setStars] = useState<Star[]>([]);

  const spawnStars = useCallback(() => {
    setStars((prev) => {
      const available = 3 - prev.length;
      if (available <= 0) return prev;

      const count = Math.min(Math.floor(randomBetween(1, 4)), available);
      const newStars: Star[] = [];
      for (let i = 0; i < count; i++) {
        newStars.push(createStar());
      }
      return [...prev, ...newStars];
    });
  }, []);

  const removeStar = useCallback((id: number) => {
    setStars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      const delay = randomBetween(8, 15) * 1000;
      timeoutId = setTimeout(() => {
        spawnStars();
        scheduleNext();
      }, delay);
    };

    // Initial spawn after a short delay
    timeoutId = setTimeout(() => {
      spawnStars();
      scheduleNext();
    }, randomBetween(3, 6) * 1000);

    return () => clearTimeout(timeoutId);
  }, [spawnStars]);

  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {stars.map((star) => {
        const vw = typeof window !== "undefined" ? window.innerWidth : 1920;
        const vh = typeof window !== "undefined" ? window.innerHeight : 1080;
        const diagonal = Math.sqrt(vw * vw + vh * vh);
        const rad = (star.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * diagonal;
        const ty = Math.sin(rad) * diagonal;

        const perpX = -Math.sin(rad) * diagonal * star.curvature;
        const perpY = Math.cos(rad) * diagonal * star.curvature;
        const cpx = tx / 2 + perpX;
        const cpy = ty / 2 + perpY;
        const pathD = `M 0,0 Q ${cpx},${cpy} ${tx},${ty}`;

        return (
          <div
            key={star.id}
            style={{
              position: "absolute",
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.length}px`,
              height: "1px",
              offsetPath: `path('${pathD}')`,
              offsetRotate: "auto",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.6) 80%, #fff 100%)",
              boxShadow:
                "0 0 4px rgba(255,255,255,0.4), 0 0 8px rgba(88,152,185,0.3)",
              borderRadius: "1px",
              animation: `shootingStar ${star.duration}s linear forwards`,
            }}
            onAnimationEnd={() => removeStar(star.id)}
          />
        );
      })}
      <style>{`
        @keyframes shootingStar {
          0% {
            opacity: 0;
            offset-distance: 0%;
          }
          5% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            offset-distance: 100%;
          }
        }
      `}</style>
    </div>
  );
}
