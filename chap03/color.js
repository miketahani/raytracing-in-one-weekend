import Vec3 from './vec3.js'

export function write_color(out, pixel_color) {
  const output_string = Vec3.mult(255, pixel_color).floor().toString()
  out(output_string)
}
