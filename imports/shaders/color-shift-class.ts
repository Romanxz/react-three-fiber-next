import { MaterialNode, MaterialProps } from '@react-three/fiber';
import * as THREE from 'three'

interface IColorShiftProps extends MaterialProps {
  time: number,
  color: string
}

export default class ColorShiftMaterial extends THREE.ShaderMaterial {
  constructor(props: IColorShiftProps) {
    super({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0.2, 0.0, 0.1) }
      },
      vertexShader: /*glsl*/`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
      fragmentShader: /*glsl*/`
        uniform float time;
        uniform vec3 color;
        varying vec2 vUv;
        void main() {
          gl_FragColor.rgba = vec4(0.5 + 0.3 * sin(vUv.yxx + time) + color, 1.0);
        }`
    })
  }
}

// Add types to ThreeElements elements so primitives pick up on it
declare module '@react-three/fiber' {
  interface ThreeElements {
    colorShiftMaterial: MaterialNode<ColorShiftMaterial, typeof ColorShiftMaterial>
  }
}