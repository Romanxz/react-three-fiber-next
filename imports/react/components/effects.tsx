import * as THREE from 'three';
import React, { useRef, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, } from '@react-three/postprocessing';
import { KernelSize, Resolution } from 'postprocessing';
import { EffectComposer as FXComposer, } from 'three-stdlib';

export const DEFAULT_LAYER = 0;
export const OCCLUSION_LAYER = 1;

export function FX() {
  const { gl, scene, camera, size } = useThree();
  const bloomComposer = useRef<FXComposer>(null!);

  useFrame(() => {
    camera.layers.set(OCCLUSION_LAYER);
    bloomComposer.current.render();
    camera.layers.set(DEFAULT_LAYER);
    gl.render(scene, camera);
  }, 1);

  return (
    <Suspense fallback={null}>
      <EffectComposer ref={bloomComposer}>
        <Bloom
          intensity={1} // The bloom intensity.
          // blurPass={undefined} // A blur pass.
          kernelSize={KernelSize.MEDIUM} // blur kernel size
          luminanceThreshold={0.4} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.5} // smoothness of the luminance threshold. Range is [0, 1]
          mipmapBlur={false} // Enables or disables mipmap blur.
          resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
          resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
        />
      </EffectComposer>
    </Suspense>
  );
}
