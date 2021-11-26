export const degrees_to_radians = (degrees: number): number => {
  return degrees * Math.PI / 180.0
}

export const random_double = (min: number = 0, max: number = 1) => {
  // Returns a random real in [min,max).
  return min + (max - min) * Math.random()
}

export const clamp = (x: number, min: number, max: number): number => {
  if (x < min) return min
  if (x > max) return max
  return x
}
