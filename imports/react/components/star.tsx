import React, { useRef, useState } from 'react';
import { useFrame, useThree, extend, useLoader } from '@react-three/fiber';
import { Sprite, Vector3, Color, Mesh } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { clamp } from '../../utils/clamp';

import { StarMeshMaterial } from '../../shaders/star-shader/starmesh-material';
import { OCCLUSION_LAYER } from './effects';
extend({ StarMeshMaterial });

export interface IStarProps {
  position: Vector3;
  scale: number;
  color: Color;
  starMin: number;
  starMax: number;
}

export function Star({ position, scale, color, starMin, starMax }: IStarProps) {
  const texture = useLoader(TextureLoader, `${process.env.GH_PAGES_PATH_PREFIX || ""}textures/sprite120.png`);
  const starSpriteRef = useRef<Sprite>(null!);
  const starMeshRef = useRef<Mesh>(null!);
  const { camera } = useThree();

  const [hovered, setHover] = useState(false);
  const [isMesh, setMesh] = useState(false);

  useFrame((state, delta) => {
    let distanceToCamera = starSpriteRef.current.getWorldPosition(new Vector3()).distanceTo(camera.position);
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
      <mesh layers={OCCLUSION_LAYER} scale={scale} ref={starMeshRef} position={position} visible={isMesh}>
        <sphereGeometry />
        <meshStandardMaterial emissive={color} emissiveIntensity={2} color={color} toneMapped={false} />
      </mesh>
      <sprite layers={OCCLUSION_LAYER} scale={scale} ref={starSpriteRef} position={position} visible={!isMesh}>
        <spriteMaterial map={texture} color={color} toneMapped={false} />
      </sprite>
    </>
  );
}
