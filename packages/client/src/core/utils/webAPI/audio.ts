import { AudioContext } from 'standardized-audio-context-mock'

export const useAudioPLayer = (audioContext: AudioContext, audio: HTMLAudioElement) => {
  
  const source = audioContext.createMediaElementSource(audio)
  source.connect(audioContext.destination)

  const audioPlay = () => {
    if (audioContext.state === 'suspended') {
      audioContext.resume()
    }
    audio.play()
  }

  const audioStop = () => {
    audio.pause()
    audio.currentTime = 0
  }

  const audioPause = () => {
    audio.pause()
  }

  return {
    audioPlay,
    audioPause,
    audioStop,
  }
}
