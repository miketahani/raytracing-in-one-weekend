import Vec3, { Color, color, dot } from './vec3.ts'
import ray, { Ray } from './ray.ts'
import { hit_record } from './hittable.ts'
import { random_double } from './common.ts'

interface Hit {
  scattered: Ray
  attenuation: Color
}

type MatReturn = Hit | false

export class Material {
  scatter = (
    r_in: Ray,
    rec: hit_record
  ): MatReturn => {
    return false
  }
}

export class Lambertian extends Material {
  albedo: Color

  constructor(a: Color) {
    super()
    this.albedo = a
  }

  scatter = (
    r_in: Ray,
    rec: hit_record
  ): MatReturn => {
    let scatter_direction = (rec.normal as Vec3).add(Vec3.random_unit_vector())
    // Catch degenerate scatter direction
    if (scatter_direction.near_zero()) scatter_direction = rec.normal as Vec3

    const scattered = ray(rec.p as Vec3, scatter_direction)
    return { scattered, attenuation: this.albedo }
  }
}

export const lambertian = (a: Color) => new Lambertian(a)

export class Metal extends Material {
  albedo: Color
  fuzz: number

  constructor (a: Color, f: number) {
    super()
    this.fuzz = f
    this.albedo = a
  }

  scatter = (
    r_in: Ray,
    rec: hit_record
  ): MatReturn => {
    const reflected = Vec3.reflect(Vec3.unit_vector(r_in.direction()), rec.normal as Vec3)
    const offset = reflected.add(Vec3.random_in_unit_sphere().mult(this.fuzz))
    const scattered = ray(rec.p as Vec3, offset)

    if (dot(scattered.direction(), rec.normal as Vec3) <= 0) {
      return false
    }

    return { scattered, attenuation: this.albedo }
  }
}

export const metal = (a: Color, f: number) => new Metal(a, f)

const black = color(1.0, 1.0, 1.0)

export class Dielectric extends Material {
  ir: number

  constructor(index_of_refraction: number) {
    super()
    this.ir = index_of_refraction
  }

  scatter = (
    r_in: Ray,
    rec: hit_record
  ): MatReturn => {
    const refraction_ratio = rec.front_face ? (1.0 / this.ir) : this.ir
    const unit_direction = Vec3.unit_vector(r_in.direction())

    const p = rec.p as Vec3
    const normal = rec.normal as Vec3

    const cos_theta = Math.min(dot(unit_direction.neg(), normal), 1.0)
    const sin_theta = Math.sqrt(1.0 - cos_theta * cos_theta)

    const cannot_refract = refraction_ratio * sin_theta > 1.0

    let direction: Vec3
    if (
      cannot_refract ||
      (Vec3.reflectance(cos_theta, refraction_ratio) > random_double())
    ) {
      direction = Vec3.reflect(unit_direction, normal)
    } else {
      direction = Vec3.refract(unit_direction, normal, refraction_ratio)
    }

    const scattered = ray(p, direction)

    return { scattered, attenuation: black }
  }
}

export const dielectric = (ir: number) => new Dielectric(ir)
