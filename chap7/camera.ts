import Vec3, { vec3, point3 } from '../chap6/vec3.ts'
import Ray from '../chap4/ray.js'

export default class Camera {
  aspect_ratio: number
  viewport_height: number
  viewport_width: number
  focal_length: number

  #origin: Vec3
  #horizontal: Vec3
  #vertical: Vec3
  #lower_left_corner: Vec3

  constructor () {
    this.aspect_ratio = 16.0 / 9.0
    this.viewport_height = 2.0
    this.viewport_width = this.aspect_ratio * this.viewport_height
    this.focal_length = 1.0

    this.#origin = point3(0, 0, 0)
    this.#horizontal = vec3(this.viewport_width, 0.0, 0.0)
    this.#vertical = vec3(0.0, this.viewport_height, 0.0);
    this.#lower_left_corner = this.#origin
      .sub(this.#horizontal.div(2))
      .sub(this.#vertical.div(2))
      .sub(vec3(0, 0, this.focal_length))
  }

  get_ray = (u: number, v: number): Ray => {
    // lower_left_corner + u*horizontal + v*vertical - origin
    const direction = this.#lower_left_corner
      .add(this.#horizontal.mult(u))
      .add(this.#vertical.mult(v))
      .sub(this.#origin)

    return new Ray(this.#origin, direction)
  }
}
