export default class Vec3 {
  constructor (x = 0, y = 0, z = 0) {
    this.e = x instanceof Vec3 ? [...x.e] : [x, y, z]
  }

  x = () => this.e[0]
  y = () => this.e[1]
  z = () => this.e[2]

  neg = () => this.mult(-1)

  add = (v) => Vec3.add(this, v)

  sub = (v) => Vec3.sub(this, v)

  mult = (t) => Vec3.mult(this, t)

  div = (t) => this.mult(1 / t)

  dot = (v) => Vec3.dot(this, v)

  cross = (v) => Vec3.cross(this, v)

  // Floor values (for writing PPM colors, which are ints)
  floor = () => new Vec3(...this.e.map(Math.floor))

  length_squared = () => this.e[0] ** 2 + this.e[1] ** 2 + this.e[2] ** 2

  length = () => Math.sqrt(this.length_squared())

  toString = () => `${this.e[0]} ${this.e[1]} ${this.e[2]}`

  clone = () => new Vec3(this)

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

export const dot = Vec3.dot

export const vec3 = (x, y, z) => new Vec3(x, y, z)
export const point3 = vec3  // 3D point
export const color = vec3   // RGB color
