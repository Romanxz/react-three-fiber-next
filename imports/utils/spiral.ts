import { Vector3 } from 'three';

export function spiral(x, y, z, offset, armXdist, spiralForce) {
  let r = Math.sqrt(x ** 2 + y ** 2);
  let theta = offset;
  theta += x > 0 ? Math.atan(y / x) : Math.atan(y / x) + Math.PI;
  theta += (r / armXdist) * spiralForce;
  return new Vector3(r * Math.cos(theta), r * Math.sin(theta), z);
}
