import { FC } from 'react'
import { Button } from '../UI'
import { useAudioPLayer } from '@/core/utils/webAPI/audio'
import { AudioContext } from 'standardized-audio-context-mock'
import { isBrowser } from '@/core/utils/isBrowser'

type AudioPlayerProps = {
  url: string
}

export const Audioplayer: FC<AudioPlayerProps> = ({ url }) => {
  const audioContext = new AudioContext()
  const audio = isBrowser() ? new Audio(url) : null

  const { audioPlay, audioStop, audioPause } = useAudioPLayer(
    audioContext,
    audio
  )

  return (
    <div className="audio-player">
      Sound
      <div className="audio-player__btns">
        <Button className="btn-audio" onClick={audioPlay}>
          PLay
        </Button>
        <Button className="btn-audio" onClick={audioPause}>
          Pause
        </Button>
        <Button className="btn-audio" onClick={audioStop}>
          Stop
        </Button>
      </div>
    </div>
  )
}
