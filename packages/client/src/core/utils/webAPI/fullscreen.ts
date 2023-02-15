export function fullscreenAPI() {
  document.addEventListener(
    'keydown',
    e => {
      if (e.key === 'g' && e.altKey) {
        toggleFullScreen()
      }
    },
    false
  )
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else if (document.exitFullscreen) {
    document.exitFullscreen()
  }
}
