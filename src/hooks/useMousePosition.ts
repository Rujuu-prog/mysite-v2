"use client";

import { useEffect, useState } from "react";

type NormalizedPosition = {
  x: number;
  y: number;
};

export function useMousePosition(): NormalizedPosition {
  const [position, setPosition] = useState<NormalizedPosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}
