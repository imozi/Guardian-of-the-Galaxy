import { useNavigate } from 'react-router-dom'
import { Page } from '@/components/Page'
import { Button } from '@/components/UI'
import { useForm } from '@/hooks'
import { findLocation } from '@/core/utils/webAPI/geolocation'
import { Card } from '@/components/Card'
import { useAddFeedbackMutation } from '@/store/feedback/feedback.api'
import { Coords, FeedbackInputDTO } from '@/types/api/feedback'
import { useState } from 'react'

const FeedbackForm = [
  {
    name: 'message',
    type: 'text',
    label: 'Input message',
    value: '',
    isValid: true,
    errorMessage: 'Message is required',
  },
]

let coords: Coords

export const getCoords = (value: Coords) => {
  coords = value
  alert('Thank you!')
}

const onGeolocation = () => {
  findLocation()
}

export const Feedback = () => {
  const navigate = useNavigate()
  const [formValues, isFormValid, formInputs] =
    useForm<FeedbackInputDTO>(FeedbackForm)
  const [addFeedback, { isLoading }] = useAddFeedbackMutation()
  const [isSendFeedback, setSendFeedback] = useState(false)

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const isValid = isFormValid()

    const formData = formValues()
    formData['coords'] = coords

    if (isValid) {
      await addFeedback(formData)
      setSendFeedback(true)
    }
  }

  return (
    <Page title="New message">
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
              <form className="form" onSubmit={onSubmit}>
                <>{formInputs()}</>
                <div className="feedback__text">
                  Also, we will be glad if you give us access to geolocation so
                  that we understand from which city or country users are
                  playing. This will help us improve the game!
                </div>
                <Button
                  onClick={onGeolocation}
                  className="feedback__button_geolocation">
                  Geolocation
                </Button>
                <Button type="submit" loading={isLoading}>
                  Send
                </Button>
              </form>
            ) : (
              <p>
                Thank you for your feedback, your feedback is realy important to
                us!
              </p>
            )}
          </Card>
        </div>
      </section>
    </Page>
  )
}
