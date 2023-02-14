import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Page } from '@/components/Page'
import { Card } from '@/components/Card'
import { Button } from '@/components/UI'
import { useForm } from '@/hooks'
import { AuthDTO, ErrorDTO } from '@/types/api/ya.praktikum'
import { useAuthLoginMutation } from '@/store/auth/auth.api'
import OAuthPanel from '@/components/Oauth/Oauth'

const loginForm = [
  {
    name: 'login',
    type: 'text',
    label: 'Login',
    value: '',
    isValid: true,
    rule: /^[a-zA-Z][a-zA-Z0-9_-]{2,20}$/,
    errorMessage:
      'Login must be from 3 to 20 characters, Latin, may contain numbers, but not consist of them, without spaces, without special characters (hyphens and underscores are allowed)',
  },
  {
    name: 'password',
    type: 'password',
    label: 'Password',
    value: '',
    isValid: true,
    rule: /^(?=.*[A-Z])(?=.*[a-z].*[a-z].*[a-z]).{8,40}$/,
    errorMessage:
      'Password must be between 8 and 40 characters, at least one uppercase letter and a number are required',
  },
]

export const Login = () => {
  const navigate = useNavigate()

  const [formValues, isFormValid, formInputs] = useForm<AuthDTO>(loginForm)

  const [authLogin, { isLoading, isSuccess, error }] = useAuthLoginMutation()

  useEffect(() => {
    if (isSuccess) {
      navigate('/user')
    }
  }, [isSuccess, navigate])

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const isValid = isFormValid()
    const formData = formValues()

    if (isValid) {
      authLogin(formData)
    }
  }

  return (
    <Page title="Login">
      <section className="login">
        <Card title="Guardian of the Galaxy Login">
          <form className="form" onSubmit={onSubmit}>
            <>{formInputs()}</>
            {!!error && (
              <div className="form__error">{(error as ErrorDTO).reason}</div>
            )}
            <div className="form__footer">
              <Button type="submit" loading={isLoading}>
                Sign in
              </Button>
            </div>
          </form>
          <div className="card__footer">
            <Link className="link" to="/register">
              Sign up
            </Link>
          </div>
          <OAuthPanel />
        </Card>
      </section>
    </Page>
  )
}
function getLocationOrigin() {
  throw new Error('Function not implemented.')
}
