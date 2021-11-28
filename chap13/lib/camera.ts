import Vec3, { vec3, Point3, point3 } from './vec3.ts'
import ray, { Ray } from './ray.ts'
import { degrees_to_radians } from './common.ts'

export default class Camera {
  #w: Vec3
  #u: Vec3
  #v: Vec3

  #origin: Point3
  #lower_left_corner: Point3
  #horizontal: Vec3
  #vertical: Vec3
  #lens_radius: number

  constructor (
    lookfrom: Point3,
    lookat: Point3,
    vup: Vec3,
    vfov: number,
    aspect_ratio: number,
    aperture: number,
    focus_dist: number
  ) {
    const theta = degrees_to_radians(vfov)
    const h = Math.tan(theta / 2)
    const viewport_height = 2.0 * h
    const viewport_width = aspect_ratio * viewport_height

    this.#w = Vec3.unit_vector(lookfrom.sub(lookat))
    this.#u = Vec3.unit_vector(Vec3.cross(vup, this.#w))
    this.#v = Vec3.cross(this.#w, this.#u)

    this.#origin = lookfrom
    this.#horizontal = this.#u.mult(focus_dist * viewport_width)
    this.#vertical = this.#v.mult(focus_dist * viewport_height)
    this.#lower_left_corner = this.#origin
      .sub(this.#horizontal.div(2))
      .sub(this.#vertical.div(2))
      .sub(this.#w.mult(focus_dist))
    this.#lens_radius = aperture / 2
  }

  get_ray = (s: number, t: number): Ray => {
    const rd = Vec3.random_in_unit_disc().mult(this.#lens_radius)
    const offset = this.#u.mult(rd.x()).add(this.#v.mult(rd.y()))

    const origin = this.#origin.add(offset)

    const direction = this.#lower_left_corner
      .add(this.#horizontal.mult(s))
      .add(this.#vertical.mult(t))
      .sub(this.#origin)
      .sub(offset)

    return ray(origin, direction)
  }
}
