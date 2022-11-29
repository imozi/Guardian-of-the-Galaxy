import React from 'react'
import { useState } from 'react'
import { Button } from '../../components/UI/Button'
import { Layout } from '../../components/Layout'

export const NewMessage = () => {
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState('');
	
	function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		setValue(e.target.value);
	}

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

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
            <textarea className='new-message__text' value={value} onChange={handleChange} />
            <Button type="submit" loading={loading}>
              Send
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  )
}
