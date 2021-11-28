export default class Vec3 {
  constructor (x = 0, y = 0, z = 0) {
    this.e = x instanceof Vec3 ? [...x.e] : [x, y, z]
  }

  x = () => this.e[0]
  y = () => this.e[1]
  z = () => this.e[2]

  neg = () => new Vec3(-this.e[0], -this.e[1], -this.e[2])

  add = (v) => {
    this.e[0] += v.e[0]
    this.e[1] += v.e[1]
    this.e[2] += v.e[2]
    return this
  }

  mult = (t) => {
    this.e[0] *= t
    this.e[1] *= t
    this.e[2] *= t
    return this
  }

  div = (t) => {
    return this.mult(1 / t)
  }

  // Floor values (for writing PPM colors, which are ints)
  floor = () => {
    this.e[0] = Math.floor(this.e[0])
    this.e[1] = Math.floor(this.e[1])
    this.e[2] = Math.floor(this.e[2])
    return this
  }

  length_squared = () => this.e[0] ** 2 + this.e[1] ** 2 + this.e[2] ** 2

  length = () => Math.sqrt(this.length_squared())

  toString = () => `${this.e[0]} ${this.e[1]} ${this.e[2]}`

  static add = (u, v) => {
    return new Vec3(u.e[0] + v.e[0], u.e[1] + v.e[1], u.e[2] + v.e[2])
  }

  static sub = (u, v) => {
    return new Vec3(u.e[0] - v.e[0], u.e[1] - v.e[1], u.e[2] - v.e[2])
  }

  static mult = (u, v) => {
    if (u instanceof Vec3 && v instanceof Vec3) {
      return new Vec3(u.e[0] * v.e[0], u.e[1] * v.e[1], u.e[2] * v.e[2])
    } else if (u instanceof Vec3) {
      return new Vec3(u.e[0] * v, u.e[1] * v, u.e[2] * v)
    } else if (v instanceof Vec3) {
      return new Vec3(u * v.e[0], u * v.e[1], u * v.e[2])
    }
  }

  static div = (v, t) => {
    return Vec3.mult(1 / t, v)
  }

  static dot = (u, v) => {
    return u.e[0] * v.e[0] + u.e[1] * v.e[1] + u.e[2] * v.e[2]
  }

  static cross = (u, v) => {
    return new Vec3(
      u.e[1] * v.e[2] - u.e[2] * v.e[1],
      u.e[2] * v.e[0] - u.e[0] * v.e[2],
      u.e[0] * v.e[1] - u.e[1] * v.e[0]
    )
  }

  static unit_vector = (v) => {
    return Vec3.div(v, v.length())
  }
}

export const vec3 = (x, y, z) => new Vec3(x, y, z)
export const point3 = vec3  // 3D point
export const color = vec3   // RGB color
