import { Weapon } from '@/game/model/Weapons'
import { Picture } from '@/core/Picture'

export type Position = { x: number; y: number }

export type Velocity = { vx: number; vy: number; speedAdjustment: number }

export type CanvasSize = { w: number; h: number }

export type SizeSprite = { w: number; h: number }

export type DirectionalShooting = 'topY' | 'bottomY' | 'topX' | 'bottomX'

export type FabricWeapon = (
  position: Position,
  directionalShooting: DirectionalShooting,
  damageLimit?: number
) => Weapon

export type WeaponCollection = Record<string, FabricWeapon>

export type PictureCollection = Record<string, Picture>

export type MainSettingsProps = {
  canvasSize: CanvasSize
  ctx: CanvasRenderingContext2D
  weapons: Record<string, FabricWeapon>
}

export enum EnemyGroup {
  klaed = 'klaed',
  nairan = 'nairan',
  nautolan = 'nautolan',
}

export enum EnemyType {
  dreadnought = 'dreadnought',
  battlecruiser = 'battlecruiser',
  torpedo = 'torpedo',
  support = 'support',
  frigate = 'frigate',
  bomber = 'bomber',
  fighter = 'fighter',
  scout = 'scout',
}
