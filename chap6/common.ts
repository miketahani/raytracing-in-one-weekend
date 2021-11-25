import Vec3, { vec3, point3, color, dot } from './vec3.ts'

import Ray from '../chap4/ray.js'
import { write_color } from '../chap4/color.js'

export const degrees_to_radians = (degrees: number): number => {
  return degrees * Math.PI / 180.0
}

export {
  Vec3,
  vec3,
  point3,
  color,
  dot,
  Ray,
  write_color
}
