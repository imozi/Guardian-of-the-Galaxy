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
        return { maxEnemyShoot: 3, minPercent: 0.4, maxEnemyAttack: 1 }
      case level === 2:
        return { maxEnemyShoot: 4, minPercent: 0.3, maxEnemyAttack: 2 }
      case level === 3:
        return { maxEnemyShoot: 5, minPercent: 0.2, maxEnemyAttack: 3 }
      default:
        return { maxEnemyShoot: 6, minPercent: 0.1, maxEnemyAttack: 4 }
    }
  },
}
