export const GAME_CONFIG = {
  canvasSize: {
    margin: 50,
    adjustmentWidth: 0.7,
    minWidth: 1000,
  },
  maxAmmunition: 2,
  level: 1,
  life: 3,
  difficulty: (level: number) => {
    switch (true) {
      case level === 1:
        return { maxEnemyShoot: 5, minPercent: 0.1, maxEnemyAttack: 2 }
      case level === 2:
        return { maxEnemyShoot: 6, minPercent: 0.09, maxEnemyAttack: 3 }
      case level === 3:
        return { maxEnemyShoot: 7, minPercent: 0.08, maxEnemyAttack: 4 }
      case level === 4:
        return { maxEnemyShoot: 8, minPercent: 0.07, maxEnemyAttack: 5 }
      case level === 5:
        return { maxEnemyShoot: 9, minPercent: 0.06, maxEnemyAttack: 6 }
      case level === 6:
        return { maxEnemyShoot: 10, minPercent: 0.05, maxEnemyAttack: 7 }
      default:
        return { maxEnemyShoot: 11, minPercent: 0.04, maxEnemyAttack: 11 }
    }
  },
}
