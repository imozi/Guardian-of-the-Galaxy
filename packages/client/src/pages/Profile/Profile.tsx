import React, { useState } from 'react'
import { Layout } from '../../components/Layout'
import { Card } from '../../components/Card'
import { useForm } from '../../hooks/useForm'
import { Button } from '../../components/UI/Button'
import { Avatar } from '../../components/Avatar'
import { updateAvatar } from '../../api/profile'
import { isAxiosError } from 'axios'
import { Link } from 'react-router-dom'

const ProfileForm = [
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

export const Profile = () => {
  const [formValues, isFormValid, formInputs] = useForm(ProfileForm)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const isValid = isFormValid()
    const formData = formValues()

    if (isValid) {
      setLoading(true)

      try {
        // Реализовать api обновление данных пользователя
        formData
        setError('')
      } catch (e) {
        if (isAxiosError(e)) {
          setError(e.response?.data?.reason)
        }
      }

      setLoading(false)
    }
  }

  const onChangeAvatar = async (e: React.FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget

    if (!files?.length) {
      return
    }

    const formData = new FormData()
    formData.append('avatar', files[0])

    try {
      const { avatar } = await updateAvatar(formData)
      avatar
    } catch (e) {
      if (isAxiosError(e)) {
        setError(e.response?.data?.reason)
      }
    }
  }

  return (
    <Layout>
      <div className="profile">
        <div className="profile__nav">
          <Link className="link" to="/password">
            Change password
          </Link>
          <Link className="link" to="/game">
            Back
          </Link>
        </div>
        <Card title="Profile">
          <Avatar onChange={onChangeAvatar} />
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
    </Layout>
  )
}
