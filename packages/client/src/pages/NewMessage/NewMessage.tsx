import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Page } from '@/components/Page'
import { Button } from '@/components/UI'
import { useAddMessageMutation } from '@/store/forum/forum.api'
import { useGetUserQuery } from '@/store/user/user.api'

export const NewMessage = () => {
  const navigate = useNavigate()

  const [createMessage, { isLoading, isSuccess }] = useAddMessageMutation()
  const { data } = useGetUserQuery()
  const {state} = useLocation()

  useEffect(() => {
    if (isSuccess) {
      navigate(`/forum/${state.topicId}`)
    }
  }, [isSuccess])

  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }
  
  const onSubmit = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault()
    createMessage({text: value, userId: data!.id, topicId: state.topicId})
  }, [value])

  return (
    <Page title="New message">
      <section className="new-message">
        <h2 className="new-message__title">New message</h2>
        <div className="new-message__wrapper">
          <div className="new-message__links">
            <a className="link" onClick={() => navigate(-1)}>
              Back
            </a>
          </div>
          <form className="new-message__form form" onSubmit={onSubmit}>
            <div className="new-message__subtitle">Your message</div>
            <textarea
              className="new-message__text"
              value={value}
              onChange={handleChange}
            />
            <Button type="submit" loading={isLoading}>
              Send
            </Button>
          </form>
        </div>
      </section>
    </Page>
  )
}
