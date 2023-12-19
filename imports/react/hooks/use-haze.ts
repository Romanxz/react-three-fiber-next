import React, { useMemo } from 'react';
import * as THREE from 'three';
import { gaussianRandom } from '../../utils/gaussian-random';
import { starTypes } from '../../utils/star-types';
import { generateStarType } from '../../utils/generate-star-type';
import { spiral } from '../../utils/spiral';
import { clamp } from '../../utils/clamp';

export interface IUseHazeProps {
  numStars: number;
  hazeMin: number;
  hazeMax: number;
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

export function useHaze(hazeProps: IUseHazeProps) {
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
  } = hazeProps;
  const haze = useMemo(() => {
    let haze: { position: THREE.Vector3 }[] = [];
    // inner galaxy core
    for (let i = 0; i < numStars / 2; i++) {
      const position = new THREE.Vector3(
        gaussianRandom(0, coreXdist),
        gaussianRandom(0, coreYdist),
        gaussianRandom(0, thickness),
      );
      haze.push({ position });
    }
    // outer galaxy core
    for (let i = 0; i < numStars / 3; i++) {
      const position = new THREE.Vector3(
        gaussianRandom(0, outerCoreXdist),
        gaussianRandom(0, outerCoreYdist),
        gaussianRandom(0, thickness),
      );
      haze.push({ position });
    }
    // galaxy spiral arms
    for (let j = 0; j < arms; j++) {
      for (let i = 0; i < numStars / 3; i++) {
        const position = spiral(
          gaussianRandom(armXmean, armXdist),
          gaussianRandom(armYmean, armYdist),
          gaussianRandom(0, thickness),
          (j * 2 * Math.PI) / arms,
          armXdist,
          spiralForce,
        );
        haze.push({ position });
      }
    }

    return haze;
  }, [hazeProps]);
  return haze;
}
