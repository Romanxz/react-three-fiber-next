import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { CameraControls, Stats } from '@react-three/drei';
import { useControls } from 'leva';
import { FX } from './components/effects';
import { GalaxyGenerator } from './components/galaxy-generator';
import { useGalaxyControls } from './hooks/use-galaxy-controls';
import { Star } from './components/star';
import { Color, Vector3 } from 'three';

export default function R3FApp() {
  const {
    numStars,
    starSizeMin,
    starSizeMax,
    hazeSizeMin,
    hazeSizeMax,
    hazeColor,
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
      camera={{ near: 0.1, far: 10000 }}
      style={{ position: 'relative', width: '100vw', height: '100vh', background: 'black' }}
    >
      <Suspense fallback={null}>
        <GalaxyGenerator
          numStars={numStars}
          starMin={starSizeMin}
          starMax={starSizeMax}
          hazeMin={hazeSizeMin}
          hazeMax={hazeSizeMax}
          hazeColor={hazeColor}
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
      {/* <Star position={new Vector3(0,0,0)} scale={1} starMin={1} starMax={1} color={new Color("#16d1ff")} /> */}
      <CameraControls />
      {/* <axesHelper /> */}
      <Stats />
      <FX />
    </Canvas>
  );
}
