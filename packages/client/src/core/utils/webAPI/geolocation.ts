import { getCoords } from '@/pages/Feedback/Feedback'

export function findLocation() {
  if (!navigator.geolocation) {
    alert('Ваш браузер не дружит с геолокацией...')
  } else {
    navigator.geolocation.getCurrentPosition(success, error)
  }

  function success(position) {
    // если всё хорошо, получаем координаты
    const { longitude, latitude } = position.coords
    getCoords({ longitude, latitude })
  }

  function error() {
    // если всё плохо, просто напишем об этом
    alert('Не получается определить вашу геолокацию :(')
  }
}
