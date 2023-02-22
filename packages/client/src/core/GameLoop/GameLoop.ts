type GameLoopProps = {
  fps: number
  update: (ms: number) => unknown
  render: () => unknown
}

export class GameLoop {
  private _fps: number
  private _currentFps = 0
  private _update: (ms: number) => unknown
  private _render: () => unknown
  private _ms = 1000
  private _fpsInterval: number
  private _startTime: number
  private _frameCount = 0
  private _previousTime = performance.now()
  private _isRunning = false
  public requestID = 0

  constructor({ fps, update, render }: GameLoopProps) {
    this._fps = fps
    this._fpsInterval = this._ms / this._fps
    this._startTime = this._previousTime
    this._update = update
    this._render = render
  }

  get fps() {
    return this._currentFps
  }

  private _loop = (timestamp: number): void => {
    this.requestID = requestAnimationFrame(this._loop)

    const elapsed = timestamp - this._previousTime

    if (elapsed > this._fpsInterval) {
      this._previousTime = timestamp - (elapsed % this._fpsInterval)

      const sinceStart = timestamp - this._startTime

      this._currentFps =
        Math.round((this._ms / (sinceStart / ++this._frameCount)) * 100) / 100

      this._update(this._fpsInterval / this._ms)
      this._render()
    }
  }

  public stop = (): void => {
    cancelAnimationFrame(this.requestID)
    this._startTime = 0
    this._frameCount = 0
    this._previousTime = 0
    this.requestID = 0
    this._isRunning = false
  }

  public restart = (): void => {
    if (this._isRunning) {
      this.stop()
    }

    this._previousTime = performance.now()
    this._startTime = this._previousTime
    this._loop(performance.now())
  }

  public start = (timestamp: number): void => {
    this._isRunning = true
    this._loop(timestamp)
  }

  public destroy = (): void => {
    cancelAnimationFrame(this.requestID)
  }
}
