import { useCallback, useState } from 'react'
import { Field } from '@/components/UI'
import { FieldType } from '@/types/components'

export const useForm = <FormType,>(config: FieldType[]) => {
  const initialData: Record<string, FieldType> = {}

  for (const field of config) {
    initialData[field.name] = field
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
    return Object.entries(formData).reduce(
      (acc: Record<string, unknown>, [field, fieldValue]) => {
        acc[field] = fieldValue.value
        return acc
      },
      {}
    ) as FormType
  }, [formData])

  const validateForm = () => {
    const newFormData = { ...formData }

    for (const fieldName in newFormData) {
      if (newFormData[fieldName].rule) {
        newFormData[fieldName].isValid = newFormData[fieldName].rule!.test(
          newFormData[fieldName].value
        )
      } else {
        newFormData[fieldName].isValid = !!newFormData[fieldName].value
      }
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

  return [formValues, isFormValid, FormFields] as const
}
