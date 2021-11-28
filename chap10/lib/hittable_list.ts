import Hittable, { hit_record } from './hittable.ts'

import { Ray } from './ray.ts'

export default class HittableList extends Hittable {
  objects: Array<Hittable> = []

  clear = () => this.objects = []

  add = (obj: Hittable) => this.objects.push(obj)

  hit = (r: Ray, t_min: number, t_max: number): hit_record | false => {
    let temp_rec: hit_record | undefined
    let hit_anything = false
    let closest_so_far: number = t_max

    for (const obj of this.objects) {
      const hit = obj.hit(r, t_min, closest_so_far)

      if (hit) {
        hit_anything = true
        closest_so_far = hit.t as number
        temp_rec = hit
      }
    }

    return hit_anything && (temp_rec as hit_record)
  }
}
