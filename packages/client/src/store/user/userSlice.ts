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
    // setServiceIdUser: (state, action: PayloadAction<{}>) => {
    //   console.log('setServiceIdUser', action.payload)
    //   // state.user= action.payload
    // },
  },
  // extraReducers: builder => {
  //   builder.addCase(getOAuthYandexServiceId.fulfilled, (state, action) => {
  //     state.user.service_id = action.payload.service_id as string
  //   })
  // }
})

export default userSlice.reducer
//TODO appState.service_id
export const selectServiceId = (state: RootState) =>
  state.userState.user?.service_id

export const { setUser, resetUser, setUserTheme } =
  userSlice.actions
