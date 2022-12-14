import { Frame, GifReader } from 'omggif'
import axios, { isAxiosError } from 'axios'

interface IGif {
  url: string
  loop?: boolean
}

interface IFrame extends Frame {
  pixels: Uint8ClampedArray
}

export class Gif {
  public image = document.createElement('canvas')
  public width = 0
  public height = 0
  private _url: string
  private _loop: boolean
  private _loopCount = 0
  private _reader: GifReader | null
  private _frames: IFrame[] = []
  private _currentFrame = 0
  private _running: boolean
  private _delayCompensation = 0
  private _lastTime = 0
  private _ctx = this.image.getContext('2d') as CanvasRenderingContext2D

  constructor({ url, loop = true }: IGif) {
    this._url = url
    this._loop = loop
    this._reader = null
    this._running = false

    this._init()
  }

  private _generateFrames(): void {
    if (!this._reader) {
      return
    }

    this._frames = [...Array(this._reader.numFrames()).keys()].map(
      (_, index) => {
        const reader = this._reader as GifReader
        const { width, height } = reader
        const frame = reader.frameInfo(index) as IFrame

        frame.pixels = new Uint8ClampedArray(width * height * 4)
        reader.decodeAndBlitFrameRGBA(index, frame.pixels)

        return frame
      }
    )
  }

  private _createCanvasFromFrame(frame: IFrame): HTMLCanvasElement {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    canvas.width = this.width
    canvas.height = this.height

    const imageData = ctx.createImageData(this.width, this.height)
    imageData.data.set(frame.pixels)
    ctx.putImageData(imageData, 0, 0)

    return canvas
  }

  private _getNextFrame(): HTMLCanvasElement {
    if (this._currentFrame >= this._frames.length - 1) {
      this._currentFrame = 0
      this._loopCount++
    }

    const frame = this._frames[this._currentFrame]

    return this._createCanvasFromFrame(frame)
  }

  private _frameRender = (): void => {
    let actualDelay, frame, delta, frameDelay

    while (this._running) {
      frame = this._frames[this._currentFrame]
      delta = new Date().valueOf() - this._lastTime
      frameDelay = frame.delay * 10
      this._lastTime += delta
      this._delayCompensation += delta

      actualDelay = frameDelay - this._delayCompensation
      this._delayCompensation -= frameDelay

      if (actualDelay < 0) {
        continue
      }

      const image = this._getNextFrame()

      if (!this._loop && this._loopCount === 1) {
        this._ctx.clearRect(0, 0, this.width, this.height)
        this._stop()
        break
      }

      this._currentFrame++

      this._ctx.clearRect(0, 0, this.width, this.height)
      this._ctx.drawImage(image, 0, 0)

      setTimeout(() => {
        this._nextFrame()
      }, actualDelay)

      break
    }
  }

  private _start = (): void => {
    this._lastTime = new Date().valueOf()
    this._running = true
    setTimeout(this._nextFrame, 0)
  }

  private _nextFrame = (): void => {
    requestAnimationFrame(this._frameRender)
  }

  private _stop(): void {
    this._running = false
  }

  private async _init(): Promise<void> | never {
    try {
      const buff = await axios
        .get(this._url, { responseType: 'arraybuffer' })
        .then(({ data }) => data)
      this._reader = new GifReader(new Uint8Array(buff))
    } catch (error) {
      if (isAxiosError(error)) {
        throw new Error(error.response?.data.reason)
      }
    }

    if (this._reader) {
      const { width, height } = this._reader

      this.image.width = this.width = width
      this.image.height = this.height = height
    }

    this._generateFrames()
    this._start()
  }
}
