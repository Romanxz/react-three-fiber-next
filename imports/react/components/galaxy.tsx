import React, { useMemo, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { v4 as uuidv4 } from 'uuid';

import { Star } from './star';
import { gaussianRandom } from '../../utils/gaussian-random';
import { starTypes } from '../../utils/star-types';
import { generateStarType } from '../../utils/generate-star-type';
import { spiral } from '../../utils/spiral';

export interface IGalaxyProps {
  numStars: number;
  starMin: number;
  starMax: number;
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

export function Galaxy(props:IGalaxyProps) {
  const {
    numStars,
    coreXdist,
    coreYdist,
    outerCoreXdist,
    outerCoreYdist,
    thickness,
    starMin,
    starMax,
    arms,
    spiralForce,
    armXdist,
    armYdist,
    armXmean,
    armYmean,
  } = props;
  const galaxyRef = useRef<THREE.Group>(null!)
  const stars = useMemo(() => {
    let stars: { position: THREE.Vector3; scale: number; color: THREE.Color }[] = [];
    // inner galaxy core
    for (let i = 0; i < numStars / 2; i++) {
      const type = generateStarType(starTypes);
      const position = new THREE.Vector3(
        gaussianRandom(0, coreXdist),
        gaussianRandom(0, coreYdist),
        gaussianRandom(0, thickness),
      );
      const scale = starTypes.size[type];
      const color = new THREE.Color(starTypes.color[type]);

      stars.push({ position, scale, color });
    }
    // outer galaxy core
    for (let i = 0; i < numStars / 4; i++) {
      const type = generateStarType(starTypes);
      const position = new THREE.Vector3(
        gaussianRandom(0, outerCoreXdist),
        gaussianRandom(0, outerCoreYdist),
        gaussianRandom(0, thickness),
      );
      const scale = starTypes.size[type];
      const color = new THREE.Color(starTypes.color[type]);

      stars.push({ position, scale, color });
    }
    // galaxy ambient core
    for (let i = 0; i < numStars / 2; i++) {
      const type = generateStarType(starTypes);
      const position = new THREE.Vector3(
        gaussianRandom(0, outerCoreXdist * 2),
        gaussianRandom(0, outerCoreYdist * 2),
        gaussianRandom(0, thickness * 2),
      );
      const scale = starTypes.size[type] / 3;
      const color = new THREE.Color(starTypes.color[type]);

      stars.push({ position, scale, color });
    }
    // galaxy spiral arms
    for (let j = 0; j < arms; j++) {
      for (let i = 0; i < numStars / 3; i++) {
        const type = generateStarType(starTypes);
        const position = spiral(
          gaussianRandom(armXmean, armXdist),
          gaussianRandom(armYmean, armYdist),
          gaussianRandom(0, thickness),
          (j * 2 * Math.PI) / arms,
          armXdist,
          spiralForce,
        );
        const scale = starTypes.size[type];
        const color = new THREE.Color(starTypes.color[type]);

        stars.push({ position, scale, color });
      }
    }

    return stars;
  }, [props]);

  useFrame((state, delta) => { if (galaxyRef.current) galaxyRef.current.rotation.z -= delta / 100 });

  return (
    <group ref={galaxyRef} rotation={new THREE.Euler(90, 0, 0)}>
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
    </group>
  );
}
