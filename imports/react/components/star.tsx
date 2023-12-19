import React, { useRef, useState } from 'react';
import { useFrame, useThree, extend, useLoader } from '@react-three/fiber';
import { Sprite, Vector3, Color, Mesh } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { clamp } from '../../utils/clamp';

// import { ColorShiftMaterial } from '../../shaders/color-shift';
// extend({ ColorShiftMaterial });

export interface IStarProps {
  position: Vector3;
  scale: number;
  color: Color;
  starMin: number;
  starMax: number;
}

export function Star({ position, scale, color, starMin, starMax }: IStarProps) {
  const texture = useLoader(TextureLoader, 'textures/sprite120.png');
  const starSpriteRef = useRef<Sprite>(null!);
  const starMeshRef = useRef<Mesh>(null!);
  const { camera } = useThree();

  const [hovered, setHover] = useState(false);
  const [isMesh, setMesh] = useState(false);

  useFrame((state, delta) => {
    let distanceToCamera = starSpriteRef.current.position.distanceTo(camera.position);
    // update star size relative to camera position
    let starSize = (distanceToCamera / 250) * scale;
    starSize = clamp(starSize, starMin, starMax);
    if (isMesh) {
      starMeshRef.current.scale.copy(new Vector3(starSize, starSize, starSize));
    } else {
      starSpriteRef.current.scale.copy(new Vector3(starSize, starSize, starSize));
    }
    if (distanceToCamera < 30) {
      setMesh(true);
    } else setMesh(false);
  });

  return (
    <>
      <mesh scale={scale} ref={starMeshRef} position={position} visible={isMesh}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
      <sprite scale={scale} ref={starSpriteRef} position={position} visible={!isMesh}>
        <spriteMaterial attach="material" map={texture} color={color} />
      </sprite>
    </>
  );
}
