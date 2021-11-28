import { color } from './vec3.js'
import { write_color } from './color.js'

function main () {
  const image_width = 256
  const image_height = 256

  console.log(`P3\n${image_width} ${image_height}\n255`)

  for (let j = image_height - 1; j >= 0; --j) {
    console.error(`Scanlines remaining: ${j}`)

    for (let i = 0; i < image_width; ++i) {
      const pixel_color = color(
        i / (image_width - 1),
        j / (image_height - 1),
        0.25
      )

      write_color(console.log, pixel_color)
    }
  }

  console.log('Done.')
}

main()
