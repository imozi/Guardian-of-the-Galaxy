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
      <div className="audio-player__btns">
        <Button className="btn-audio" onClick={audioPlay}>
          <img src="/images/sound.svg" width="24" height="24" />
        </Button>
        <Button className="btn-audio" onClick={audioPause}>
          <img src="/images/sound-pause.svg" width="24" height="24" />
        </Button>
        <Button className="btn-audio" onClick={audioStop}>
          <img src="/images/sound-stop.svg" width="24" height="24" />
        </Button>
      </div>
    </div>
  )
}
