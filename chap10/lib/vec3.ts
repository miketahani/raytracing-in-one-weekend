import { random_double } from './common.ts'

type Vec3Argument = Vec3 | number

const S = 1e-8

class Vec3 {
  e: Array<number>

  constructor (
    x?: Vec3Argument,
    y?: number,
    z?: number
  ) {
    this.e = x instanceof Vec3 ? [...x.e] : [x ?? 0, y ?? 0, z ?? 0]
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

  near_zero = (): Boolean => Vec3.near_zero(this)

  static add(u: Vec3, v: Vec3): Vec3 {
    return new Vec3(u.e[0] + v.e[0], u.e[1] + v.e[1], u.e[2] + v.e[2])
  }

  static sub(u: Vec3, v: Vec3): Vec3 {
    return new Vec3(u.e[0] - v.e[0], u.e[1] - v.e[1], u.e[2] - v.e[2])
  }

  static multVec3Num(v: Vec3, n: number): Vec3 {
    return new Vec3(v.e[0] * n, v.e[1] * n, v.e[2] * n)
  }

  static mult(u: Vec3Argument, v: Vec3Argument): Vec3 {
    if (u instanceof Vec3 && v instanceof Vec3) {
      return new Vec3(u.e[0] * v.e[0], u.e[1] * v.e[1], u.e[2] * v.e[2])
    } else if (u instanceof Vec3) {
      // return new Vec3(u.e[0] * v, u.e[1] * v, u.e[2] * v)
      return Vec3.multVec3Num(u, v as number)
    } else if (v instanceof Vec3) {
      // return new Vec3(u * v.e[0], u * v.e[1], u * v.e[2])
      return Vec3.multVec3Num(v, u as number)
    } else {
      // Why
      throw new Error('Bad args')
    }
  }

  static div(v: Vec3, t: number): Vec3 {
    return Vec3.mult(v, 1 / t)
  }

  static dot(u: Vec3, v: Vec3): number {
    return u.e[0] * v.e[0] + u.e[1] * v.e[1] + u.e[2] * v.e[2]
  }

  static cross(u: Vec3, v: Vec3): Vec3 {
    return new Vec3(
      u.e[1] * v.e[2] - u.e[2] * v.e[1],
      u.e[2] * v.e[0] - u.e[0] * v.e[2],
      u.e[0] * v.e[1] - u.e[1] * v.e[0]
    )
  }

  static reflect(v: Vec3, n: Vec3): Vec3 {
    // v - 2*dot(v,n)*n
    return v.sub(n.mult(2 * dot(v, n)))
  }

  static unit_vector(v: Vec3): Vec3 {
    return Vec3.div(v, v.length())
  }

  static random(min: number = 0, max: number = 1): Vec3 {
    return new Vec3(
      random_double(min, max),
      random_double(min, max),
      random_double(min, max)
    )
  }

  static random_in_unit_sphere(): Vec3 {
    while (true) {
      const p = Vec3.random(-1, 1)
      if (p.length_squared() >= 1) continue;
      return p
    }
  }

  static random_unit_vector(): Vec3 {
    return Vec3.unit_vector(Vec3.random_in_unit_sphere())
  }

  static random_in_hemisphere(normal: Vec3): Vec3 {
    const in_unit_sphere = Vec3.random_in_unit_sphere()

    if (Vec3.dot(in_unit_sphere, normal) > 0.0) {
      return in_unit_sphere
    }
    return in_unit_sphere.neg()
  }

  // Return true if the vector is close to zero in all dimensions
  static near_zero(v: Vec3): Boolean {
    return (Math.abs(v.e[0]) < S) && (Math.abs(v.e[1]) < S) && (Math.abs(v.e[2]) < S)
  }

  static refract(uv: Vec3, n: Vec3, etai_over_etat: number): Vec3 {
    const cos_theta = Math.min(dot(uv.neg(), n), 1.0)
    const r_out_perp = uv.add(n.mult(cos_theta)).mult(etai_over_etat)
    const r_out_parallel = n.mult(
      -Math.sqrt(Math.abs(1.0 - r_out_perp.length_squared()))
    )
    return r_out_perp.add(r_out_parallel)
  }

  static reflectance(cosine: number, ref_idx: number): number {
    const r0 = ((1 - ref_idx) / (1 + ref_idx)) ** 2
    return r0 + (1 - r0) * ((1 - cosine) ** 5)
  }
}

export default Vec3


export class Color extends Vec3 {}
export class Point3 extends Vec3 {}

export const vec3 = (
  x?: Vec3Argument,
  y?: number,
  z?: number
) => new Vec3(x, y, z)

// 3D point
export const point3 = (
  x?: Vec3Argument,
  y?: number,
  z?: number
) => new Point3(x, y, z)

// RGB color
export const color = (
  x?: Vec3Argument,
  y?: number,
  z?: number
) => new Color(x, y, z)

export const dot = Vec3.dot
