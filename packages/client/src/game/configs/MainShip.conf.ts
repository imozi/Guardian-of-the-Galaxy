export const MAIN_SHIP_CONFIG = {
  positionAdjustment: {
    bottomIndent: 30,
    adjustmentSize: 24,
    topPositionLimit: 0.8,
  },
  helthPoint: 100,
  velocity: {
    speedAdjustment: 100,
    vx: 2,
    vy: 2,
  },
  rotarion: 25,
  image: {
    full: {
      src: "images/main_ship/main_ship_full.png",
      sw: 30,
      sh: 33,
      frameRate: 6,
    },
    slightDamage: {
      src: "images/main_ship/main_ship_slight_damage.png",
      sw: 30,
      sh: 33,
      frameRate: 6,
    },
    damage: {
      src: "images/main_ship/main_ship_damage.png",
      sw: 30,
      sh: 33,
      frameRate: 6,
    },
    veryDamage: {
      src: "images/main_ship/main_ship_vary_damage.png",
      sw: 30,
      sh: 33,
      frameRate: 6,
    },
    die: {
      src: "images/main_ship/main_ship_die.png",
      sw: 100,
      sh: 100,
      frameRate: 1,
    },
  },
  weapon: "rocket",
  maxAmmunition: 2,
};
