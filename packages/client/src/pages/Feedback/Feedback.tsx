import { Link } from 'react-router-dom'
import { Page } from '@/components/Page'
import { Button } from '@/components/UI'
import { useForm } from '@/hooks'
import { findLocation } from '@/core/utils/webAPI/geolocation'
import { Card } from '@/components/Card'
import { useAddFeedbackMutation } from '@/store/feedback/feedback.api'
import { FeedbackInputDTO } from '@/types/api/feedback'

const FeedbackForm = [
  {
    name: 'message',
    type: 'text',
    label: 'Input message',
    value: '',
    isValid: true,
    errorMessage: 'Name is required',
  }
]

let coords = null;

export const getCoords = (value) => {
  coords = value
  alert('Thank you!')
}

const onGeolocation = () => {
  findLocation()
}

export const Feedback = () => {

  const [formValues, isFormValid, formInputs] = useForm<FeedbackInputDTO>(FeedbackForm)
  const [addFeedback, { isLoading }] = useAddFeedbackMutation()

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const isValid = isFormValid()

    const formData = formValues()
    formData['coords'] = coords
    console.log(formData)

    if (isValid) {
      addFeedback(formData)
    }
  }

  return (
    <Page title="New message">
      <section className="feedback profile">
        <h2 className="profile__title">Feedback</h2>
        <div className="profile__wrapper">
          <div className="profile__nav">
            <Link className="link" to="/forum">
              Back
            </Link>
          </div>
          <Card>
            <form className="form" onSubmit={onSubmit}>
              <>{formInputs()}</>
              <div className='feedback__text'>
                Also, we will be glad if you give us access to geolocation so
                that we understand from which city or country users are playing.
                This will help us improve the game!
              </div>
              <Button onClick={onGeolocation} className='feedback__button_geolocation'>Geolocation</Button>
              <Button type="submit" loading={isLoading}>
                Send
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </Page>
  )
}
