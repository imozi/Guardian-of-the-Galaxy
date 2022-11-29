import React, { useCallback, useState } from 'react'
import { Field } from '../components/UI/Field'
import { FieldType } from '../types/field'

export const useForm = (config: FieldType[]): any[] => {
  const initialData: Record<string, any> = {}
  const initialValues: Record<string, any> = {}
  for (const field of config) {
    initialData[field.name] = field
    initialValues[field.name] = field.value
  }
  const [formData, setFormData] = useState(initialData)

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name
    const value = e.currentTarget.value
    const fieldData = { ...formData[name] }

    if (!fieldData.isValid) {
      fieldData.isValid = fieldData.rule.test(fieldData.value)
    }

    fieldData.value = value

    setFormData({
      ...formData,
      [name]: fieldData
    })
  }

  const formValues = useCallback(() => {
    const values: Record<string, any> = {}
    const fields = Object.keys(formData)

    for (const i of fields) {
      values[i] = formData[i].value
    }

    return values
  }, [formData])

  const validateForm = () => {
    const newFormData = {...formData}
    const fields = Object.keys(newFormData)

    for (const i of fields) {
      newFormData[i].isValid = newFormData[i].rule.test(newFormData[i].value)
    }

    setFormData(newFormData)
  }

  const isFormValid = () => {
    validateForm()

    let isValid = true
    const fields = Object.keys(formData)

    for (const i of fields) {
      if (!formData[i].isValid) {
        isValid = false
        break
      }
    }

    return isValid
  }

  const FormFields = () => {
    return Object.values(formData).map((field) => (
      <div className='form__item' key={field.name}>
        <Field
          name={field.name}
          type={field.type}
          label={field.label}
          isValid={field.isValid}
          errorMessage={field.errorMessage}
          value={formData[field.name].value}
          onChange={handleChange}
        />
      </div>
    ))
  }

  return [formValues, isFormValid, FormFields]
}
