"use no memo";

import { Cloud, Clouds } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { type Group, MeshBasicMaterial } from "three";

interface NightClouds3DProps {
  isMobile: boolean;
}

export function NightClouds3D({ isMobile }: NightClouds3DProps) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.003;
      groupRef.current.rotation.x += delta * 0.001;
    }
  });

  if (isMobile) return null;

  return (
    <group ref={groupRef}>
      <Clouds material={MeshBasicMaterial} limit={100}>
        <Cloud
          seed={1}
          segments={20}
          bounds={[40, 8, 40]}
          volume={15}
          opacity={0.03}
          color="#1a1a3a"
          fade={80}
          position={[0, 15, -20]}
          speed={0.1}
        />
        <Cloud
          seed={42}
          segments={15}
          bounds={[35, 6, 35]}
          volume={12}
          opacity={0.025}
          color="#1a1a3a"
          fade={80}
          position={[-10, -10, -15]}
          speed={0.08}
        />
        <Cloud
          seed={99}
          segments={15}
          bounds={[30, 5, 30]}
          volume={10}
          opacity={0.04}
          color="#151530"
          fade={80}
          position={[15, 5, -25]}
          speed={0.12}
        />
      </Clouds>
    </group>
  );
}
