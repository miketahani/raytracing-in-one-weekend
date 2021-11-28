import Vec3, { vec3, point3, color } from './lib/vec3.ts'
import { Ray } from './lib/ray.ts'
import Camera from './lib/camera.ts'
import Hittable from './lib/hittable.ts'
import { write_color } from './lib/color.ts'
import { random_double } from './lib/common.ts'
import { random_scene } from './lib/scene.ts'

const R = Math.cos(Math.PI / 4)

let rayCount = 0

function ray_color(r: Ray, world: Hittable, depth: number): Vec3 {
  if (++rayCount % 25_000 === 0) {
    console.error(`Ray color queries: ${rayCount}`)
  }

  if (depth <= 0) {
    return color(0, 0, 0)
  }

  const hit = world.hit(r, 0.001, Infinity)

  if (hit) {
    // Should always have a `scatter`, but add ? to appease TS
    const scatter = hit.mat_ptr?.scatter(r, hit)

    if (scatter) {
      const { scattered, attenuation } = scatter
      return attenuation.mult(ray_color(scattered, world, depth - 1))
    }
    return color(0, 0, 0)
  }

  const unit_direction = Vec3.unit_vector(r.direction())
  const t = 0.5 * (unit_direction.y() + 1.0)
  return color(1.0, 1.0, 1.0).mult(1.0 - t).add(color(0.5, 0.7, 1.0).mult(t))
}

function main () {
  // Image
  const aspect_ratio = 3 / 2
  const image_width = 1200
  const image_height = Math.floor(image_width / aspect_ratio)
  const samples_per_pixel = 500
  const max_depth = 50

  // World
  const world = random_scene()

  // Camera
  const lookfrom = point3(13, 2, 3)
  const lookat = point3(0, 0, 0)
  const vup = vec3(0, 1, 0)
  const dist_to_focus = 10
  const aperture = 0.1

  const cam = new Camera(
    lookfrom,
    lookat,
    vup,
    20,
    aspect_ratio,
    aperture,
    dist_to_focus
  )

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
