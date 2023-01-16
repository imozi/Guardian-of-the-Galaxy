import { Weapon } from './Weapon'
import { WEAPON_CONFIG } from '../../configs/Weapon.conf'
import { WeaponCollection } from '@/types/game'

type WeaponsProps = {
  ctx: CanvasRenderingContext2D
}

export class Weapons {
  public emeny: WeaponCollection = {}
  public main: WeaponCollection = {}

  constructor({ ctx }: WeaponsProps) {
    this._init(ctx)
  }

  private _init(ctx: CanvasRenderingContext2D) {
    Object.entries(WEAPON_CONFIG).forEach(([keyA, weapons]) => {
      let whoseWeapon: WeaponCollection

      if (keyA === 'enemy') {
        whoseWeapon = this.emeny
      } else {
        whoseWeapon = this.main
      }

      Object.entries(weapons).forEach(([keyB, weaponB]) => {
        const { url, sw, sh, frameRate, damage, velocity } = weaponB
        whoseWeapon[keyB] = (
          position,
          directionalShooting,
          damageLimit = 1
        ): Weapon => {
          return new Weapon({
            ctx,
            image: { url, sw, sh, frameRate },
            damage: damage * damageLimit,
            velocity,
            position,
            directionalShooting,
          })
        }
      })
    })
  }
}
