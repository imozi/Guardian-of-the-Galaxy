import { EventBus } from '../EventBus'
import type { PictureProps } from '@/types/core'

export class Picture extends EventBus {
  static EVENTS = {
    ANIM_ENDED: 'flow:animation-ended',
  }

  private _url: string
  private _ctx: CanvasRenderingContext2D
  private _sy = 0
  private _sw: number
  private _sh: number
  private _currentFrame: number
  private _frameRate: number
  private _quantityFrames = 0
  private _quantityScreenFrames: number
  private _image: HTMLImageElement = new Image()
  private _play: boolean
  private _loopCount = 0
  private _loop: boolean
  public view: HTMLCanvasElement
  public rotation: number

  constructor({
    url,
    sw,
    sh,
    frameRate,
    rotation = 0,
    loop = true,
  }: PictureProps) {
    super()
    this.view = document.createElement('canvas')
    this.rotation = rotation
    this._ctx = this.view.getContext('2d') as CanvasRenderingContext2D
    this._url = url
    this._sw = sw
    this._sh = sh
    this._currentFrame = 0
    this._frameRate = frameRate
    this._quantityScreenFrames = 0
    this._play = false
    this._loop = loop
    this._loopCount = 0
    this._init()

    this.view.width = sw
    this.view.height = sh
  }

  private _nextFrame(): number {
    const position =
      this._sw *
      (Math.floor(this._quantityScreenFrames / this._frameRate) %
        this._quantityFrames)

    this._currentFrame++

    if (this._currentFrame >= this._quantityFrames) {
      this._currentFrame = 0
      this._loopCount++
    }

    return position
  }

  public update(): void {
    if (this._play) {
      this._ctx.clearRect(0, 0, this.view.width, this.view.height)

      if (this.rotation) {
        this._ctx.save()
        this._ctx.translate(this.view.width / 2, this.view.height / 2)
        this._ctx.rotate(this.rotation * (Math.PI / 180))
        this._ctx.translate(-this.view.width / 2, -this.view.height / 2)
        this._draw()
        this._ctx.restore()
      } else {
        this._draw()
      }

      this._quantityScreenFrames++
    }

    if (!this._loop && this._loopCount === 1) {
      this._stop()
    }
  }

  public reset() {
    this._play = true
    this._loopCount = 0
  }

  private _draw(): void {
    this._ctx.drawImage(
      this._image,
      this._nextFrame(),
      this._sy,
      this._sw,
      this._sh,
      0,
      0,
      this._sw,
      this._sh
    )
  }

  private _stop(): void {
    this._play = false
    this.emit(Picture.EVENTS.ANIM_ENDED)
  }

  private _init(): void {
    this._image.src = this._url

    this._image.onload = () => {
      this._quantityFrames = Math.round(this._image.width / this._sw)
      this._play = true
    }
  }
}
