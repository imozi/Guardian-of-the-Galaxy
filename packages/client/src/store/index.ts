import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authApi } from './auth/auth.api'
import { userApi } from './user/user.api'
import userReducer from './user/userSlice'
import { leaderboardApi } from '@/store/leaderboard/leaderboard.api'

const rootReducer = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [leaderboardApi.reducerPath]: leaderboardApi.reducer,
  userState: userReducer,
})

export const setupStore = (initialState = {}) =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware({}).concat([
        authApi.middleware,
        userApi.middleware,
        leaderboardApi.middleware,
      ])
    },
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
  })

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
