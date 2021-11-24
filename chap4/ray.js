class Ray {
  constructor (origin, direction) {
    this.orig = origin
    this.dir = direction
  }

  origin = () => this.orig
  direction = () => this.dir

  at = (t) => this.orig.add(this.dir.mult(t))
}

// export default ray = (...args) => new Ray(...args)
export default Ray
