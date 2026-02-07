"use client";
"use no memo";

import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { NightClouds3D } from "./NightClouds3D";
import { ShootingStars3D } from "./ShootingStars3D";
import { StarfieldBloom } from "./StarfieldBloom";
import { TwinklingStars3D } from "./TwinklingStars3D";

export default function StarfieldCanvas() {
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  }, []);

  const starConfig = useMemo(
    () =>
      isMobile
        ? {
            far: { count: 800, radiusMin: 50, radiusMax: 130, speed: 0.02 },
            mid: { count: 300, radiusMin: 30, radiusMax: 80, speed: 0.04 },
            near: { count: 50, radiusMin: 15, radiusMax: 45, speed: 0.06 },
          }
        : {
            far: { count: 2000, radiusMin: 50, radiusMax: 130, speed: 0.02 },
            mid: { count: 800, radiusMin: 30, radiusMax: 80, speed: 0.04 },
            near: { count: 150, radiusMin: 15, radiusMax: 45, speed: 0.06 },
          },
    [isMobile],
  );

  return (
    <Canvas
      gl={{ antialias: false, alpha: true }}
      dpr={[1, isMobile ? 1 : 1.5]}
      camera={{ position: [0, 0, 0], fov: 75, near: 0.1, far: 200 }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <TwinklingStars3D
          count={starConfig.far.count}
          radiusMin={starConfig.far.radiusMin}
          radiusMax={starConfig.far.radiusMax}
          rotationSpeed={starConfig.far.speed}
        />
        <TwinklingStars3D
          count={starConfig.mid.count}
          radiusMin={starConfig.mid.radiusMin}
          radiusMax={starConfig.mid.radiusMax}
          rotationSpeed={starConfig.mid.speed}
        />
        <TwinklingStars3D
          count={starConfig.near.count}
          radiusMin={starConfig.near.radiusMin}
          radiusMax={starConfig.near.radiusMax}
          rotationSpeed={starConfig.near.speed}
        />
        <NightClouds3D isMobile={isMobile} />
        <ShootingStars3D />
        <StarfieldBloom isMobile={isMobile} />
      </Suspense>
    </Canvas>
  );
}
