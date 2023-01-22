import { FC } from 'react'
import { Button } from '../UI'
import { useAudioPLayer } from '@/core/utils/webAPI/audio'

export const Audioplayer: FC = () => {
  const { audioPlay, audioStop, audioPause } = useAudioPLayer()

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
