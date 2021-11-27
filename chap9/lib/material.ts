import Vec3, { Color, dot } from './vec3.ts'
import ray, { Ray } from './ray.ts'
import { hit_record } from './hittable.ts'

interface Hit {
  scattered: Ray
  attenuation: Color
}

type MatReturn = Hit | false

export class Material {
  albedo: Color

  constructor(a: Color) {
    this.albedo = a
  }

  scatter = (
    r_in: Ray,
    rec: hit_record
  ): MatReturn => {
    return false
  }
}

export class Lambertian extends Material {
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
  scatter = (
    r_in: Ray,
    rec: hit_record
  ): MatReturn => {
    const reflected = Vec3.reflect(Vec3.unit_vector(r_in.direction()), rec.normal as Vec3)
    const scattered = ray(rec.p as Vec3, reflected)

    if (dot(scattered.direction(), rec.normal as Vec3) <= 0) {
      return false
    }

    return { scattered, attenuation: this.albedo }
  }
}

export const metal = (a: Color) => new Metal(a)
