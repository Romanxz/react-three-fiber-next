import React, { useMemo } from 'react';
import * as THREE from 'three';
import { gaussianRandom } from '../../utils/gaussian-random';
import { starTypes } from '../../utils/star-types';
import { generateStarType } from '../../utils/generate-star-type';
import { spiral } from '../../utils/spiral';

export interface IUseStarsProps {
  numStars: number;
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


export function useStars(starProps:IUseStarsProps) {
  const {
    numStars,
    coreXdist,
    coreYdist,
    outerCoreXdist,
    outerCoreYdist,
    thickness,
    arms,
    spiralForce,
    armXdist,
    armYdist,
    armXmean,
    armYmean,
  } = starProps;
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
  }, [starProps]);
  return stars;
}
