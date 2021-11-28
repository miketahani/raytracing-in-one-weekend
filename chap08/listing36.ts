import Vec3, { point3, color } from './vec3.ts'
import ray, { Ray } from './ray.ts'
import Camera from './camera.ts'
import Hittable from './hittable.ts'
import HittableList from './hittable_list.ts'
import Sphere from './sphere.ts'
import { write_color } from './color.ts'
import { random_double } from './common.ts'

let rayCount = 0

function ray_color(r: Ray, world: Hittable, depth: number): Vec3 {
  if (++rayCount % 25_000 === 0) {
    console.error(`Ray color queries: ${rayCount}`)
  }

  if (depth <= 0) {
    return color(0, 0, 0)
  }

  const rec = world.hit(r, 0.001, Infinity)

  if (rec) {
    const p = rec.p as Vec3
    const normal = rec.normal as Vec3
    const target = p.add(normal).add(Vec3.random_in_unit_sphere())
    return ray_color(ray(p, target.sub(p)), world, depth - 1).mult(0.5)
  }

  const unit_direction = Vec3.unit_vector(r.direction())
  const t = 0.5 * (unit_direction.y() + 1.0)
  return color(1.0, 1.0, 1.0).mult(1.0 - t).add(color(0.5, 0.7, 1.0).mult(t))
}

function main () {
  // Image
  const aspect_ratio = 16.0 / 9.0
  const image_width = 400
  const image_height = Math.floor(image_width / aspect_ratio)
  const samples_per_pixel = 100
  const max_depth = 50

  // World
  const world = new HittableList()
  world.add(new Sphere(point3(0, 0, -1), 0.5))
  world.add(new Sphere(point3(0, -100.5, -1), 100))

  // Camera
  const cam = new Camera()

  const w = image_width - 1
  const h = image_height - 1

  console.log(`P3\n${image_width} ${image_height}\n255`)

  for (let j = image_height - 1; j >= 0; j--) {
    console.error(`Scanlines remaining: ${j}`)

    for (let i = 0; i < image_width; i++) {
      let pixel_color = color(0, 0, 0)

      for (let s = 0; s < samples_per_pixel; s++) {
        const u = (i + random_double()) / w
        const v = (j + random_double()) / h
        const r = cam.get_ray(u, v)
        pixel_color = pixel_color.add(ray_color(r, world, max_depth))
      }

      write_color(console.log, pixel_color, samples_per_pixel)
    }
  }
  console.error('Done')
}

main()
