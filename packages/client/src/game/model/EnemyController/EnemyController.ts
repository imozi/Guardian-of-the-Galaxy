import { EnemyShip } from '../EnemyShip'
import { ENEMY_SHIPS } from '@/game/configs/EnemyShips.conf'
import { ENEMY_CONTROLLER } from '@/game/configs/EnemyController.conf'
import { Weapon } from '../Weapons'
import {
  CanvasSize,
  EnemyConf,
  EnemyGroup,
  EnemyTypeArray,
  MainSettingsProps,
  Position,
  Velocity,
  WeaponCollection,
  EnemyTypeStrings,
} from '@/types/game'

export class EnemyController {
  private _enemyMap: EnemyTypeArray[] = [
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
  private _positionEnemyMap = { x: 0, y: 0, prevSize: 0 }
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
    const enemyGroups = Object.keys(EnemyGroup)
    const indxGroup = Math.floor(Math.random() * enemyGroups.length)
    const enemyGroup = enemyGroups[indxGroup] as EnemyGroup

    this._positionEnemyMap.prevSize =
      ENEMY_SHIPS[enemyGroup].maxEnemyImageSizeHeight / 2

    this._enemyMap.forEach((map, columns) => {
      this._positionEnemyMap.x = this._canvasSize.w / 2
      this._positionEnemyMap.y = 0

      map.forEach((shipName: EnemyTypeStrings, row) => {
        const enemyConf = ENEMY_SHIPS[enemyGroup].ship[shipName]
        const centerEnemyMap = Math.floor(this._enemyMap.length / 2)
        const centerCurrentMap = Math.floor(map.length / 2)
        const { indentRowEnemy } = ENEMY_CONTROLLER.positionAdjustment
        const indentRow = enemyConf.image.sh + indentRowEnemy

        this._setPositionX(row, columns, enemyConf.image.sw)
        this._setPositionY(columns, enemyConf.image.sh)

        const enemy = this._getEnemyShip(enemyConf, {
          ...this._positionEnemyMap,
        })

        this.enemiesShips.push(enemy)

        if (row === map.length - 1 && columns !== 0) {
          this._positionEnemyMap.prevSize += indentRow
        }

        if (columns === centerEnemyMap && row === centerCurrentMap) {
          this._position.y = this._positionEnemyMap.y
          this._defaultPosition = { ...this._position }
        }
      })
    })
  }

  private _getEnemyShip(config: EnemyConf, position: Position): EnemyShip {
    return new EnemyShip({
      canvasSize: this._canvasSize,
      ctx: this._ctx,
      weapons: this._weapons,
      position: position,
      velocity: config.velocity,
      image: {
        ship: {
          url: config.image.url,
          sw: config.image.sw,
          sh: config.image.sh,
          frameRate: config.image.frameRate,
        },
        die: {
          url: ENEMY_SHIPS.die.url,
          sw: ENEMY_SHIPS.die.sw,
          sh: ENEMY_SHIPS.die.sh,
          frameRate: ENEMY_SHIPS.die.frameRate,
          loop: ENEMY_SHIPS.die.loop,
        },
      },
      damageLimit: config.damageLimit,
      typeWeapon: config.weapon,
      ammunition: this.enemyАmmunition,
      helthPoint: config.helthPoint,
      score: config.score,
    })
  }

  private _setPositionX(
    row: number,
    columns: number,
    spriteWidth: number
  ): void {
    const centerElement = Math.floor(this._enemyMap[columns].length / 2)
    const { indentColumnsEnemy } = ENEMY_CONTROLLER.positionAdjustment
    const correctionPositionLeft = -spriteWidth - indentColumnsEnemy
    const correctionPositionRight = spriteWidth + indentColumnsEnemy

    if (row < centerElement) {
      this._positionEnemyMap.x += correctionPositionLeft
      console.log(this._positionEnemyMap.x, row)
    } else if (row > centerElement) {
      this._positionEnemyMap.x += correctionPositionRight
    } else {
      this._positionEnemyMap.x = this._canvasSize.w / 2
    }
  }

  private _setPositionY(columns: number, sizeSprite: number): void {
    const correctionPositionTop = ENEMY_CONTROLLER.positionAdjustment.topIndent
    const indent = ENEMY_CONTROLLER.positionAdjustment.indentRowEnemy

    if (columns === 0) {
      this._positionEnemyMap.y = ENEMY_CONTROLLER.positionAdjustment.topIndent
    }

    if (columns > 0) {
      this._positionEnemyMap.y =
        this._positionEnemyMap.prevSize +
        sizeSprite / 2 +
        correctionPositionTop +
        indent
    }
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
