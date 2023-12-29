import React, { useRef, useState } from 'react';
import { useFrame, useThree, extend, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { clamp } from '../../utils/clamp';

import { StarMeshMaterial } from '../../shaders/star-shader/starmesh-material';
import { DEFAULT_LAYER, OCCLUSION_LAYER } from './effects';

extend({ StarMeshMaterial });

export interface IStarProps {
  position: THREE.Vector3;
  scale: number;
  color: THREE.Color;
  starMin: number;
  starMax: number;
}

export function Star({ position, scale, color, starMin, starMax }: IStarProps) {
  const texture = useLoader(TextureLoader, `${process.env.GH_PAGES_PATH_PREFIX || ""}textures/sprite120.png`);
  const starSpriteRef = useRef<THREE.Sprite>(null!);
  const starMeshRef = useRef<THREE.Mesh>(null!);
  const { clock, camera } = useThree();

  const [hovered, setHover] = useState(false);
  const [isMesh, setMesh] = useState(true);

  useFrame((state, delta) => {
    let distanceToCamera = starSpriteRef.current.getWorldPosition(new THREE.Vector3()).distanceTo(camera.position);
    // update star size relative to camera position
    let starSize = (distanceToCamera / 250) * scale;
    starSize = clamp(starSize, starMin, starMax);
    if (isMesh) {
      // @ts-ignore
      starMeshRef.current.material.uniforms.time.value = state.clock.elapsedTime;
      // @ts-ignore
      starMeshRef.current.material.uniforms.color.value = color;
      starMeshRef.current.scale.copy(new THREE.Vector3(starSize, starSize, starSize));
    } else {
      starSpriteRef.current.scale.copy(new THREE.Vector3(starSize, starSize, starSize));
    }
    if (distanceToCamera < 30) {
      setMesh(true);
    } else setMesh(false);
  });

  return (
    <>
      <mesh layers={DEFAULT_LAYER} scale={scale} ref={starMeshRef} position={position} visible={isMesh}>
        <sphereGeometry attach="geometry" args={[1, 30, 30]} />
        <starMeshMaterial color={color} time={clock.elapsedTime} />
      </mesh>
      <sprite layers={OCCLUSION_LAYER} scale={scale} ref={starSpriteRef} position={position} visible={!isMesh}>
        <spriteMaterial map={texture} color={color} toneMapped={false} />
      </sprite>
    </>
  );
}
