import { useAppSelector } from '@/store'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRoute {
  isAuth: boolean
  children: JSX.Element
}

export const PrivateRoute: FC<PrivateRoute> = ({ isAuth, children }) => {
  if (!isAuth) {
    return <Navigate to="/" />
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = useAppSelector(state => state.userState.user)

  return user && children
}
