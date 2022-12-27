import { FC } from 'react'
import { Navigate } from 'react-router-dom'

interface PrivateRoute {
  isAuth: boolean
  children: JSX.Element
}

export const PrivateRoute: FC<PrivateRoute> = ({ isAuth, children }) => {
  if (!isAuth) {
    return <Navigate to="/login" />
  }

  return children
}
