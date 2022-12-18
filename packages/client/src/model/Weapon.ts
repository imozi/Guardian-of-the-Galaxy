import { Gif } from '../utils/gif'
import { WEAPON_ENTITY } from '../utils/consts'

export default class Weapon {
  private readonly _velocity: number
  private readonly _width: number
  private readonly _height: number
  private _x: number
  private _y: number
  private _weapon: Gif

  constructor(x: number, y: number) {
    this._x = x
    this._y = y
    this._velocity = WEAPON_ENTITY.velocity
    this._width = WEAPON_ENTITY.width
    this._height = WEAPON_ENTITY.height
    this._weapon = new Gif({ url: WEAPON_ENTITY.src })
  }

  private _draw(ctx: CanvasRenderingContext2D) {
    const { _x, _y, _width, _height } = this

    const drawImageParams: [number, number, number, number] = [
      _x,
      _y,
      _width,
      _height,
    ]

    ctx.drawImage(this._weapon.image, ...drawImageParams)
  }

  public update(ctx: CanvasRenderingContext2D) {
    this._draw(ctx)
    this._y -= this._velocity
  }

  public getY() {
    return this._y
  }
}
