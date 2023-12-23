import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree, extend, useLoader } from '@react-three/fiber';
import { Sprite, Vector3, Color } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { clamp } from 'three/src/math/MathUtils';
import { DEFAULT_LAYER } from './effects';

// import { ColorShiftMaterial } from '../../shaders/color-shift';
// extend({ ColorShiftMaterial });

export interface IHazeProps {
  position: Vector3;
  hazeOpacity: number;
  hazeMin:number;
  hazeMax:number;
  hazeColor: number | string;
}

export function Haze({ position, hazeMin, hazeMax, hazeOpacity, hazeColor }: IHazeProps) {
  const texture = useLoader(TextureLoader, `${process.env.GH_PAGES_PATH_PREFIX || ""}textures/feathered60.png`);
  const spriteRef = useRef<Sprite>(null!);
  const { camera } = useThree();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(()=>{
    spriteRef.current.scale.multiplyScalar(clamp(hazeMax * Math.random(), hazeMin, hazeMax));
  }, [hazeMin, hazeMax])

  useFrame((state, delta) => {
    let dist = spriteRef.current.position.distanceTo(camera.position) / 150;
    // update haze opacity relative to camera position
    spriteRef.current.material.opacity = clamp(hazeOpacity * Math.pow(dist / 2.5, 1.5), 0, hazeOpacity);
  });

  return (
    <sprite layers={DEFAULT_LAYER} ref={spriteRef} position={position}>
      <spriteMaterial
        map={texture}
        color={new Color(hazeColor)}
        depthTest={false}
        depthWrite={false}
      />
    </sprite>
  );
}
