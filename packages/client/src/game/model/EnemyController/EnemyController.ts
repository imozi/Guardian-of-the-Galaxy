import { EnemyShip } from '../EnemyShip'
import { ENEMY_SHIPS } from '@/game/configs/EnemyShips.conf'
import { ENEMY_CONTROLLER } from '@/game/configs/EnemyController.conf'
import { Weapon } from '../Weapons'
import {
  CanvasSize,
  EnemyGroup,
  EnemyType,
  MainSettingsProps,
  Position,
  Velocity,
  WeaponCollection,
} from '@/types/game'

export class EnemyController {
  private _enemyMap = [
    ['battlecruiser', 'dreadnought', 'battlecruiser'],
    [...Array(5).fill('torpedo')],
    [...Array(9).fill('frigate')],
    [...Array(13).fill('bomber')],
    [...Array(13).fill('support')],
    [...Array(13).fill('fighter')],
    [...Array(15).fill('scout')],
  ]
  private _canvasSize: CanvasSize
  private _ctx: CanvasRenderingContext2D
  private _weapons: WeaponCollection
  private _position: Position
  private _velocity: Velocity
  private _defaultPosition = { x: 0, y: 0 }
  public enemiesShips: EnemyShip[] = []
  public enemyАmmunition: Weapon[] = []

  constructor({ canvasSize, ctx, weapons }: MainSettingsProps) {
    this._canvasSize = canvasSize
    this._ctx = ctx
    this._weapons = weapons
    this._position = {
      x: this._canvasSize.w / 2,
      y: 0,
    }
    this._velocity = ENEMY_CONTROLLER.velocity
  }

  private _enemiesMovement(): void {
    //TODO: Реализовать движение
  }

  private _goAttack(): void {
    //TODO: Реализовать атаку
  }

  public generateEnemiesShips(): void {
    const indxGroup = Math.floor(Math.random() * ENEMY_SHIPS.enemyType.length)
    const groupEnemy = ENEMY_SHIPS.enemyType[indxGroup] as EnemyGroup

    let prevHeight = ENEMY_SHIPS[groupEnemy].maxEnemyImageSizeHeight / 2

    this._enemyMap.forEach((map, columns) => {
      const centerElenemt = Math.floor(map.length / 2)

      let positionX = this._canvasSize.w / 2
      let positionY = 0

      map.forEach((e: EnemyType, row) => {
        if (e) {
          const enemyConf = ENEMY_SHIPS[groupEnemy].ship[e]

          if (columns === 0) {
            positionY = ENEMY_CONTROLLER.positionAdjustment.topIndent
          }

          if (columns > 0) {
            positionY =
              prevHeight +
              enemyConf.image.sh / 2 +
              ENEMY_CONTROLLER.positionAdjustment.topIndent +
              ENEMY_CONTROLLER.positionAdjustment.indentRowEnemy
          }

          if (row < centerElenemt) {
            positionX +=
              -enemyConf.image.sw -
              ENEMY_CONTROLLER.positionAdjustment.indentColumnsEnemy
          } else if (row > centerElenemt) {
            positionX +=
              enemyConf.image.sw +
              ENEMY_CONTROLLER.positionAdjustment.indentColumnsEnemy
          } else {
            positionX = this._canvasSize.w / 2
          }

          const enemy = new EnemyShip({
            canvasSize: this._canvasSize,
            ctx: this._ctx,
            weapons: this._weapons,
            position: { x: positionX, y: positionY },
            velocity: enemyConf.velocity,
            image: {
              ship: {
                url: enemyConf.image.url,
                sw: enemyConf.image.sw,
                sh: enemyConf.image.sh,
                frameRate: enemyConf.image.frameRate,
              },
              die: {
                url: ENEMY_SHIPS.die.url,
                sw: ENEMY_SHIPS.die.sw,
                sh: ENEMY_SHIPS.die.sh,
                frameRate: ENEMY_SHIPS.die.frameRate,
                loop: ENEMY_SHIPS.die.loop,
              },
            },
            damageLimit: enemyConf.damageLimit,
            typeWeapon: enemyConf.weapon,
            ammunition: this.enemyАmmunition,
            helthPoint: enemyConf.helthPoint,
            score: enemyConf.score,
          })

          if (row === map.length - 1 && columns !== 0) {
            prevHeight +=
              enemyConf.image.sh +
              ENEMY_CONTROLLER.positionAdjustment.indentRowEnemy
          }

          if (
            columns === Math.floor(this._enemyMap.length / 2) &&
            row === Math.floor(map.length / 2)
          ) {
            this._position.y = positionY
            this._defaultPosition = { ...this._position }
          }

          this.enemiesShips.push(enemy)
        }
      })
    })
  }

  public reset(): void {
    this.enemiesShips.length = 0
    this.enemyАmmunition.length = 0
  }

  public destroy(): void {
    this.enemiesShips.forEach(enemy => {
      enemy.destroy()
    })
  }

  public update(ms: number): void {
    if (this.enemyАmmunition.length) {
      this.enemyАmmunition.forEach((ammunition, i) => {
        if (ammunition.position.y >= this._canvasSize.h) {
          this.enemyАmmunition.splice(i, 1)
        } else {
          ammunition.update(ms)
        }
      })
    }
  }

  public draw(): void {
    const drawAmmunition = () => {
      this.enemyАmmunition.forEach(ammunition => {
        ammunition.draw()
      })
    }

    if (this.enemyАmmunition.length) {
      drawAmmunition()
    }
  }
}
