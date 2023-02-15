import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserType } from '@/types'
import { RootState } from '..'

type UserState = {
  user: UserType | null
  theme: string
  appState: {
    service_id: string
  }
  isAuth: boolean
}

const initialState: UserState = {
  isAuth: false,
  user: null,
  theme: 'space',
  appState: {
    service_id: '',
  },
}

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },
    resetUser: () => initialState,
    setUserTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    },
    setServiceIdUser: (state, action) => {
      state.appState.service_id = action.payload.service_id as string
    },
    setIsAuthUser: (state, action) => {
      state.isAuth = action.payload.isAuth as boolean
    },
  },
})

export default userSlice.reducer

export const selectServiceId = (state: RootState) =>
  state.userState.appState.service_id

export const {
  setUser,
  resetUser,
  setUserTheme,
  setServiceIdUser,
  setIsAuthUser,
} = userSlice.actions
