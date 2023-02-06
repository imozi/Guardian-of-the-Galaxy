import { AudioContext } from 'standardized-audio-context-mock'

export const useAudioPLayer = (
  audioContext: AudioContext,
  audio: HTMLAudioElement | null
) => {
  if (audio) {
    const source = audioContext.createMediaElementSource(audio)
    source.connect(audioContext.destination)
  }

  const audioPlay = () => {
    if (!audio) {
      return
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }
    audio.play()
  }

  const audioStop = () => {
    if (!audio) {
      return
    }
    audio.pause()
    audio.currentTime = 0
  }

  const audioPause = () => {
    if (!audio) {
      return
    }
    audio.pause()
  }

  return {
    audioPlay,
    audioPause,
    audioStop,
  }
}
