import { useAppSelector } from 'hooks/redux'
import { Navigate } from 'react-router-dom'
import { getJwt } from 'store/user/userSlice'

interface RequiredAuthProps {
  children: React.ReactElement
}

export const RequiredAuth = ({ children }: RequiredAuthProps) => {
  const jwt = useAppSelector(getJwt)

  if (!jwt) {
    return <Navigate to="/auth/login" />
  }

  return children
}
