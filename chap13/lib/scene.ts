import { Color, point3, color } from './vec3.ts'
import sphere from './sphere.ts'
import { Material, lambertian, metal, dielectric } from './material.ts'
import HittableList from './hittable_list.ts'
import { random_double } from './common.ts'

export function random_scene(): HittableList {
  const world = new HittableList()

  const ground_material = lambertian(color(0.5, 0.5, 0.5))
  world.add(sphere(point3(0, -1000, 0), 1000, ground_material))

  for (let a = -11; a < 11; a++) {
    for (let b = -11; b < 11; b++) {
      const choose_mat = random_double()
      const center = point3(
        a + 0.9 * random_double(),
        0.2,
        b + 0.9 * random_double()
      )

      if (center.sub(point3(4, 0.2, 0)).length() > 0.9) {
        let sphere_material: Material

        if (choose_mat < 0.8) {
          const albedo = Color.random().mult(Color.random())
          sphere_material = lambertian(albedo)
        } else if (choose_mat < 0.95) {
          const albedo = Color.random(0.5, 1)
          const fuzz = random_double(0, 0.5)
          sphere_material = metal(albedo, fuzz)
        } else {
          sphere_material = dielectric(1.5)
        }
        world.add(sphere(center, 0.2, sphere_material))
      }
    }
  }

  const mat1 = dielectric(1.5)
  world.add(sphere(point3(0, 1, 0), 1.0, mat1))

  const mat2 = lambertian(color(0.4, 0.2, 0.1))
  world.add(sphere(point3(-4, 1, 0), 1.0, mat2))

  const mat3 = metal(color(0.7, 0.6, 0.5), 0.0)
  world.add(sphere(point3(4, 1, 0), 1.0, mat3))

  return world
}
