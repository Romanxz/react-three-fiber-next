import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BlurPass, Resizer, KernelSize, Resolution } from 'postprocessing';

export function Effects() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1} // The bloom intensity.
        // blurPass={undefined} // A blur pass.
        kernelSize={KernelSize.HUGE} // blur kernel size
        luminanceThreshold={0.2} // luminance threshold. Raise this value to mask out darker elements in the scene.
        luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        mipmapBlur={false} // Enables or disables mipmap blur.
        resolutionX={Resolution.AUTO_SIZE} // The horizontal resolution.
        resolutionY={Resolution.AUTO_SIZE} // The vertical resolution.
      />
    </EffectComposer>
  );
}

