export function findLocation(
  success: (position: GeolocationPosition) => void,
  error: (data: GeolocationPositionError) => void
) {
  if (!navigator.geolocation) {
    error({
      message: 'Ваш браузер не дружит с геолокацией...',
      code: 1,
      PERMISSION_DENIED: 1,
      POSITION_UNAVAILABLE: 2,
      TIMEOUT: 3,
    })
  } else {
    navigator.geolocation.getCurrentPosition(success, error)
  }
}
