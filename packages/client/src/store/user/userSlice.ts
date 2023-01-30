import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import type { UserType } from '@/types'

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

export const { setUser, resetUser } = userSlice.actions
