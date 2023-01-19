import { Ship } from '../Abstract/Ship'
import { GAME_CONFIG } from '@/game/configs/Game.conf'
import { MAIN_SHIP_CONFIG } from '../../configs/MainShip.conf'
import { Picture } from '@/core/Picture/Picture'
import { Weapon } from '../Weapons'
import { throttle } from '@/core/utils'
import { MainSettingsProps, Position, SizeSprite, Velocity } from '@/types/game'

type ShipImage = {
  full: Picture
  slightDamage: Picture
  damage: Picture
  veryDamage: Picture
  die: Picture
}

type KeyPress = {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
  space: boolean
}

export class MainShip extends Ship implements Ship {
  static EVENTS = {
    INIT: 'flow:init',
    DIE: 'flow:die',
    HIT: 'flow:hit',
  }

  private _velocity: Velocity
  private _keyPress: KeyPress
  private _ship: ShipImage
  private _helthPoint = MAIN_SHIP_CONFIG.helthPoint
  private _typeWeapon: string
  private _maxAmmunition = GAME_CONFIG.maxAmmunition
  public sizeSprite: SizeSprite
  public position: Position
  public ammunition: Weapon[] = []

  constructor({ canvasSize, ctx, weapons }: MainSettingsProps) {
    super({ canvasSize, ctx, weapons })

    this._ship = {
      full: new Picture({
        url: MAIN_SHIP_CONFIG.image.full.src,
        sw: MAIN_SHIP_CONFIG.image.full.sw,
        sh: MAIN_SHIP_CONFIG.image.full.sh,
        frameRate: MAIN_SHIP_CONFIG.image.full.frameRate,
      }),
      slightDamage: new Picture({
        url: MAIN_SHIP_CONFIG.image.slightDamage.src,
        sw: MAIN_SHIP_CONFIG.image.slightDamage.sw,
        sh: MAIN_SHIP_CONFIG.image.slightDamage.sh,
        frameRate: MAIN_SHIP_CONFIG.image.slightDamage.frameRate,
      }),
      damage: new Picture({
        url: MAIN_SHIP_CONFIG.image.damage.src,
        sw: MAIN_SHIP_CONFIG.image.damage.sw,
        sh: MAIN_SHIP_CONFIG.image.damage.sh,
        frameRate: MAIN_SHIP_CONFIG.image.damage.frameRate,
      }),
      veryDamage: new Picture({
        url: MAIN_SHIP_CONFIG.image.veryDamage.src,
        sw: MAIN_SHIP_CONFIG.image.veryDamage.sw,
        sh: MAIN_SHIP_CONFIG.image.veryDamage.sh,
        frameRate: MAIN_SHIP_CONFIG.image.veryDamage.frameRate,
      }),
      die: new Picture({
        url: MAIN_SHIP_CONFIG.image.die.src,
        sw: MAIN_SHIP_CONFIG.image.die.sw,
        sh: MAIN_SHIP_CONFIG.image.die.sh,
        frameRate: MAIN_SHIP_CONFIG.image.die.frameRate,
        loop: false,
      }),
    }

    this.sizeSprite = {
      w: this._ship.full.view.width,
      h: this._ship.full.view.height,
    }

    this._keyPress = {
      up: false,
      down: false,
      left: false,
      right: false,
      space: false,
    }

    this.position = {
      x: this._canvasSize.w / 2,
      y: this._canvasSize.h,
    }

    this._velocity = MAIN_SHIP_CONFIG.velocity
    this._typeWeapon = MAIN_SHIP_CONFIG.weapon
    this._shoot = throttle(this._shoot, 500)

    this._offEvets()
    this._onEvets()
  }

  private _init(): void {
    document.addEventListener('keydown', this._onKeydown)
    document.addEventListener('keyup', this._onKeyup)
  }

  private _onEvets(): void {
    this.on(MainShip.EVENTS.INIT, this._init.bind(this))
    this.on(MainShip.EVENTS.HIT, this._hit.bind(this))
    this._ship.die.on(Picture.EVENTS.ANIM_ENDED, this._die.bind(this))
  }

  private _offEvets(): void {
    this.off(MainShip.EVENTS.INIT, this._init.bind(this))
    this.off(MainShip.EVENTS.HIT, this._hit.bind(this))
    this._ship.die.off(Picture.EVENTS.ANIM_ENDED, this._die.bind(this))
  }

  private _onKeydown = (event: KeyboardEvent): void => {
    switch (event.code) {
      case 'ArrowRight':
      case 'KeyD':
        this._keyPress.right = true
        break
      case 'ArrowLeft':
      case 'KeyA':
        this._keyPress.left = true
        break
      case 'ArrowUp':
      case 'KeyW':
        this._keyPress.up = true
        break
      case 'ArrowDown':
      case 'KeyS':
        this._keyPress.down = true
    }
  }

  private _onKeyup = (event: KeyboardEvent): void => {
    switch (event.code) {
      case 'ArrowRight':
      case 'KeyD':
        this._keyPress.right = false
        break
      case 'ArrowLeft':
      case 'KeyA':
        this._keyPress.left = false
        break
      case 'ArrowUp':
      case 'KeyW':
        this._keyPress.up = false
        break
      case 'ArrowDown':
      case 'KeyS':
        this._keyPress.down = false
        break
      case 'Space':
        this._shoot()
    }
  }

