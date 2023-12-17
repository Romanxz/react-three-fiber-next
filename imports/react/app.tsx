import React, { useRef, useState } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls, Stats } from '@react-three/drei';
import { Effects } from './components/effects';
import { Galaxy } from './components/galaxy';

export default function R3FApp() {
  return (
    <Canvas style={{ position: 'relative', width: '100vw', height: '100vh', background: 'black' }}>
      <Galaxy 
        numStars={1000} 
        starMin={0.25} 
        starMax={5} 
        coreXdist={30} 
        coreYdist={30} 
        thickness={5}
        outerCoreXdist={60}
        outerCoreYdist={60} 
        arms={2.0}
        spiralForce={2.5}
        armXdist={60}
        armYdist={30}
        armXmean={150}
        armYmean={80}
      />
      <OrbitControls />
      <axesHelper />
      <Stats />
      <Effects />
    </Canvas>
  );
}
