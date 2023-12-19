import React, { useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid';
import { EffectComposer, SelectiveBloom } from '@react-three/postprocessing';
import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing';

import { Star } from './star';
import { useStars } from '../hooks/use-stars';
import { Haze } from './haze';
import { useHaze } from '../hooks/use-haze';

export interface IGalaxyProps {
  numStars: number;
  starMin: number;
  starMax: number;
  hazeMin: number;
  hazeMax: number;
  hazeOpacity: number;
  hazeRatio: number;
  coreXdist: number;
  coreYdist: number;
  outerCoreXdist: number;
  outerCoreYdist: number;
  thickness: number;
  arms: number;
  spiralForce: number;
  armXdist: number;
  armYdist: number;
  armXmean: number;
  armYmean: number;
}

export function Galaxy(props: IGalaxyProps) {
  const galaxyRef = useRef<THREE.Group>(null!);
  const starsRef = useRef<THREE.Group>(null!);
  const lightRef = useRef<THREE.AmbientLight>(null!);
  const stars = useStars(props);
  const haze = useHaze(props);

  useFrame((state, delta) => {
    if (galaxyRef.current) galaxyRef.current.rotation.z -= delta / 100;
  });

  return (
    <group ref={galaxyRef} >
      <group ref={starsRef}>
        {stars.map((star) => (
          <Star
            key={uuidv4()}
            position={star.position}
            scale={star.scale}
            color={star.color}
            starMin={props.starMin}
            starMax={props.starMax}
          />
        ))}
      </group>
      {haze.map((haze) => (
        <Haze
          key={uuidv4()}
          position={haze.position}
          hazeMin={props.hazeMin}
          hazeMax={props.hazeMax}
          hazeOpacity={props.hazeOpacity}
        />
      ))}
      <ambientLight intensity={1} ref={lightRef} />
      {/* {starsRef.current ? <EffectComposer>
        <SelectiveBloom
          lights={[lightRef]}
          selection={starsRef.current.children}
          selectionLayer={1}
          intensity={5} // The bloom intensity.
          // blurPass={undefined} // A blur pass.
          kernelSize={KernelSize.LARGE} // blur kernel size
          luminanceThreshold={0.4} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
          mipmapBlur={false} // Enables or disables mipmap blur.
          resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
          resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
        />
      </EffectComposer> : null } */}
    </group>
  );
}
