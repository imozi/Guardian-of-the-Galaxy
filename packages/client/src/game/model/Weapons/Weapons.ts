import { Weapon } from './Weapon'
import { WEAPON_CONFIG } from '../../configs/Weapon.conf'
import {
  DirectionalShooting,
  Position,
  WeaponCollection,
  WeaponConf,
} from '@/types/game'

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
    const { enemy, mainShip } = WEAPON_CONFIG

    for (const key in enemy) {
      this.emeny[key] = this._getWeapon(ctx, enemy[key])
    }

    for (const key in mainShip) {
      this.main[key] = this._getWeapon(ctx, mainShip[key])
    }
  }

  private _getWeapon(ctx: CanvasRenderingContext2D, config: WeaponConf) {
    const { url, sw, sh, frameRate, damage, velocity } = config

    return (
      position: Position,
      directionalShooting: DirectionalShooting,
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
  }
}
