import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './hoc/ErrorBoundary'
import { Provider } from 'react-redux'
import { Pages } from './pages'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userApi } from './store/user/user.api'
import { authApi } from './store/auth/auth.api'
import { leaderboardApi } from './store/leaderboard/leaderboard.api'
import userReducer from './store/user/userSlice'
import { store } from './store'

const reducers = combineReducers({
  [userApi.reducerPath]: userApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [leaderboardApi.reducerPath]: leaderboardApi.reducer,
  userState: userReducer,
})

const storeServer = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({}).concat([
      authApi.middleware,
      userApi.middleware,
      leaderboardApi.middleware,
    ])
  },
  preloadedState: window.__PRELOADED_STATE__,
})

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ErrorBoundary>
      <Provider
        store={process.env.NODE_ENV === 'production' ? storeServer : store}>
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
)
