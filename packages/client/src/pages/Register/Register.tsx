import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Page } from '@/components/Page'
import { useForm } from '@/hooks'
import { Card } from '@/components/Card'
import { Button } from '@/components/UI/Button'
import { AuthDTO, ErrorDTO } from '@/types/api/ya.praktikum'
import { useAuthRegisterMutation } from '@/store/auth/auth.api.'



const registerForm = [
  {
    name: 'first_name',
    type: 'text',
    label: 'First name',
    value: '',
    isValid: true,
    rule: /^[А-ЯA-Z][а-яa-z-]+$/,
    errorMessage:
      'Latin or Cyrillic alphabet is allowed, the first letter must be capital, without spaces and without numbers, without special characters (only a hyphen is allowed)',
  },
  {
    name: 'phone',
    type: 'text',
    label: 'Phone',
    value: '',
    isValid: true,
    rule: /^(\+)?((\d{2,3}) ?\d|\d)(([ -]?\d)|( ?(\d{2,3}) ?)){9}\d$/,
    errorMessage:
      'The phone number must be from 10 to 15 characters, consist of numbers, may start with a plus',
  },
  {
    name: 'second_name',
    type: 'text',
    label: 'Second name',
    value: '',
    isValid: true,
    rule: /^[А-ЯA-Z][а-яa-z-]+$/,
    errorMessage:
      'Latin or Cyrillic alphabet is allowed, the first letter must be capital, without spaces and without numbers, without special characters (only a hyphen is allowed)',
  },
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
    name: 'email',
    type: 'email',
    label: 'Email',
    value: '',
    isValid: true,
    rule: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
    errorMessage:
      'Email must be in Latin, it can include numbers and special characters like a hyphen, there must be a “dog” (@) and a dot after it, but there must be letters before the dot',
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

export const Register = () => {
  const navigate = useNavigate()

  const [formValues, isFormValid, formInputs] = useForm<AuthDTO>(registerForm)

  const [authRegister, { isLoading, isSuccess, error }] =
    useAuthRegisterMutation()

  useEffect(() => {
    if (isSuccess) {
      navigate('/game')
    }
  }, [isSuccess])

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const isValid = isFormValid()
    const formData = formValues()

    if (isValid) {
      authRegister(formData)
    }
  }

  return (
    <Page title='Registration'>
      <section className="register">
        <Card title="Guardian of the Galaxy Registration">
          <form className="form" onSubmit={onSubmit}>
            <>{formInputs()}</>
            {!!error && (
              <div className="form__error">{(error as ErrorDTO).reason}</div>
            )}
            <div className="form__footer">
              <Button type="submit" loading={isLoading}>
                Sign up
              </Button>
            </div>
          </form>
          <div className="card__footer">
            <Link className="link" to="/">
              Sign in
            </Link>
          </div>
        </Card>
      </section>
    </Page>
  )
}
