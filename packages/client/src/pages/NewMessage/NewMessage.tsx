import React, { useCallback } from 'react'
import { ANINAMTION_STUB_TIME } from '../../utils/consts'
import { Button } from '../../components/UI/Button'
import { Layout } from '../../components/Layout'
import { useState } from 'react'

export const NewMessage = () => {
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
    <Layout>
      <div className="new-message">
        <h2 className="new-message__title">New message</h2>
        <div className="new-message__wrapper">
          <div className="new-message__links">
            <a href="#" className="link">
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
      </div>
    </Layout>
  )
}
