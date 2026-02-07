import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";

interface StarfieldBloomProps {
  isMobile: boolean;
}

export function StarfieldBloom({ isMobile }: StarfieldBloomProps) {
  return (
    <EffectComposer>
      <Bloom
        intensity={isMobile ? 0.3 : 0.5}
        luminanceThreshold={0.8}
        luminanceSmoothing={0.025}
        mipmapBlur
        kernelSize={isMobile ? KernelSize.SMALL : KernelSize.MEDIUM}
      />
    </EffectComposer>
  );
}
