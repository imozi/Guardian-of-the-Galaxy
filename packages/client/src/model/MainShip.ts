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

    if (this._rightPressed) {
      rotateObject(
        ctx,
        this._rotation,
        this._x + this._width / 2,
        this._y + this._height / 2
      )
      ctx.drawImage(
        this._shipRight.image,
        this._x,
        this._y,
        this._width,
        this._height
      )
    } else if (this._leftPressed) {
      rotateObject(
        ctx,
        -this._rotation,
        this._x + this._width / 2,
        this._y + this._height / 2
      )
      ctx.drawImage(
        this._shipLeft.image,
        this._x,
        this._y,
        this._width,
        this._height
      )
    } else {
      ctx.drawImage(
        this._ship.image,
        this._x,
        this._y,
        this._width,
        this._height
      )
    }

    ctx.restore()
    ctx.save()
  }

  private _checkWalls(): void {
    //left
    if (this._x < 0) {
      this._x = 0
    }

    //up
    if (this._y < 0) {
      this._y = 0
    }

    //right
    if (this._x > this._canvasWidth - this._width) {
      this._x = this._canvasWidth - this._width
    }

    //down
    if (this._y > this._canvasHeight - this._height) {
      this._y = this._canvasHeight - this._height
    }
  }

  private _move(): void {
    if (this._rightPressed) {
      this._x += this._velocity
    } else if (this._leftPressed) {
      this._x += -this._velocity
    } else if (this._upPressed) {
      this._y += -this._velocity
    } else if (this._downPressed) {
      this._y += this._velocity
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
}
