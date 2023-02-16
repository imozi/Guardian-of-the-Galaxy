import { Link, useNavigate } from 'react-router-dom'
import { Page } from '@/components/Page'
import { Button } from '@/components/UI'
import { useForm } from '@/hooks'
import { TopicDTO } from '@/types/api/forum'
import { useAddTopicMutation } from '@/store/forum/forum.api'
import { useEffect } from 'react'
import { Card } from '@/components/Card'

const FeedbackForm = [
  {
    name: 'name',
    type: 'text',
    label: 'Input message',
    value: '',
    isValid: true,
    errorMessage: 'Name is required',
  },
  // {
  //   name: 'name1',
  //   type: 'label',
  //   label: 'Input message',
  //   value: '',
  //   isValid: true,
  //   errorMessage: 'Name is required',
  // },
]

export const Feedback = () => {
  const navigate = useNavigate()

  const [formValues, isFormValid, formInputs] = useForm<TopicDTO>(FeedbackForm)
  const [createTopic, { isLoading, isSuccess }] = useAddTopicMutation()

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const isValid = isFormValid()

    const formData = formValues()

    if (isValid) {
      createTopic(formData)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      navigate('/forum')
    }
  }, [isSuccess])

  return (
    <Page title="New message">
      <section className="forum profile">
        <h2 className="profile__title">Feedback</h2>
        <div className="profile__wrapper">
          <div className="profile__nav">
            <Link className="link" to="/forum">
              Back
            </Link>
          </div>
          <Card>
            <form className="form forum__form" onSubmit={onSubmit}>
              <>{formInputs()}</>
              <div>
                Also, we will be glad if you give us access to geolocation so
                that we understand from which city or country users are playing.
                This will help us improve the game!
              </div>
              <Button>Geolocation</Button>
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
