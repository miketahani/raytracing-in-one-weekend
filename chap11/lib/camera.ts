import Vec3, { vec3, Point3, point3 } from './vec3.ts'
import ray, { Ray } from './ray.ts'
import { degrees_to_radians } from './common.ts'

export default class Camera {
  #origin: Point3
  #lower_left_corner: Point3
  #horizontal: Vec3
  #vertical: Vec3

  constructor (
    lookfrom: Point3,
    lookat: Point3,
    vup: Vec3,
    vfov: number,
    aspect_ratio: number
  ) {
    const theta = degrees_to_radians(vfov)
    const h = Math.tan(theta / 2)
    const viewport_height = 2.0 * h
    const viewport_width = aspect_ratio * viewport_height

    const w = Vec3.unit_vector(lookfrom.sub(lookat))
    const u = Vec3.unit_vector(Vec3.cross(vup, w))
    const v = Vec3.cross(w, u)

    this.#origin = lookfrom
    this.#horizontal = u.mult(viewport_width)
    this.#vertical = v.mult(viewport_height)
    this.#lower_left_corner = this.#origin
      .sub(this.#horizontal.div(2))
      .sub(this.#vertical.div(2))
      .sub(w)
  }

  get_ray = (u: number, v: number): Ray => {
    // lower_left_corner + u*horizontal + v*vertical - origin
    const direction = this.#lower_left_corner
      .add(this.#horizontal.mult(u))
      .add(this.#vertical.mult(v))
      .sub(this.#origin)

    return ray(this.#origin, direction)
  }
}
