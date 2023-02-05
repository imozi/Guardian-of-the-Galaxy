import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { UserType } from '@/types'
import { RootState } from '..'

type UserState = {
  user: UserType | null
}

const initialState: UserState = {
  user: null,
}

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },
    resetUser: () => initialState,
  },
})

export default userSlice.reducer

export const selectServiceId = (state: RootState) => state.userState.appState.service_id

export const { setUser, resetUser } = userSlice.actions
