// Usage: node listing3 > listing3.ppm
function main () {
  const image_width = 256
  const image_height = 256

  console.log(`P3\n${image_width} ${image_height}\n255`)

  for (let j = image_height - 1; j >= 0; --j) {
    console.error(`Scanlines remaining: ${j}`)

    for (let i = 0; i < image_width; ++i) {
      const r = i / (image_width - 1)
      const g = j / (image_height - 1)
      const b = 0.25

      const ir = 255 * r | 0
      const ig = 255 * g | 0
      const ib = 255 * b | 0

      console.log(`${ir} ${ig} ${ib}`)
    }
  }

  console.error('Done')
}

main()
