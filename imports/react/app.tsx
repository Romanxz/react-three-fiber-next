import React, { useRef, useState } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing';
import { CameraControls, FlyControls, OrbitControls, PointerLockControls, Stats } from '@react-three/drei';
import { Effects } from './components/effects';
import { Galaxy } from './components/galaxy';

export default function R3FApp() {
  return (
    <Canvas style={{ position: 'relative', width: '100vw', height: '100vh', background: 'black' }}>
      <Galaxy
        numStars={2000}
        starMin={0.15}
        starMax={5}
        hazeMin={20.0}
        hazeMax={50.0}
        hazeOpacity={0.2}
        hazeRatio={0.5}
        coreXdist={30}
        coreYdist={30}
        thickness={7}
        outerCoreXdist={60}
        outerCoreYdist={60}
        arms={2.0}
        spiralForce={2.5}
        armXdist={60}
        armYdist={30}
        armXmean={150}
        armYmean={80}
      />
      {/* <CameraControls makeDefault /> */}
      <CameraControls />
      <axesHelper />
      <Stats />
      {/* <Effects /> */}
    </Canvas>
  );
}
