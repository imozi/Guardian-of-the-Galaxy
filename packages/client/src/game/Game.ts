import { EventBus } from '@/core/EventBus'
import { GAME_CONFIG } from './configs/Game.conf'
import { MainShip } from './model/MainShip'
import { EnemyShip } from './model/EnemyShip'
import { Weapons } from './model/Weapons'
import { CollisionController } from './model/CollisionController'
import { EnemyController } from './model/EnemyController'
import { GameLoop } from '@/core/GameLoop'

export class GuardianOfTheGalaxy extends EventBus {
  static EVENTS = {
    INIT: 'flow:INIT',
    GAME_END: 'flow:game_end',
    UPDATE_LEVEL: 'flow:update_level',
    UPDATE_SCORE: 'flow:update_score',
    UPDATE_LIVE: 'flow:update_live',
    UPDATE_AMMUN: 'flow:update_ammun',
  }

  private _root: HTMLElement
  private _mainShip: MainShip
  private _collisionController: CollisionController
  private _enemyController: EnemyController
  private _canvas = document.createElement('canvas')
  private _ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D
  private _canvasSize = { w: 0, h: 0 }
  private _loop: GameLoop
  private _weapons: Weapons
  private _isRunning = false
  private _isGameEnd = false
  public mainShipAmmun = GAME_CONFIG.maxAmmunition
  public score = 0
  public hightScore = Number(localStorage.getItem('GOTG:hightScore')) || 0
  public life = GAME_CONFIG.life
  public level = GAME_CONFIG.level

  constructor(root: HTMLElement) {
    super()

    this._root = root
    this._canvasResize()
    this._loop = new GameLoop({
      fps: 60,
      update: this._update,
      render: this._draw,
    })

    this._weapons = new Weapons({ ctx: this._ctx })

    this._mainShip = new MainShip({
      canvasSize: this._canvasSize,
      ctx: this._ctx,
      weapons: this._weapons.main,
    })

    this._enemyController = new EnemyController({
      canvasSize: this._canvasSize,
      ctx: this._ctx,
      weapons: this._weapons.emeny,
      mainShipPosition: this._mainShip.position,
    })

    this._collisionController = new CollisionController({
      mainShip: this._mainShip,
      enemyShips: this._enemyController.enemiesShips,
      enemyАmmunition: this._enemyController.enemyАmmunition,
    })

    this._enemyController.generateEnemiesShips()

    this._offEvents()
    this._onEvents()

    this.emit(GuardianOfTheGalaxy.EVENTS.INIT)
  }

  private _init(): void {
    this._root.appendChild(this._canvas)
    window.addEventListener('resize', this._canvasResize)
  }

  private _onEvents(): void {
    this.on(GuardianOfTheGalaxy.EVENTS.INIT, this._init.bind(this))
    this._mainShip.on(MainShip.EVENTS.DIE, this._decrementLive.bind(this))
    this._enemyController.enemiesShips.forEach(enemy => {
      enemy.on(EnemyShip.EVENTS.HIT, this._updateScore.bind(this))
    })
  }

  private _offEvents(): void {
    this.off(GuardianOfTheGalaxy.EVENTS.INIT, this._init.bind(this))
    this._mainShip.off(MainShip.EVENTS.DIE, this._decrementLive.bind(this))
    this._enemyController.enemiesShips.forEach(enemy => {
      enemy.off(EnemyShip.EVENTS.HIT, this._updateScore.bind(this))
    })
  }

  private _updateScore = (score: number): void => {
    this.score += score
    this.emit(GuardianOfTheGalaxy.EVENTS.UPDATE_SCORE, this.score)
  }

  private _updateAmmun = () => {
    this.mainShipAmmun = GAME_CONFIG.maxAmmunition

    if (this._mainShip.ammunition.length !== 0) {
      this.mainShipAmmun -= this._mainShip.ammunition.length
    }

    this.emit(GuardianOfTheGalaxy.EVENTS.UPDATE_AMMUN, this.mainShipAmmun)
  }

