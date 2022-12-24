export interface UserTypeDTO {
  avatar?: string
  display_name?: string
  emeail: string
  first_name: string
  id: number
  phone: string
  second_name: boolean
}

export interface ErrorDTO {
  reason: string
}

export interface ServerRes {
  currentData: UserTypeDTO
  data: UserTypeDTO
  endpoint: string
  fulfilledTimeStamp: number
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
  isUninitialized: boolean
  originalArgs: string
  refetch: any
  requestId: string
  startedTimeStamp: number
  status: string
}
