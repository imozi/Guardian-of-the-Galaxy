import { AudioContext } from 'standardized-audio-context-mock'

const audioContext = new AudioContext()
const audio = new Audio('a31df44c3944ea6.mp3')

const source = audioContext.createMediaElementSource(audio)

source.connect(audioContext.destination)

export function audioPlay() {
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }
  audio.play()
}

export function audioStop() {
  audio.pause()
  audio.currentTime = 0
}

export function audioPause() {
  audio.pause()
}
