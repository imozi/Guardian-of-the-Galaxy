export function fullscreenAPI() {
  document.addEventListener(
    'keydown',
    e => {
      if ((e.ctrlKey && e.key === 'f') || e.key === 'а') {
        toggleFullScreen()
      }
    },
    false
  )
}

export function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else if (document.exitFullscreen) {
    document.exitFullscreen()
  }
}
