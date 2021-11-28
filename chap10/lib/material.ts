import Vec3, { Color, color, dot } from './vec3.ts'
import ray, { Ray } from './ray.ts'
import { hit_record } from './hittable.ts'

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

const Colors = {
  Black: color(1.0, 1.0, 1.0)
}

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
    const refracted = Vec3.refract(
      unit_direction,
      rec.normal as Vec3,
      refraction_ratio
    )
    return {
      scattered: ray(rec.p as Vec3, refracted),
      attenuation: Colors.Black
    }
  }
}

export const dielectric = (ir: number) => new Dielectric(ir)
