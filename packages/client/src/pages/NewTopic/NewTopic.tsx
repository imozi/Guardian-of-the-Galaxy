import { Link, useNavigate } from 'react-router-dom'
import { Page } from '@/components/Page'
import { Button } from '@/components/UI'
import { useForm } from '@/hooks'
import { TopicDTO } from '@/types/api/forum'
import { useAddTopicMutation } from '@/store/forum/forum.api'
import { useEffect } from 'react'

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
      <section className="forum">
        <h2 className="forum__title">New topic</h2>
        <div className="forum__wrapper">
          <div className="forum__links">
            <Link className="link" to="/forum">
              Back
            </Link>
          </div>
          <form className="form" onSubmit={onSubmit}>
            <>{formInputs()}</>
            <Button type="submit" loading={isLoading}>
              Send
            </Button>
          </form>
        </div>
      </section>
    </Page>
  )
}
