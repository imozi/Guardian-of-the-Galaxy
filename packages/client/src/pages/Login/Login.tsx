import React, { useState } from 'react'
import { Layout } from '../../components/Layout'
import { Card } from '../../components/Card'
import { useForm } from '../../hooks/useForm'
import { Button } from '../../components/UI/Button'
import { login } from '../../api/auth'
import { isAxiosError } from 'axios'
import { AuthDTO } from '../../api/types'

const loginForm = [
  {
    name: 'login',
    type: 'text',
    label: 'Login',
    value: '',
    isValid: true,
    rule: /^(?!^\d+$)[\dA-Za-z-_]+$/,
    errorMessage:
      'Must consist of letters and numbers, no spaces, no special characters',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    value: '',
    isValid: true,
    rule: /(?=.*\d)(?=.*[A-ZА-ЯЁ])/,
    errorMessage: 'Must consist of at least one capital letter and number',
  },
]

export const Login = () => {
  const [formValues, isFormValid, formInputs] = useForm(loginForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const isValid = isFormValid()
    const formData = formValues()

    if (isValid) {
      setLoading(true)

      try {
        await login(formData as AuthDTO)
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
      <div className="login">
        <Card title="Guardian of the Galaxy">
          <form className="form" onSubmit={onSubmit}>
            <>{formInputs()}</>
            {!!error && <div className="form__error">{error}</div>}
            <div className="form__footer">
              <Button type="submit" loading={loading}>
                Sign in
              </Button>
            </div>
          </form>
          <div className="card__footer">
            <a href="#" className="link">
              Sign up
            </a>
          </div>
        </Card>
      </div>
    </Layout>
  )
}
