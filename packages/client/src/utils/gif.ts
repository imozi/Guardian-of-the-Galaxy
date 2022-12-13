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
  private _url: string
  private _loop: boolean
  private _loopCount: number
  private _reader: GifReader | null
  private _frames: IFrame[] = []
  private _currentFrame: number
  private _running: boolean
  private _delayCompensation: number
  private _lastTime: number
  private _ctx: CanvasRenderingContext2D | null
  public image: HTMLCanvasElement
  public width: number
  public height: number

  constructor({ url, loop = true }: IGif) {
    this._url = url
    this._loop = loop
    this._reader = null
    this._currentFrame = 0
    this._lastTime = 0
    this._loopCount = 0
    this._delayCompensation = 0
    this._running = false
    this.image = document.createElement('canvas')
    this._ctx = this.image.getContext('2d')
    this.width = 0
    this.height = 0

    this._init()
  }

  private _generateFrames(): void {
    if (this._reader) {
      this._frames = [...Array(this._reader.numFrames()).keys()].map(
        (_, index) => {
          const frame = this._reader?.frameInfo(index) as IFrame
          const width = this._reader?.width
          const height = this._reader?.height

          if (width && height) {
            frame.pixels = new Uint8ClampedArray(width * height * 4)
          }

          this._reader?.decodeAndBlitFrameRGBA(index, frame.pixels)
          return frame
        }
      )
    }
  }

  private _createCanvasFromFrame(frame: IFrame): HTMLCanvasElement {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = this.width
    canvas.height = this.height

    const imageData = ctx?.createImageData(this.width, this.height)

    if (imageData) {
      imageData.data.set(frame.pixels)
      ctx?.putImageData(imageData, 0, 0)
    }

    return canvas
  }

  private _getNextFrame(): HTMLCanvasElement {
    if (this._currentFrame >= this._frames.length - 1) {
      this._currentFrame = 0
      this._loopCount++
    }

    const frame = this._createCanvasFromFrame(this._frames[this._currentFrame])

    return frame
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
        this._ctx?.clearRect(0, 0, this.width, this.height)
        this._stop()
        break
      }

      this._currentFrame++

      this._ctx?.clearRect(0, 0, this.width, this.height)
      this._ctx?.drawImage(image, 0, 0)

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
      this.width = this._reader.width
      this.height = this._reader.height

      this.image.width = this.width
      this.image.height = this.height
    }

    this._generateFrames()
    this._start()
  }
}
