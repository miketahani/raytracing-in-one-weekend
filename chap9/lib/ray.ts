import Vec3 from './vec3.ts'

export class Ray {
  orig: Vec3
  dir: Vec3

  constructor (origin: Vec3, direction: Vec3) {
    this.orig = origin
    this.dir = direction
  }

  origin = (): Vec3 => this.orig
  direction = (): Vec3 => this.dir

  at = (t: number): Vec3 => this.orig.add(this.dir.mult(t))
}

export default (origin: Vec3, direction: Vec3) => new Ray(origin, direction)
// export default Ray
