export function write_color(out, pixel_color) {
  const output_string = pixel_color.mult(255).floor().toString()
  out(output_string)
}
