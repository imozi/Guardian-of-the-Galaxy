import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserType } from '@/types'
import { RootState } from '..'

type UserState = {
  user: UserType | null
  theme: string
}

const initialState: UserState = {
  user: null,
  theme: 'space',
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
  },
})

export default userSlice.reducer
//TODO appState.service_id
export const selectServiceId = (state: RootState) =>
  state.userState.appState.service_id

export const { setUser, resetUser, setUserTheme } = userSlice.actions
