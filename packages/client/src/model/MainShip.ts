import { Gif } from '../utils/gif'
import { SHIP_ENTITY } from '../utils/consts'
import { rotateObject } from '../utils/game'

export default class MainShip {
  private _rightPressed = false
  private _leftPressed = false
  private _upPressed = false
  private _downPressed = false
  private _rotation = SHIP_ENTITY.rotation
  private readonly _canvasWidth: number
  private readonly _canvasHeight: number
  private readonly _velocity: number
  private readonly _width: number
  private readonly _height: number
  private _x: number
  private _y: number
  private _ship: Gif
  private _shipLeft: Gif
  private _shipRight: Gif

  constructor(canvasWidth: number, canvasHeight: number) {
    this._canvasWidth = canvasWidth
    this._canvasHeight = canvasHeight
    this._velocity = SHIP_ENTITY.velocity

    this._x = this._canvasWidth / 2
    this._y = this._canvasHeight - SHIP_ENTITY.bottomIdent
    this._width = SHIP_ENTITY.width
    this._height = SHIP_ENTITY.height
    this._ship = new Gif({ url: SHIP_ENTITY.src })
    this._shipLeft = new Gif({ url: SHIP_ENTITY.srcLeft })
    this._shipRight = new Gif({ url: SHIP_ENTITY.srcRight })

    document.addEventListener('keydown', this._onKeydown)
    document.addEventListener('keyup', this._onKeyup)
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this._move()
    this._checkWalls()

    const { _x, _y, _width, _height } = this

    const drawImageParams: [number, number, number, number] = [
      _x,
      _y,
      _width,
      _height,
    ]
    const rotateParams: [number, number] = [_x + _width / 2, _y + _height / 2]

    if (this._rightPressed) {
      rotateObject(ctx, this._rotation, ...rotateParams)
      ctx.drawImage(this._shipRight.image, ...drawImageParams)
    } else if (this._leftPressed) {
      rotateObject(ctx, -this._rotation, ...rotateParams)
      ctx.drawImage(this._shipLeft.image, ...drawImageParams)
    } else {
      ctx.drawImage(this._ship.image, ...drawImageParams)
    }
  }

  private _checkWalls(): void {
    const widthDiff = this._canvasWidth - this._width
    const heightDiff = this._canvasHeight - this._height
    switch (true) {
      // left
      case this._x < 0:
        this._x = 0
        break
      // up
      case this._y < 0:
        this._y = 0
        break
      // right
      case this._x > widthDiff:
        this._x = widthDiff
        break
      // down
      case this._y > heightDiff:
        this._y = heightDiff
        break
    }
  }

  private _move(): void {
    switch (true) {
      case this._rightPressed:
        this._x += this._velocity
        break
      case this._leftPressed:
        this._x += -this._velocity
        break
      case this._upPressed:
        this._y += -this._velocity
        break
      case this._downPressed:
        this._y += this._velocity
        break
    }
  }

  private _onKeydown = (event: KeyboardEvent): void => {
    switch (event.code) {
      case 'ArrowRight':
      case 'KeyD':
        this._rightPressed = true
        break
      case 'ArrowLeft':
      case 'KeyA':
        this._leftPressed = true
        break
      case 'ArrowUp':
      case 'KeyW':
        this._upPressed = true
        break
      case 'ArrowDown':
      case 'KeyS':
        this._downPressed = true
        break
    }
  }

  private _onKeyup = (event: KeyboardEvent): void => {
    switch (event.code) {
      case 'ArrowRight':
      case 'KeyD':
        this._rightPressed = false
        break
      case 'ArrowLeft':
      case 'KeyA':
        this._leftPressed = false
        break
      case 'ArrowUp':
      case 'KeyW':
        this._upPressed = false
        break
      case 'ArrowDown':
      case 'KeyS':
        this._downPressed = false
        break
    }
  }

  public getX() {
    return this._x
  }

  public getY() {
    return this._y
  }
}
