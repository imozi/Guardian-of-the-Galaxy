const { VITE_REDIRECT_URL, VITE_MAIN_DOMAIN, PROD } = import.meta.env
export const API_URL = `${
  PROD ? VITE_MAIN_DOMAIN : 'http://localhost:3001'
}/api`
export const YA_API_URL = `${
  PROD ? VITE_MAIN_DOMAIN : 'http://localhost:3001'
}/api/ya`
export const REDIRECT_URL = `${
  PROD ? VITE_REDIRECT_URL : 'http://localhost:3000/user'
}`
export const API_RESOURCES_URL = `${
  PROD ? VITE_MAIN_DOMAIN : 'http://localhost:3001'
}/api/ya/resources`
export const TEAM_NAME = 'web2rists'
export const LEADERBOARD_DEFAULT_PAGE = 0
export const LEADERBOARD_LIMIT_PAGE = 100
export const LEADERBOARD_LIMIT_MAX_RESULT = 10
export const ANIMATION_STUB_TIME = 2000
export const TIMER_TIME = 1000
export const TIMER_START = 3
export const USER_THEME_DEFAULT = 'space'
export const REACTIONS: Record<string, any> = {
  jupiter: {
    label: 'jupiter',
    srcImg: '../../../images/spaceship/planet_1.png',
  },
  uranus: {
    label: 'uranus',
    srcImg: '../../../images/spaceship/planet_2.png',
  },
  earth: {
    label: 'earth',
    srcImg: '../../../images/spaceship/planet_3.png',
  },
  blackHole: {
    label: 'blackHole',
    srcImg: '../../../images/spaceship/planet_4.png',
  },
  saturn: {
    label: 'saturn',
    srcImg: '../../../images/spaceship/planet_5.png',
  },
}
