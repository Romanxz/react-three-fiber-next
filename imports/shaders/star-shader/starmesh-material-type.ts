import { MaterialNode } from '@react-three/fiber';
import * as THREE from 'three';

interface IStarMeshProps {
  time: number;
  color: THREE.Color;
}

export default class StarMeshMaterial extends THREE.ShaderMaterial {}

// Add types to ThreeElements elements so primitives pick up on it
declare module '@react-three/fiber' {
  export interface ThreeElements {
    starMeshMaterial: MaterialNode<StarMeshMaterial, typeof StarMeshMaterial> & IStarMeshProps;
  }
}