  private _canvasResize = (): void => {
    this._canvasSize.w = this._canvas.width = this._root.clientWidth
    this._canvasSize.h = this._canvas.height = this._root.clientHeight
  }

  private _nextLevel(): void {
    if (
      !this._enemyController.enemiesShips.length &&
      !this._mainShip.ammunition.length
    ) {
      this._enemyController.generateEnemiesShips()
      this._enemyController.enemiesShips.forEach(enemy => {
        enemy.on(EnemyShip.EVENTS.HIT, this._updateScore.bind(this))
      })

      this.level++
      this.emit(GuardianOfTheGalaxy.EVENTS.UPDATE_LEVEL, this.level)
    }
  }

  private _update = (ms: number): void => {
    const difficulty = GAME_CONFIG.difficulty(this.level)

    if (!this._isGameEnd) {
      this._enemyController.update(ms)
      this._collisionController.update()
      this._collisionController._mainShipAmmunitionCollisionDetection()
      this._collisionController._enemyAmmunitionCollisionDetection()
      this._mainShip.update(ms)
      this._nextLevel()
      this._gameEnd()
      this._updateAmmun()
      this._enemyController.attacke(
        difficulty.minPercent,
        difficulty.maxEnemyShoot,
        difficulty.maxEnemyAttack
      )
    }
  }

  private _decrementLive(): void {
    this.life--
    this.emit(GuardianOfTheGalaxy.EVENTS.UPDATE_LIVE, this.life)
  }

  private saveLocalStorage(): void {
    if (this.score > this.hightScore) {
      localStorage.setItem('GOTG:hightScore', this.score.toString())
    }
  }

  private _gameEnd(): void {
    if (this.life === 0) {
      this._isGameEnd = true
      this.stop()
      this._enemyController.reset()
      this._mainShip.destroy()
      this.saveLocalStorage()
      this.emit(
        GuardianOfTheGalaxy.EVENTS.GAME_END,
        this.level,
        this.score,
        localStorage.getItem('GOTG:hightScore')
      )
    }
  }

  private _draw = (): void => {
    this._ctx.clearRect(0, 0, this._canvasSize.w, this._canvasSize.h)

    if (!this._isGameEnd) {
      this._enemyController.draw()
      this._mainShip.draw()
      this._enemyController.enemiesShips.forEach(enemy => {
        enemy.draw()
      })
    }
  }

  public stop(): void {
    if (!this._isRunning) {
      return
    }

    this._isRunning = false
    this._mainShip.destroy()
    this._loop.stop()
  }

  public resume(): void {
    if (this._isRunning) {
      return
    }

    this._loop.restart()
    this._isRunning = true
    this._mainShip.emit(MainShip.EVENTS.INIT)
  }

  public restart(): void {
    if (this._isRunning && !this._isGameEnd) {
      return
    }

    this._loop.restart()
    this._isRunning = true
    this._isGameEnd = false
    this.life = GAME_CONFIG.life
    this.level = GAME_CONFIG.level
    this.score = 0
    this._mainShip.reset()
    this._enemyController.generateEnemiesShips()
    this._enemyController.enemiesShips.forEach(enemy => {
      enemy.on(EnemyShip.EVENTS.HIT, this._updateScore.bind(this))
    })

    this.emit(GuardianOfTheGalaxy.EVENTS.UPDATE_LEVEL, this.level)
    this.emit(GuardianOfTheGalaxy.EVENTS.UPDATE_SCORE, this.score)
    this.emit(GuardianOfTheGalaxy.EVENTS.UPDATE_LIVE, this.life)
  }

  public start(): void {
    if (this._isRunning) {
      return
    }

    this._isRunning = true
    requestAnimationFrame(this._loop.start)
    this._mainShip.emit(MainShip.EVENTS.INIT)
  }

  public destroy(): void {
    this._loop.destroy()
    this._mainShip.destroy()
    this._mainShip.ammunition.length = 0
    this._enemyController.destroy()
    this._canvas.remove()
    window.removeEventListener('resize', this._canvasResize)
  }
}
