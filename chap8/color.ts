import Vec3, { color } from './vec3.ts'
import { clamp } from './common.ts'

export function write_color(
  out: Function,
  pixel_color: Vec3,
  samples_per_pixel: number
): void {
  // Divide the color by the number of samples and gamma-correct for gamma=2.0
  const scale = 1.0 / samples_per_pixel
  const r = 255 * clamp(Math.sqrt(pixel_color.x() * scale), 0.0, 0.999)
  const g = 255 * clamp(Math.sqrt(pixel_color.y() * scale), 0.0, 0.999)
  const b = 255 * clamp(Math.sqrt(pixel_color.z() * scale), 0.0, 0.999)

  // Write the translated [0,255] value of each color component
  out(color(r, g, b).floor().toString())
}
