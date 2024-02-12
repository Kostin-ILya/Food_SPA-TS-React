import { Navigate } from 'react-router-dom'

interface RequiredAuthProps {
  children: React.ReactElement
}

export const RequiredAuth = ({ children }: RequiredAuthProps) => {
  if (!localStorage.getItem('jwt')) {
    console.log('no jwt')

    return <Navigate to="/auth/login" />
  }

  return children
}
