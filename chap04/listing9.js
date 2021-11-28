import Vec3, { vec3, point3, color } from './vec3.js'
import { write_color } from './color.js'
import Ray from './ray.js'

const ray_color = (r) => {
  const unit_direction = Vec3.unit_vector(r.direction())
  const t = 0.5 * (unit_direction.y() + 1.0)
  return color(1.0, 1.0, 1.0).mult(1.0 - t).add(color(0.5, 0.7, 1.0).mult(t))
}

function main () {
  // Image
  const aspect_ratio = 16.0 / 9.0
  const image_width = 400
  const image_height = Math.floor(image_width / aspect_ratio)

  // Camera
  const viewport_height = 2.0
  const viewport_width = aspect_ratio * viewport_height
  const focal_length = 1.0

  const origin = point3(0, 0, 0)
  const horizontal = vec3(viewport_width, 0, 0)
  const vertical = vec3(0, viewport_height, 0)

  // lower_left_corner = origin - horizontal/2 - vertical/2 - vec3(0, 0, focal_length)
  const lower_left_corner = origin
    .sub(horizontal.div(2))
    .sub(vertical.div(2))
    .sub(vec3(0, 0, focal_length))

  const w = image_width - 1
  const h = image_height - 1

  console.log(`P3\n${image_width} ${image_height}\n255`)

  for (let j = image_height - 1; j >= 0; --j) {
    console.error(`Scanlines remaining: ${j}`)

    for (let i = 0; i < image_width; ++i) {
      const u = i / w
      const v = j / h

      // direction = lower_left_corner + u*horizontal + v*vertical - origin
      const direction = lower_left_corner
        .add(horizontal.mult(u))
        .add(vertical.mult(v))
        .sub(origin)

      const r = new Ray(origin, direction)
      const pixel_color = ray_color(r)
      write_color(console.log, pixel_color)
    }
  }
  console.error('Done')
}

main()