  private _positionUpdate(ms: number): void {
    if (this._helthPoint <= 0) {
      return
    }

    const { adjustmentSize, topPositionLimit, bottomIndent } =
      MAIN_SHIP_CONFIG.positionAdjustment
    const speedAdjustment = MAIN_SHIP_CONFIG.velocity.speedAdjustment
    const limitationTopY = this._canvasSize.h * topPositionLimit
    const limitationBottomY = this._canvasSize.h - adjustmentSize - bottomIndent
    const limitationRight = this._canvasSize.w - adjustmentSize
    const direction = {
      x: 0,
      y: 0,
    }

    if (this.position.y > limitationBottomY) {
      const dy = this.position.y - limitationBottomY
      this.position.y -= dy / (ms * 1000)
    }

    if (this.position.y < limitationTopY) {
      const dy = this.position.y - limitationTopY
      this.position.y -= dy / (ms * 1000)
    }

    if (this.position.x > limitationRight) {
      const dx = this.position.x - limitationRight
      this.position.x -= dx / (ms * 1000)
    }

    if (
      this._keyPress.right &&
      !this._keyPress.left &&
      this.position.x < this._canvasSize.w - adjustmentSize
    ) {
      direction.x = this._velocity.vx * speedAdjustment * ms
    }

    if (
      this._keyPress.left &&
      !this._keyPress.right &&
      this.position.x >= adjustmentSize
    ) {
      direction.x = -this._velocity.vx * speedAdjustment * ms
    }

    if (this._keyPress.up && this.position.y > limitationTopY) {
      direction.y = -this._velocity.vx * speedAdjustment * ms
    }

    if (
      this._keyPress.down &&
      this.position.y <= this._canvasSize.h - adjustmentSize - bottomIndent
    ) {
      direction.y = this._velocity.vy * speedAdjustment * ms
    }

    this.position.x += direction.x
    this.position.y += direction.y
  }

  private _resetPosition(): void {
    this.position = {
      x: this._canvasSize.w / 2,
      y: this._canvasSize.h,
    }
  }

  private _shoot = (): void => {
    if (this.ammunition.length < this._maxAmmunition) {
      const {
        position: { x, y },
        _typeWeapon,
        _ship,
      } = this

      this.ammunition.push(
        this._weapons[_typeWeapon](
          { x, y: y - _ship.full.view.height / 2 },
          'bottomY'
        )
      )
    }
  }

  private _die(): void {
    this.emit(MainShip.EVENTS.DIE)
    this._helthPoint = MAIN_SHIP_CONFIG.helthPoint
    this._resetPosition()
    this._ship.die.reset()
  }

  private _hit(damage: number): void {
    this._helthPoint -= damage
  }

  public hit(damage: number): void {
    this.emit(MainShip.EVENTS.HIT, damage)
  }

  public update = (ms: number): void => {
    this._positionUpdate(ms)

    if (this.ammunition.length) {
      this.ammunition.forEach(ammunition => {
        ammunition.update(ms)
      })
    }
  }

  public draw = (): void => {
    const drawDie = () => {
      this._ship.die.update()
      this._ctx.drawImage(
        this._ship.die.view,
        this.position.x - this._ship.die.view.width / 2,
        this.position.y - this._ship.die.view.height / 2
      )
    }

    const drawAammunition = () => {
      this.ammunition.forEach(ammunition => {
        ammunition.draw()
      })
    }

    const drawShip = (rotation: number) => {
      this._ship.full.rotation = rotation
      this._ship.slightDamage.rotation = rotation
      this._ship.damage.rotation = rotation
      this._ship.veryDamage.rotation = rotation

      if (this._helthPoint === 100) {
        this._ship.full.update()
        this._ctx.drawImage(
          this._ship.full.view,
          this.position.x - this._ship.full.view.width / 2,
          this.position.y - this._ship.full.view.height / 2
        )
      }

      if (this._helthPoint < 100 && this._helthPoint >= 75) {
        this._ship.slightDamage.update()
        this._ctx.drawImage(
          this._ship.slightDamage.view,
          this.position.x - this._ship.slightDamage.view.width / 2,
          this.position.y - this._ship.slightDamage.view.height / 2
        )
      }

      if (this._helthPoint < 75 && this._helthPoint > 25) {
        this._ship.damage.update()
        this._ctx.drawImage(
          this._ship.damage.view,
          this.position.x - this._ship.damage.view.width / 2,
          this.position.y - this._ship.damage.view.height / 2
        )
      }

      if (this._helthPoint <= 25 && this._helthPoint > 0) {
        this._ship.veryDamage.update()
        this._ctx.drawImage(
          this._ship.veryDamage.view,
          this.position.x - this._ship.veryDamage.view.width / 2,
          this.position.y - this._ship.veryDamage.view.height / 2
        )
      }
    }

    if (this._helthPoint <= 0) {
      drawDie()
      return
    }

    if (this.ammunition.length) {
      drawAammunition()
    }

    if (this._keyPress.right) {
      drawShip(MAIN_SHIP_CONFIG.rotarion)
    } else if (this._keyPress.left) {
      drawShip(-MAIN_SHIP_CONFIG.rotarion)
    } else {
      drawShip(0)
    }
  }

  public reset = (): void => {
    document.addEventListener('keydown', this._onKeydown)
    document.addEventListener('keyup', this._onKeyup)
  }

  public destroy(): void {
    document.removeEventListener('keydown', this._onKeydown)
    document.removeEventListener('keyup', this._onKeyup)
  }
}
