import { Picture } from '@/core/Picture/Picture'
import { PictureProps } from '@/types/core'
import {
  DirectionalShooting,
  Position,
  SizeSprite,
  Velocity,
} from '@/types/game'

type WeaponProps = {
  ctx: CanvasRenderingContext2D
  image: PictureProps
  damage: number
  velocity: Velocity
  position: Position
  directionalShooting: DirectionalShooting
}

export class Weapon {
  private _ctx: CanvasRenderingContext2D
  private _image: Picture
  private _velocity: Velocity
  private _directionalShooting: DirectionalShooting | null = null
  public position: Position
  public damage: number
  public sizeSprite: SizeSprite

  constructor({
    ctx,
    image,
    damage,
    velocity,
    position,
    directionalShooting,
  }: WeaponProps) {
    this._ctx = ctx
    this._image = new Picture(image)
    this.sizeSprite = {
      w: this._image.view.width,
      h: this._image.view.height,
    }
    this.damage = damage
    this._directionalShooting = directionalShooting
    this.position = position
    this._velocity = velocity
  }

  public update(ms: number): void {
    if (this._directionalShooting === 'topY') {
      this.position.y += this._velocity.vy * this._velocity.speedAdjustment * ms
    }

    if (this._directionalShooting === 'bottomY') {
      this.position.y +=
        -this._velocity.vy * this._velocity.speedAdjustment * ms
    }
  }

  public draw(): void {
    this._image.update()

    this._ctx.drawImage(
      this._image.view,
      this.position.x - this._image.view.width / 2,
      this.position.y - this._image.view.height / 2
    )
  }
}
