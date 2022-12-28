import { ErrorDTO, PasswordDTO } from '../../types/api'
import React, { useEffect, useState } from 'react'
import { Button } from '../../components/UI/Button'
import { Card } from '../../components/Card'
import { Layout } from '../../components/Layout'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useUpdatePasswordMutation } from '../../store/user/user.api'

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
  const [isEdit, setIsEdit] = useState(false)

  const [formValues, isFormValid, formInputs] =
    useForm<PasswordDTO>(PasswordForm)

  const [updatePassword, { isLoading, isSuccess, error }] =
    useUpdatePasswordMutation()

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
      updatePassword(formData)
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
            <form
              className={`form${isEdit ? '' : ' form--disabled'}`}
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
      </div>
    </Layout>
  )
}
