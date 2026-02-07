"use no memo";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  type Points,
  ShaderMaterial,
} from "three";

const STAR_COLORS = [
  new Color("#ffffff"),
  new Color("#b0d4f1"),
  new Color("#f5f0d0"),
  new Color("#c8d8ff"),
  new Color("#fff0e6"),
];

const vertexShader = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aTwinkleSpeed;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vColor = aColor;
    vTwinkle = 0.5 + 0.5 * sin(uTime * aTwinkleSpeed + aPhase);

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio * (200.0 / -mvPosition.z);
    gl_PointSize = max(gl_PointSize, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vTwinkle;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);

    // Gaussian glow
    float glow = exp(-d * d * 8.0);
    // Bright core for HDR / Bloom pickup
    float core = exp(-d * d * 40.0);

    float alpha = glow * vTwinkle;
    vec3 color = vColor * (glow + core * 2.0);

    gl_FragColor = vec4(color, alpha);
  }
`;

interface TwinklingStars3DProps {
  count: number;
  radiusMin: number;
  radiusMax: number;
  rotationSpeed: number;
}

function mulberry32(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    const t2 = Math.imul(s ^ (s >>> 15), 1 | s);
    const t3 = (t2 + Math.imul(t2 ^ (t2 >>> 7), 61 | t2)) ^ t2;
    return ((t3 ^ (t3 >>> 14)) >>> 0) / 4294967296;
  };
}

export function TwinklingStars3D({
  count,
  radiusMin,
  radiusMax,
  rotationSpeed,
}: TwinklingStars3DProps) {
  const pointsRef = useRef<Points>(null);
  const materialRef = useRef<ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const rng = mulberry32(count * 137 + 42);
    const geo = new BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const twinkleSpeeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      const r = radiusMin + rng() * (radiusMax - radiusMin);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = 0.3 + rng() * 1.2;
      phases[i] = rng() * Math.PI * 2;
      twinkleSpeeds[i] = 0.5 + rng() * 2.5;

      const color = STAR_COLORS[Math.floor(rng() * STAR_COLORS.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geo.setAttribute("position", new BufferAttribute(positions, 3));
    geo.setAttribute("aSize", new BufferAttribute(sizes, 1));
    geo.setAttribute("aPhase", new BufferAttribute(phases, 1));
    geo.setAttribute("aTwinkleSpeed", new BufferAttribute(twinkleSpeeds, 1));
    geo.setAttribute("aColor", new BufferAttribute(colors, 3));

    return geo;
  }, [count, radiusMin, radiusMax]);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uPixelRatio: {
            value:
              typeof window !== "undefined"
                ? Math.min(window.devicePixelRatio, 1.5)
                : 1,
          },
        },
        transparent: true,
        blending: AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      }),
    [],
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * rotationSpeed * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <primitive object={geometry} attach="geometry" />
      <primitive object={material} ref={materialRef} attach="material" />
    </points>
  );
}
