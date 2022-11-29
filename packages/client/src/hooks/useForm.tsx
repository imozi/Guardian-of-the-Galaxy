import React, { useCallback, useState } from 'react'
import { Field } from '../components/UI/Field'
import { FieldType } from '../types/field'

export const useForm = (config: FieldType[]) => {
  const initialData: Record<string, FieldType> = {}
  const initialValues: Record<string, string> = {}

  for (const field of config) {
    initialData[field.name] = field
    initialValues[field.name] = field.value
  }

  const [formData, setFormData] = useState(initialData)

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget
    const fieldData = { ...formData[name] }

    if (!fieldData.isValid && fieldData.rule) {
      fieldData.isValid = fieldData.rule.test(fieldData.value)
    }

    fieldData.value = value

    setFormData({
      ...formData,
      [name]: fieldData,
    })
  }

  const formValues = useCallback(() => {
    const values: Record<string, string> = {}

    for (const fieldName in formData) {
      values[fieldName] = formData[fieldName].value
    }

    return values
  }, [formData])

  const validateForm = () => {
    const newFormData = { ...formData }

    for (const fieldName in newFormData) {
      newFormData[fieldName].isValid = newFormData[fieldName].rule?.test(
        newFormData[fieldName].value
      )
    }

    setFormData(newFormData)
  }

  const isFormValid = () => {
    validateForm()

    const fields = Object.values(formData)

    return !fields.some(field => !field.isValid)
  }

  const FormFields = () => {
    return Object.values(formData).map(field => (
      <div className="form__item" key={field.name}>
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
