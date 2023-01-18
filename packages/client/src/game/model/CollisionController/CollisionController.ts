import { EnemyShip } from '../EnemyShip'
import { MainShip } from '../MainShip'
import { Weapon } from '../Weapons'

type CollisionControllerProps = {
  mainShip: MainShip
  enemyShips: EnemyShip[]
  enemyАmmunition: Weapon[]
}

export class CollisionController {
  private _mainShip: MainShip
  private _enemyShips: EnemyShip[]
  private _enemyАmmunition: Weapon[]

  constructor({
    mainShip,
    enemyShips,
    enemyАmmunition,
  }: CollisionControllerProps) {
    this._mainShip = mainShip
    this._enemyShips = enemyShips
    this._enemyАmmunition = enemyАmmunition
  }

  private _collisionDetection(): void {
    this._enemyShips.forEach(enemy => {
      if (this._isCollid(enemy) && !enemy.isHit) {
        enemy.hit(1000)
        this._mainShip.hit(1000)
      }
    })
  }

  private _isCollid(enemy: EnemyShip): boolean {
    const isCollidRight =
      enemy.position.x + enemy.sizeSprite.w / 2 >
      this._mainShip.position.x - this._mainShip.sizeSprite.w / 2
    const isCollidLeft =
      enemy.position.x - enemy.sizeSprite.w / 2 <
      this._mainShip.position.x + this._mainShip.sizeSprite.w / 2
    const isCollidTop =
      enemy.position.y + enemy.sizeSprite.h / 2 >
      this._mainShip.position.y - this._mainShip.sizeSprite.h / 2 + 5
    const isCollidBottom =
      enemy.position.y <
      this._mainShip.position.y + this._mainShip.sizeSprite.h - 10

    if (isCollidRight && isCollidLeft && isCollidTop && isCollidBottom) {
      return true
    } else {
      return false
    }
  }

  private _hittingEnemy(ammun: Weapon, enemy: EnemyShip): boolean {
    const isCollidRight =
      ammun.position.x + ammun.sizeSprite.w / 2 >
      enemy.position.x - enemy.sizeSprite.w / 2
    const isCollidLeft =
      ammun.position.x - ammun.sizeSprite.w / 2 <
      enemy.position.x + enemy.sizeSprite.w / 2
    const isCollidTop =
      ammun.position.y + ammun.sizeSprite.h / 2 > enemy.position.y
    const isCollidBottom =
      ammun.position.y + ammun.sizeSprite.h / 2 <
      enemy.position.y + enemy.sizeSprite.h / 2 + 15

    if (isCollidRight && isCollidLeft && isCollidTop && isCollidBottom) {
      return true
    } else {
      return false
    }
  }

  private _hittingMainShip(ammun: Weapon, mainShip: MainShip): boolean {
    const isCollidRight =
      ammun.position.x + ammun.sizeSprite.w / 2 >
      mainShip.position.x - mainShip.sizeSprite.w / 2
    const isCollidLeft =
      ammun.position.x - ammun.sizeSprite.w / 2 <
      mainShip.position.x + mainShip.sizeSprite.w / 2
    const isCollidTop =
      ammun.position.y + ammun.sizeSprite.h / 2 > mainShip.position.y
    const isCollidBottom =
      ammun.position.y < mainShip.position.y + mainShip.sizeSprite.h / 2

    if (isCollidRight && isCollidLeft && isCollidTop && isCollidBottom) {
      return true
    } else {
      return false
    }
  }

  public _mainShipAmmunitionCollisionDetection(): void {
    if (!this._mainShip.ammunition) {
      return
    }

    this._mainShip.ammunition.forEach((ammun, i) => {
      this._enemyShips.forEach(enemy => {
        if (this._hittingEnemy(ammun, enemy) && !enemy.isHit) {
          this._mainShip.ammunition.splice(i, 1)
          enemy.hit(ammun.damage)
        }
      })

      if (ammun.position.y <= 0) {
        this._mainShip.ammunition.splice(i, 1)
      }
    })
  }

  public _enemyAmmunitionCollisionDetection(): void {
    if (!this._enemyАmmunition.length) {
      return
    }

    this._enemyАmmunition.forEach((ammun, i) => {
      if (this._hittingMainShip(ammun, this._mainShip)) {
        this._enemyАmmunition.splice(i, 1)
        this._mainShip.hit(ammun.damage)
      }
    })
  }

  public update(): void {
    this._collisionDetection()

    const idx = this._enemyShips.findIndex(enemy => enemy.isDie)

    if (idx !== -1) {
      this._enemyShips.splice(idx, 1)
    }
  }
}
