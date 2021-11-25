import Vec3, { vec3, dot } from './vec3.ts'
import Ray from '../chap4/ray.js'

export class hit_record {
  p?: Vec3
  normal?: Vec3
  t?: number
  front_face?: boolean

  set_face_normal = (r: Ray, outward_normal: Vec3): void => {
    this.front_face = dot(r.direction(), outward_normal) < 0
    this.normal = this.front_face ? outward_normal : outward_normal.neg()
  }
}

export default class Hittable {
  hit = (r: Ray, t_min: number, t_max: number): hit_record | false => {
    return false
  }
}
