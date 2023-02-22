import { WeaponsConf } from '@/types/game'

export const WEAPON_CONFIG: WeaponsConf = {
  enemy: {
    greanBlast: {
      url: 'images/weapons/enemy/greanblast.png',
      sw: 5,
      sh: 10,
      frameRate: 6,
      damage: 100,
      velocity: {
        speedAdjustment: 100,
        vx: 2,
        vy: 2.1,
      },
    },
    orangeBlast: {
      url: 'images/weapons/enemy/orangeblast.png',
      sw: 6,
      sh: 12,
      frameRate: 6,
      damage: 100,
      velocity: {
        speedAdjustment: 100,
        vx: 2,
        vy: 2.2,
      },
    },
    cannonBullet: {
      url: 'images/weapons/enemy/cannon_bullet.png',
      sw: 10,
      sh: 17,
      frameRate: 6,
      damage: 100,
      velocity: {
        speedAdjustment: 100,
        vx: 2,
        vy: 2.3,
      },
    },
    rocket: {
      url: 'images/weapons/enemy/rocket.png',
      sw: 7,
      sh: 18,
      frameRate: 6,
      damage: 100,
      velocity: {
        speedAdjustment: 100,
        vx: 2,
        vy: 2.5,
      },
    },
    bigSpaceGun: {
      url: 'images/weapons/enemy/big_space_gun.png',
      sw: 32,
      sh: 32,
      frameRate: 3,
      damage: 100,
      velocity: {
        speedAdjustment: 100,
        vx: 2,
        vy: 2.5,
      },
    },
  },

  mainShip: {
    rocket: {
      url: 'images/weapons/main_ship/rocket.png',
      sw: 7,
      sh: 27,
      frameRate: 6,
      damage: 100,
      velocity: {
        speedAdjustment: 100,
        vx: 3,
        vy: 3,
      },
    },
  },
}
