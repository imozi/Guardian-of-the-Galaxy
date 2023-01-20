import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './auth/auth.api'
import { userApi } from './user/user.api'
import userReducer from './user/userSlice'
import { leaderboardApi } from './leaderboard/leaderboard.api'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [leaderboardApi.reducerPath]: leaderboardApi.reducer,
    userState: userReducer,
  },
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({}).concat([
      authApi.middleware,
      userApi.middleware,
      leaderboardApi.middleware,
    ])
  },
  preloadedState: {
    "userState" : {
        user: {
          id: 3797,
          login: "Qwerty131313",
          firstName: "Qwerty131313",
          secondName: "Qwerty131313",
          displayName: 'Alex',
          avatar: 'asd',
          phone: "8888888888",
          email: "Qwerty131313@asd.ret"
        }
    },  
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
