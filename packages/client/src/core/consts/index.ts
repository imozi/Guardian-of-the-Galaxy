const { VITE_REDIRECT_URL, VITE_MAIN_DOMAIN, PROD } = import.meta.env
export const API_URL = `${
  PROD ? VITE_MAIN_DOMAIN : 'http://localhost:3001'
}/api`
export const YA_API_URL = `${
  PROD ? VITE_MAIN_DOMAIN : 'http://localhost:3001'
}/api/ya`
export const REDIRECT_URL = `${
  PROD ? VITE_REDIRECT_URL : 'http://localhost:3000'
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
export const USER_AVATAR_DEFAULT = '/images/user-default.svg'
export const REACTIONS_ICON_SIZE = 18
export const REACTIONS: Record<string, any> = {
  cool: {
    label: 'cool',
    srcImg: '../../../images/emoji/cool.png',
  },
  rofl: {
    label: 'rofl',
    srcImg: '../../../images/emoji/rofl.png',
  },
  sad: {
    label: 'sad',
    srcImg: '../../../images/emoji/sad.png',
  },
  like: {
    label: 'like',
    srcImg: '../../../images/emoji/like.png',
  },
  fire: {
    label: 'fire',
    srcImg: '../../../images/emoji/fire.png',
  },
  rocket: {
    label: 'rocket',
    srcImg: '../../../images/emoji/rocket.png',
  },
}
