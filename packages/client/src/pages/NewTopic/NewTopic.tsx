import { Link, useNavigate } from 'react-router-dom'
import { Page } from '@/components/Page'
import { Button } from '@/components/UI'
import { useForm } from '@/hooks'
import { TopicDTO } from '@/types/api/forum'
import { useAddTopicMutation } from '@/store/forum/forum.api'
import { useEffect } from 'react'
import { Card } from '@/components/Card'

const TopicForm = [
  {
    name: 'name',
    type: 'text',
    label: 'Topic name',
    value: '',
    isValid: true,
    errorMessage: 'Name is required',
  },
]

export const NewTopic = () => {
  const navigate = useNavigate()

  const [formValues, isFormValid, formInputs] = useForm<TopicDTO>(TopicForm)
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
        <h2 className="profile__title">New topic</h2>
        <div className="profile__wrapper">
          <div className="profile__nav">
            <Link className="link" to="/forum">
              Back
            </Link>
          </div>
          <Card>
            <form className="form forum__form" onSubmit={onSubmit}>
              <>{formInputs()}</>
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
