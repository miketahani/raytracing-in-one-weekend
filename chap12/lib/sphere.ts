import Vec3, { dot } from './vec3.ts'
import Hittable, { hit_record } from './hittable.ts'
import { Ray } from './ray.ts'
import { Material } from './material.ts'

export class Sphere extends Hittable {
  center: Vec3
  radius: number
  mat_ptr: Material

  constructor (cen: Vec3, r: number, m: Material) {
    super()

    this.center = cen
    this.radius = r
    this.mat_ptr = m
  }

  hit = (
    r: Ray,
    t_min: number,
    t_max: number
  ): hit_record | false => {
    const oc = r.origin().sub(this.center)
    const a = r.direction().length_squared()
    const half_b = dot(oc, r.direction())
    const c = oc.length_squared() - this.radius * this.radius

    const discriminant = half_b * half_b - a * c

    if (discriminant < 0) {
      return false
    }

    const sqrtd = Math.sqrt(discriminant)

    // Find the nearest root that lies in the acceptable range
    let root = (-half_b - sqrtd) / a

    if (root < t_min || t_max < root) {
      root = (-half_b + sqrtd) / a

      if (root < t_min || t_max < root) {
        return false
      }
    }

    const rec = new hit_record()
    rec.t = root
    rec.p = r.at(rec.t) as Vec3
    const outward_normal = rec.p.sub(this.center).div(this.radius)
    rec.set_face_normal(r, outward_normal)
    rec.mat_ptr = this.mat_ptr

    return rec
  }
}

export default (cen: Vec3, r: number, m: Material) => new Sphere(cen, r, m)
