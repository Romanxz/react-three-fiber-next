import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { CameraControls, Stats } from '@react-three/drei';
import { useControls } from 'leva';
import { FX } from './components/effects';
import { GalaxyGenerator } from './components/galaxy-generator';
import { useGalaxyControls } from './hooks/use-galaxy-controls';

export default function R3FApp() {
  const {
    numStars,
    starSizeMin,
    starSizeMax,
    hazeSizeMin,
    hazeSizeMax,
    hazeOpacity,
    hazeRatio,
    coreXdist,
    coreYdist,
    thickness,
    outerCoreXdist,
    outerCoreYdist,
    numArms,
    spiralForce,
    armXdist,
    armYdist,
    armXmean,
    armYmean,
  } = useGalaxyControls();
  return (
    <Canvas
      gl={{ logarithmicDepthBuffer: true }}
      style={{ position: 'relative', width: '100vw', height: '100vh', background: 'black' }}
    >
      <Suspense fallback={null}>
        <GalaxyGenerator
          numStars={numStars}
          starMin={starSizeMin}
          starMax={starSizeMax}
          hazeMin={hazeSizeMin}
          hazeMax={hazeSizeMax}
          hazeOpacity={hazeOpacity}
          hazeRatio={hazeRatio}
          coreXdist={coreXdist}
          coreYdist={coreYdist}
          thickness={thickness}
          outerCoreXdist={outerCoreXdist}
          outerCoreYdist={outerCoreYdist}
          arms={numArms}
          spiralForce={spiralForce}
          armXdist={armXdist}
          armYdist={armYdist}
          armXmean={armXmean}
          armYmean={armYmean}
        />
      </Suspense>
      <CameraControls />
      <axesHelper />
      <Stats />
      <FX />
    </Canvas>
  );
}
