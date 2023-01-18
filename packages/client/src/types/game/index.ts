import { Weapon } from '@/game/model/Weapons'
import { Picture } from '@/core/Picture'
import { PictureProps } from '../core'

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

export interface IEnemyShipProps extends MainSettingsProps {
  position: Position
  velocity: Velocity
  image: {
    ship: PictureProps
    die: PictureProps
  }
  damageLimit: number
  typeWeapon: string
  ammunition: Weapon[]
  score: number
  helthPoint: number
}

export enum EnemyGroup {
  klaed = 'klaed',
  nairan = 'nairan',
  nautolan = 'nautolan',
}

enum EnemyType {
  dreadnought = 'dreadnought',
  battlecruiser = 'battlecruiser',
  torpedo = 'torpedo',
  support = 'support',
  frigate = 'frigate',
  bomber = 'bomber',
  fighter = 'fighter',
  scout = 'scout',
}

export type EnemyTypeStrings = keyof typeof EnemyType
export type EnemyTypeArray = EnemyTypeStrings[]

export type EnemyConf = {
  image: PictureProps
  weapon: string
  damageLimit: number
  helthPoint: number
  velocity: Velocity
  score: number
}

type EnemyTypeList = Record<EnemyType, EnemyConf>

type EnemiesConf = {
  maxEnemyImageSizeHeight: number
  ship: EnemyTypeList
}

type GroupEnemies = Record<EnemyGroup, EnemiesConf>

export interface IEnemyShipsConf extends GroupEnemies {
  die: PictureProps
}
