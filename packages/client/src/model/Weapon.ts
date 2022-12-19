import { Gif } from '../utils/gif'
import { WEAPON_ENTITY } from '../utils/consts'

export default class Weapon {
  private readonly _velocity: number
  private readonly _width: number
  private readonly _height: number
  private _x: number
  private _y: number
  private _weapon: Gif

  constructor(
    x: number,
    y: number,
    velocity = WEAPON_ENTITY.velocity,
    width = WEAPON_ENTITY.width,
    height = WEAPON_ENTITY.height
  ) {
    this._x = x
    this._y = y
    this._velocity = velocity
    this._width = width
    this._height = height
    this._weapon = new Gif({ url: WEAPON_ENTITY.src })
  }

  private _draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this._weapon.image,
      this._x,
      this._y,
      this._width,
      this._height
    )
  }

  public update(ctx: CanvasRenderingContext2D) {
    this._draw(ctx)
    this._y -= this._velocity
  }

  public getY() {
    return this._y
  }
}
