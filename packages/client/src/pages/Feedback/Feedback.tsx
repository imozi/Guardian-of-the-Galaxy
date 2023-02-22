import { useNavigate } from 'react-router-dom'
import { Page } from '@/components/Page'
import { Button } from '@/components/UI'
import { findLocation } from '@/core/utils/webAPI/geolocation'
import { Card } from '@/components/Card'
import { useAddFeedbackMutation } from '@/store/feedback/feedback.api'
import { Coords, FeedbackInputDTO } from '@/types/api/feedback'
import { useRef, useState } from 'react'

export const Feedback = () => {
  const navigate = useNavigate()
  const [addFeedback, { isLoading }] = useAddFeedbackMutation()
  const [isSendFeedback, setSendFeedback] = useState(false)
  const [coords, setCoords] = useState<Coords | null>(null)
  const [error, setError] = useState<GeolocationPositionError>()
  const [isEmptyMessage, setEmptyMessage] = useState(false)
  const message: any = useRef<HTMLFormElement>(null)

  const onGeolocation = () => {
    const cordGeo = (data: GeolocationPosition) => {
      const { longitude, latitude } = data.coords
      setCoords({ longitude, latitude })
    }

    const errorGeo = (error: GeolocationPositionError) => {
      setError(error)
    }

    findLocation(cordGeo, errorGeo)
  }

  const onKeyUpForm = () => {
    const formData = Object.fromEntries(
      new FormData(message?.current).entries()
    ) as unknown as FeedbackInputDTO

    if (formData.message) {
      setEmptyMessage(false)
      return
    }
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const formData = Object.fromEntries(
      new FormData(message.current).entries()
    ) as unknown as FeedbackInputDTO

    if (!formData.message) {
      setEmptyMessage(true)
      console.log(formData)
      return
    }

    formData['coords'] = coords

    await addFeedback(formData)
    setSendFeedback(true)
  }

  return (
    <Page title="Feedback">
      <section className="feedback profile">
        <h2 className="profile__title">Feedback</h2>
        <div className="profile__wrapper">
          <div className="profile__nav">
            <a className="link" onClick={() => navigate(-1)}>
              Back
            </a>
          </div>
          <Card>
            {!isSendFeedback ? (
              <form
                className="form"
                onSubmit={onSubmit}
                ref={message}
                onKeyUp={onKeyUpForm}>
                <textarea
                  name="message"
                  id="message"
                  className="feedback__message"
                  placeholder="Your message"></textarea>
                {isEmptyMessage && (
                  <span className="feedback__error field__error">
                    Message is required
                  </span>
                )}
                <div className="feedback__text">
                  Also, we will be glad if you give us access to geolocation so
                  that we understand from which city or country users are
                  playing. This will help us improve the game!
                </div>
                {!coords ? (
                  <Button
                    type="button"
                    onClick={onGeolocation}
                    className="feedback__button_geolocation">
                    Geolocation
                  </Button>
                ) : (
                  <p className="feedback__geo-thanks">
                    Thanks for sharing your location
                  </p>
                )}
                <Button type="submit" loading={isLoading}>
                  Send
                </Button>
              </form>
            ) : (
              <p className="feedback__thanks">
                Thank you for your feedback, it is really important to us!
              </p>
            )}
          </Card>
        </div>
      </section>
    </Page>
  )
}
