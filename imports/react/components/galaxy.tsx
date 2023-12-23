import React, { useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Select } from '@react-three/postprocessing';
import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid';

import { Star } from './star';
import { Haze } from './haze';
import { DEFAULT_LAYER, OCCLUSION_LAYER } from './effects';

export interface IGalaxyProps {
  stars: { position: THREE.Vector3; scale: number; color: THREE.Color }[];
  haze: { position: THREE.Vector3 }[];
  starMin: number;
  starMax: number;
  hazeMin: number;
  hazeMax: number;
  hazeOpacity: number;
}

export function Galaxy({ stars, haze, starMin, starMax, hazeMin, hazeMax, hazeOpacity }: IGalaxyProps) {
  const galaxyRef = useRef<THREE.Group>(null!);
  const starsRef = useRef<THREE.Group>(null!);
  const lightRef = useRef<THREE.AmbientLight>(null!);

  useFrame((state, delta) => {
    if (galaxyRef.current) galaxyRef.current.rotation.z -= delta / 100;
  });

  return (
    <group ref={galaxyRef}>
      <Select enabled>
        {stars.map((star) => (
          <Star
            key={uuidv4()}
            position={star.position}
            scale={star.scale}
            color={star.color}
            starMin={starMin}
            starMax={starMax}
          />
        ))}
      </Select>
      <group>
        {haze.map((haze) => (
          <Haze key={uuidv4()} position={haze.position} hazeMin={hazeMin} hazeMax={hazeMax} hazeOpacity={hazeOpacity} />
        ))}
      </group>
    </group>
  );
}
