import { Picture } from '@/core/Picture/Picture'
import { Ship } from '../Abstract/Ship'
import { Weapon } from '../Weapons'
import {
  IEnemyShipProps,
  PictureCollection,
  Position,
  SizeSprite,
  Velocity,
} from '@/types/game'
import { throttle } from '@/core/utils'

export class EnemyShip extends Ship implements Ship {
  static EVENTS = {
    INIT: 'flow:init',
    DIE: 'flow:die',
    HIT: 'flow:hit',
  }

  private _mainPosition: Position
  private _velocity: Velocity
  private _image: PictureCollection
  private _damageLimit: number
  private _typeWeapon: string
  private _ammunition: Weapon[]
  private _score: number
  public helthPoint: number
  public position: Position
  public sizeSprite: SizeSprite
  public isHit = false
  public isDie = false
  public isAttacke = false

  constructor({
    canvasSize,
    ctx,
    weapons,
    position,
    velocity,
    image,
    damageLimit,
    typeWeapon,
    ammunition,
    score,
    helthPoint,
    mainShipPosition,
  }: IEnemyShipProps) {
    super({ ctx, canvasSize, weapons })
    this.position = position
    this._mainPosition = { ...position }
    this._velocity = velocity
    this._image = {
      ship: new Picture(image.ship),
      die: new Picture(image.die),
    }
    this.sizeSprite = {
      w: this._image.ship.view.width,
      h: this._image.ship.view.height,
    }
    this._damageLimit = damageLimit
    this._typeWeapon = typeWeapon
    this._score = score
    this.helthPoint = helthPoint
    this._ammunition = ammunition
    this._mainPosition = mainShipPosition

    this.shoot = throttle(this.shoot, 2500)

    this._offEvents()
    this._onEvents()
  }

  private _onEvents(): void {
    this._image.die.on(Picture.EVENTS.ANIM_ENDED, this._die.bind(this))
  }

  private _offEvents(): void {
    this._image.die.off(Picture.EVENTS.ANIM_ENDED, this._die.bind(this))
  }

  private _die(): void {
    this.isDie = true
    this.emit(EnemyShip.EVENTS.DIE)
  }

  private _hit(damage: number): void {
    this.isHit = true
    this.helthPoint -= damage

    if (this.helthPoint <= 0) {
      this.isAttacke = false
      this.emit(EnemyShip.EVENTS.HIT, this._score)
    }

    if (this.helthPoint > 0) {
      this.isHit = false
    }
  }

  public shoot = (): void => {
    if (this.isHit) {
      return
    }

    const {
      position: { x, y },
      _typeWeapon,
      _damageLimit,
    } = this

    this._ammunition.push(
      this._weapons[_typeWeapon]({ x, y }, 'topY', _damageLimit)
    )
  }

  public hit(damage: number): void {
    this._hit(damage)
  }

  private _attacke(ms: number): void {
    if (!this.isAttacke) {
      return
    }

    const dx = this._mainPosition.x - this.position.x

    this.position.x += dx / 100
    this.position.y += this._velocity.vy * this._velocity.speedAdjustment * ms

    if (this.position.y > this._canvasSize.h) {
      this.position.y = -100
    }
  }

  public attacke(): void {
    this.isAttacke = true
  }

  public destroy(): void {
    this._offEvents()
  }

  public update(ms: number): void {
    this._attacke(ms)
  }

  public draw(): void {
    const drawDie = () => {
      this._image.die.update()
      this._ctx.drawImage(
        this._image.die.view,
        this.position.x - this._image.die.view.width / 2,
        this.position.y - this._image.die.view.height / 2
      )
    }

    const drawShip = () => {
      this._image.ship.update()

      this._ctx.drawImage(
        this._image.ship.view,
        this.position.x - this._image.ship.view.width / 2,
        this.position.y - this._image.ship.view.height / 2
      )
    }

    if (this.helthPoint <= 0) {
      drawDie()
      return
    }

    drawShip()
  }
}
