export type FieldType = {
  name: string
  storeName?: string
  type: string
  label: string
  value: string
  rule?: RegExp
  errorMessage?: string
  isValid?: boolean
}

export type UserFieldProps = {
  number?: number
  author: string
  avatar?: string
  score?: number
}