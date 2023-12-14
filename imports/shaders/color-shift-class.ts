import { MaterialNode } from '@react-three/fiber';
import * as THREE from 'three'

interface IColorShiftProps  {
  time: number,
  color: string
}

export default class ColorShiftMaterial extends THREE.ShaderMaterial {}

// Add types to ThreeElements elements so primitives pick up on it
declare module '@react-three/fiber' {
  export interface ThreeElements {
      colorShiftMaterial: MaterialNode<ColorShiftMaterial, typeof ColorShiftMaterial> & IColorShiftProps
  }
}