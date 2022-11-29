export type FieldType = {
  name: string
  type: string
  label: string
  value: string
  rule?: RegExp
  errorMessage?: string
  isValid?: boolean
}