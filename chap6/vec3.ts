interface Vec3 {
  e: Array<number>
}

type Vec3Argument = Vec3 | number

class Vec3 {
  e: Array<number>

  constructor (
    x?: Vec3Argument,
    y?: number,
    z?: number
  ) {
    if (x instanceof Vec3) {
      this.e = [...x.e]
    } else {
      this.e = [x ?? 0, y ?? 0, z ?? 0]
    }
  }

  x = () => this.e[0]
  y = () => this.e[1]
  z = () => this.e[2]

  neg = (): Vec3 => this.mult(-1)

  add = (v: Vec3): Vec3 => Vec3.add(this, v)

  sub = (v: Vec3): Vec3 => Vec3.sub(this, v)

  mult = (t: Vec3Argument): Vec3 => Vec3.mult(this, t)

  div = (t: number): Vec3 => this.mult(1 / t)

  dot = (v: Vec3): number => Vec3.dot(this, v)

  cross = (v: Vec3): Vec3 => Vec3.cross(this, v)

  // Floor values (for writing PPM colors, which are ints)
  floor = (): Vec3 => new Vec3(...this.e.map(Math.floor))

  length_squared = (): number =>
    this.e[0] ** 2 + this.e[1] ** 2 + this.e[2] ** 2

  length = (): number => Math.sqrt(this.length_squared())

  toString = (): string => `${this.e[0]} ${this.e[1]} ${this.e[2]}`

  clone = (): Vec3 => new Vec3(this)

  static add = (u: Vec3, v: Vec3): Vec3 => {
    return new Vec3(u.e[0] + v.e[0], u.e[1] + v.e[1], u.e[2] + v.e[2])
  }

  static sub = (u: Vec3, v: Vec3): Vec3 => {
    return new Vec3(u.e[0] - v.e[0], u.e[1] - v.e[1], u.e[2] - v.e[2])
  }

  static multVec3Num = (v: Vec3, n: number): Vec3 => {
    return new Vec3(v.e[0] * n, v.e[1] * n, v.e[2] * n)
  }

  static mult = (u: Vec3Argument, v: Vec3Argument): Vec3 => {
    if (u instanceof Vec3 && v instanceof Vec3) {
      return new Vec3(u.e[0] * v.e[0], u.e[1] * v.e[1], u.e[2] * v.e[2])
    } else if (u instanceof Vec3) {
      // return new Vec3(u.e[0] * v, u.e[1] * v, u.e[2] * v)
      return Vec3.multVec3Num(u, v as number)
    } else if (v instanceof Vec3) {
      // return new Vec3(u * v.e[0], u * v.e[1], u * v.e[2])
      return Vec3.multVec3Num(v, u)
    } else {
      throw new Error('Bad args')
    }
  }

  static div = (v: Vec3, t: number): Vec3 => {
    return Vec3.mult(1 / t, v)
  }

  static dot = (u: Vec3, v: Vec3): number => {
    return u.e[0] * v.e[0] + u.e[1] * v.e[1] + u.e[2] * v.e[2]
  }

  static cross = (u: Vec3, v: Vec3): Vec3 => {
    return new Vec3(
      u.e[1] * v.e[2] - u.e[2] * v.e[1],
      u.e[2] * v.e[0] - u.e[0] * v.e[2],
      u.e[0] * v.e[1] - u.e[1] * v.e[0]
    )
  }

  static unit_vector = (v: Vec3): Vec3 => {
    return Vec3.div(v, v.length())
  }
}

export default Vec3

export const dot = Vec3.dot

export const vec3 = (
  x?: Vec3Argument,
  y?: number,
  z?: number
) => new Vec3(x, y, z)

export const point3 = vec3  // 3D point
export const color = vec3   // RGB color
