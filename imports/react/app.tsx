
import React, { useRef, useState } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls, Stats } from "@react-three/drei";
import { Mesh } from 'three'

import { ColorShiftMaterial } from '../shaders/color-shift';
// import ColorShiftMaterial from '../shaders/color-shift-class';
extend({ ColorShiftMaterial });

function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null!)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => { if (meshRef.current) meshRef.current.rotation.x += delta })
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <colorShiftMaterial color={hovered ? 'hotpink' : 'red'} time={0.01} />
    </mesh>
  )
}

export default function R3FApp() {
  return (
    <Canvas style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <OrbitControls />
      <Stats />
    </Canvas>
  );
}