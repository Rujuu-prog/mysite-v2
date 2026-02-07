"use no memo";

import { Trail } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import {
  Color,
  type Group,
  type Mesh,
  type MeshBasicMaterial,
  Vector3,
} from "three";

const HDR_WHITE = new Color(3, 3, 3);

interface ShootingStar {
  id: number;
  start: Vector3;
  end: Vector3;
  lifetime: number;
  elapsed: number;
}

function randomOnUpperSphere(radius: number, rng: () => number): Vector3 {
  const theta = rng() * Math.PI * 2;
  const phi = rng() * Math.PI * 0.5;
  return new Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

let idCounter = 0;

function ShootingStarMesh({
  star,
  onComplete,
}: {
  star: ShootingStar;
  onComplete: (id: number) => void;
}) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshBasicMaterial>(null);
  const pos = useRef(new Vector3());
  const completedRef = useRef(false);

  useFrame((_, delta) => {
    if (!meshRef.current || completedRef.current) return;

    star.elapsed += delta;
    const t = Math.min(star.elapsed / star.lifetime, 1);

    pos.current.lerpVectors(star.start, star.end, t);
    meshRef.current.position.copy(pos.current);

    // Fade in/out — update material directly via ref
    const fadeIn = Math.min(t * 5, 1);
    const fadeOut = Math.max(1 - (t - 0.7) / 0.3, 0);
    const opacity = fadeIn * (t > 0.7 ? fadeOut : 1);

    if (materialRef.current) {
      materialRef.current.opacity = opacity;
    }

    if (t >= 1) {
      completedRef.current = true;
      onComplete(star.id);
    }
  });

  return (
    <Trail
      width={0.3}
      length={6}
      decay={1.5}
      color={HDR_WHITE}
      attenuation={(w) => w * w}
    >
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.1, 6, 6]} />
        <meshBasicMaterial
          ref={materialRef}
          color={HDR_WHITE}
          toneMapped={false}
          transparent
          opacity={1}
        />
      </mesh>
    </Trail>
  );
}

export function ShootingStars3D() {
  const [stars, setStars] = useState<ShootingStar[]>([]);
  const timerRef = useRef(0);
  const nextSpawnRef = useRef(4 + Math.random() * 6);
  const groupRef = useRef<Group>(null);

  const handleComplete = useCallback((id: number) => {
    setStars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  useFrame((_, delta) => {
    timerRef.current += delta;

    if (timerRef.current >= nextSpawnRef.current && stars.length < 2) {
      const rng = () => Math.random();
      const start = randomOnUpperSphere(80, rng);
      const direction = start
        .clone()
        .negate()
        .normalize()
        .multiplyScalar(40 + rng() * 30);
      direction.x += (rng() - 0.5) * 20;
      direction.y += (rng() - 0.5) * 10;
      direction.z += (rng() - 0.5) * 20;

      const end = start.clone().add(direction);

      const newStar: ShootingStar = {
        id: idCounter++,
        start,
        end,
        lifetime: 0.8 + rng() * 0.7,
        elapsed: 0,
      };

      setStars((prev) => [...prev, newStar]);
      timerRef.current = 0;
      nextSpawnRef.current = 4 + Math.random() * 6;
    }
  });

  return (
    <group ref={groupRef}>
      {stars.map((star) => (
        <ShootingStarMesh
          key={star.id}
          star={star}
          onComplete={handleComplete}
        />
      ))}
    </group>
  );
}
