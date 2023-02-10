import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Page } from '@/components/Page'
import { useForm } from '@/hooks'
import { Avatar } from '@/components/Avatar'
import { Card } from '@/components/Card'
import { Button } from '@/components/UI/Button'
import { UserType } from '@/types'
import { ErrorDTO, UserDTO } from '@/types/api/ya.praktikum'
import { useAppSelector } from '@/store'
import {
  useUpdateAvatarMutation,
  useUpdateUserMutation,
} from '@/store/user/user.api'

const ProfileForm = [
  {
    name: 'first_name',
    storeName: 'firstName',
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
    storeName: 'phone',
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
    storeName: 'secondName',
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
    storeName: 'login',
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
    storeName: 'email',
    type: 'email',
    label: 'Email',
    value: '',
    isValid: true,
    rule: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i,
    errorMessage:
      'Email must be in Latin, it can include numbers and special characters like a hyphen, there must be a “dog” (@) and a dot after it, but there must be letters before the dot',
  },
  {
    name: 'display_name',
    storeName: 'displayName',
    type: 'text',
    label: 'Display name',
    value: '',
    isValid: true,
    rule: /^[А-ЯA-Z][а-яa-z-]+$/,
    errorMessage:
      'Latin or Cyrillic alphabet is allowed, the first letter must be capital, without spaces and without numbers, without special characters (only a hyphen is allowed)',
  },
]

export const Profile = () => {
  const user = useAppSelector(state => state.userState.user)

  const [isEdit, setIsEdit] = useState(false)

  ProfileForm.forEach(field => {
    if (user && field.storeName) {
      field.value = user[field.storeName as keyof UserType] as string
    }
  })
  const [formValues, isFormValid, formInputs] = useForm<UserDTO>(ProfileForm)

  const [updateUser, { isLoading, isSuccess, error }] = useUpdateUserMutation()
  const [updateAvatar, { isLoading: avatarLoading }] = useUpdateAvatarMutation()

  useEffect(() => {
    if (isSuccess) {
      setIsEdit(false)
    }
  }, [isSuccess])

  const onEditHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    setIsEdit(true)
  }

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const isValid = isFormValid()

    const formData = formValues()

    if (isValid) {
      updateUser(formData)
    }
  }

  const onChangeAvatar = async (e: React.FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget

    if (!files?.length) {
      return
    }

    const formData = new FormData()
    formData.append('avatar', files[0])

    updateAvatar(formData)
  }

  return (
    <Page title="Profile">
      <section className="profile">
        <h2 className="profile__title">Profile</h2>
        <div className="profile__wrapper">
          <div className="profile__nav">
            <Link className="link" to="/password">
              Change password
            </Link>
            <Link className="link" to="/user">
              Back
            </Link>
          </div>
          <Card>
            <Avatar
              loading={avatarLoading}
              src={user?.avatar}
              onChange={onChangeAvatar}
            />
            <form
              className={`profile__form form${isEdit ? '' : ' form--disabled'}`}
              onSubmit={onSubmit}>
              <>{formInputs()}</>
              {!!error && (
                <div className="form__error">{(error as ErrorDTO).reason}</div>
              )}
              <div className="form__footer">
                {isEdit ? (
                  <Button green={true} type="submit" loading={isLoading}>
                    Save
                  </Button>
                ) : (
                  <Button type="button" onClick={onEditHandler}>
                    Edit
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </div>
      </section>
    </Page>
  )
}
