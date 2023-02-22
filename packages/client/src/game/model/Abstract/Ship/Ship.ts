import { EventBus } from '@/core/EventBus'
import { CanvasSize, MainSettingsProps, WeaponCollection } from '@/types/game'

export abstract class Ship extends EventBus {
  static EVENTS = { INIT: 'flow:init', DIE: 'flow:die', HIT: 'flow:hit' }

  protected _canvasSize: CanvasSize
  protected _ctx: CanvasRenderingContext2D
  protected _weapons: WeaponCollection

  constructor({ canvasSize, ctx, weapons }: MainSettingsProps) {
    super()
    this._canvasSize = canvasSize
    this._ctx = ctx
    this._weapons = weapons
  }

  abstract destroy(): void

  abstract update(ms: number): void

  abstract draw(): void
}
