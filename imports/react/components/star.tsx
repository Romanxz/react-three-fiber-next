import React, { useRef, useState } from 'react';
import { useFrame, useThree, extend, useLoader } from '@react-three/fiber';
import { Sprite, Vector3, Color } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { clamp } from 'three/src/math/MathUtils';

// import { ColorShiftMaterial } from '../../shaders/color-shift';
// extend({ ColorShiftMaterial });

export interface IStarProps {
  position: Vector3;
  scale: number;
  color: Color;
  starMin:number;
  starMax:number;
}

export function Star({ position, scale, color, starMin, starMax }: IStarProps) {
  const texture = useLoader(TextureLoader, 'textures/sprite120.png');
  const spriteRef = useRef<Sprite>(null!);
  const { camera } = useThree();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame((state, delta) => {
    let dist = spriteRef.current.position.distanceTo(camera.position) / 200
    // update star size relative to camera position
    let starSize = dist * scale
    starSize = clamp(starSize, starMin, starMax)
    spriteRef.current.scale.copy(new Vector3(starSize, starSize, starSize))
  });

  return (
    <sprite scale={scale} ref={spriteRef} position={position}>
      <spriteMaterial attach="material" map={texture} color={color} />
    </sprite>
  );
}
