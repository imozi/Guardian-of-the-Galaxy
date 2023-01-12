import { FC } from 'react'
import { FieldType } from '@/types/components'


type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & FieldType

export const Field: FC<FieldProps> = ({
  name,
  type,
  label,
  onChange,
  value,
  isValid,
  errorMessage,
  ...props
}) => {
  let fieldClass = 'field'
  if (!isValid) {
    fieldClass += ' field--error'
  }
  return (
    <label className={fieldClass}>
      <p className="field__label">{label}</p>
      <input
        className="field__input"
        name={name}
        type={type}
        {...props}
        value={value}
        onChange={onChange}
      />
      <span className="field__error">{errorMessage}</span>
    </label>
  )
}
