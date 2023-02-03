import { FC, useEffect, useState } from 'react'
import { Button } from '../UI'
import { useAudioPLayer } from '@/core/utils/webAPI/audio'
import { AudioContext } from 'standardized-audio-context-mock'

export const Audioplayer: FC = () => {
  const audioContext = new AudioContext()

  const [audio, setAudio] = useState(null)

  useEffect(() => {
    setAudio(new Audio('sounds/a31df44c3944ea6.mp3')) 
  }, [])

  const { audioPlay, audioStop, audioPause } = useAudioPLayer(
    audioContext,
    audio
  )

  return (
    <div className="audio-player">
      Sound
      <div className="audio-player__btns">
        <Button className="btn-audio" onClick={audioPlay}>
          Play
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
