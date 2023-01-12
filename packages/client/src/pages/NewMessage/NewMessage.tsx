import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ANINAMTION_STUB_TIME } from '@/core/consts'
import { Page } from '@/components/Page'
import { Button } from '@/components/UI'

export const NewMessage = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }

  const onSubmit = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, ANINAMTION_STUB_TIME)
  }, [])

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
            <Button type="submit" loading={loading}>
              Send
            </Button>
          </form>
        </div>
      </section>
    </Page>
  )
}
