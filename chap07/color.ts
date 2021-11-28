import Vec3, { color } from '../chap6/vec3.ts'
import { clamp } from './common.ts'

export function write_color(
  out: Function,
  pixel_color: Vec3,
  samples_per_pixel: number
): void {
  // let r = pixel_color.x()
  // let g = pixel_color.y()
  // let b = pixel_color.z()
  //
  // // Divide the color by the number of samples
  // const scale = 1.0 / samples_per_pixel
  // r *= scale
  // g *= scale
  // b *= scale
  //
  // // Write the translated [0,255] value of each color component
  // out([r, g, b].map(c => 255 * clamp(c, 0.0, 0.999)).join(' '))

  const scale = 1.0 / samples_per_pixel
  const r = 255 * clamp(pixel_color.x() * scale, 0.0, 0.999)
  const g = 255 * clamp(pixel_color.y() * scale, 0.0, 0.999)
  const b = 255 * clamp(pixel_color.z() * scale, 0.0, 0.999)

  out(color(r, g, b).floor().toString())
}
