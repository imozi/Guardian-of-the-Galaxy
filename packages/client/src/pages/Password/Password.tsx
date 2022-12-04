import React, { useState } from 'react'
import { Button } from '../../components/UI/Button'
import { Card } from '../../components/Card'
import { Layout } from '../../components/Layout'
import { Link } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { useForm } from '../../hooks/useForm'

const PasswordForm = [
  {
    name: 'oldPassword',
    type: 'password',
    label: 'Old password',
    value: '',
    isValid: true,
    rule: /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z]).{8,40}$/,
    errorMessage:
      'Password must be between 8 and 40 characters, at least one uppercase letter and a number are required',
  },
  {
    name: 'newPassword',
    type: 'password',
    label: 'New password',
    value: '',
    isValid: true,
    rule: /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z]).{8,40}$/,
    errorMessage:
      'Password must be between 8 and 40 characters, at least one uppercase letter and a number are required',
  },
]

export const Password = () => {
  const [formValues, isFormValid, formInputs] = useForm(PasswordForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const isValid = isFormValid()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formData = formValues()

    if (isValid) {
      setLoading(true)

      try {
        // TODO: Добавить вызов api смены пароля после закрытия ПР#13
        setError('')
      } catch (e) {
        if (isAxiosError(e)) {
          setError(e.response?.data?.reason)
        }
      }

      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="password">
        <h2 className="password__title">Password</h2>
        <div className="password__wrapper">
          <div className="password__nav">
            <Link className="link" to="/profile">
              Back
            </Link>
          </div>
          <Card>
            <form className="form" onSubmit={onSubmit}>
              <>{formInputs()}</>
              {!!error && <div className="form__error">{error}</div>}
              <div className="form__footer">
                <Button type="submit" loading={loading}>
                  Save
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
