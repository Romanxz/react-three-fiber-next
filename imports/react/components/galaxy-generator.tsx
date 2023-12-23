import React from 'react';

import { useStars } from '../hooks/use-stars';
import { useHaze } from '../hooks/use-haze';
import { Galaxy } from './galaxy';
import { useThree } from '@react-three/fiber';

export interface IGalaxyGeneratorProps {
  numStars: number;
  starMin: number;
  starMax: number;
  hazeMin: number;
  hazeMax: number;
  hazeColor: number | string;
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

export function GalaxyGenerator(props: IGalaxyGeneratorProps) {
  const { starMin, starMax, hazeMin, hazeMax, hazeOpacity, hazeColor } = props;
  const stars = useStars(props);
  const haze = useHaze(props);

  return (
    <>
      <Galaxy
        stars={stars}
        haze={haze}
        starMin={starMin}
        starMax={starMax}
        hazeMin={hazeMin}
        hazeMax={hazeMax}
        hazeColor={hazeColor}
        hazeOpacity={hazeOpacity}
      />
    </>
  );
}
