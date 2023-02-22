import { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '@/store'

interface PrivateRoute {
  isAuth: boolean
  children: JSX.Element
}

export const PrivateRoute: FC<PrivateRoute> = ({ isAuth, children }) => {
  const user = useAppSelector(state => state.userState.user)

  if (!isAuth) {
    return <Navigate to="/" replace />
  }

  return user && children
}
