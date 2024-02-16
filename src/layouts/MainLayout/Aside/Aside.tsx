import cl from './Aside.module.scss'

import { Button } from 'components/UI/Button'
import { UserProfile } from 'layouts/MainLayout/Aside/UserProfile'
import { Navigation } from 'layouts/MainLayout/Aside/Navigation'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { getFetchStatus, getUserInfo, logout } from 'store/user/userSlice'
import { useEffect } from 'react'
import { userProfile } from 'store/user/asyncUserThunk'

export const Aside = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { email, name } = useAppSelector(getUserInfo)
  const { isLoading } = useAppSelector(getFetchStatus)

  useEffect(() => {
    dispatch(userProfile())
      .unwrap()
      .catch((err) => console.error('Fetch error', err))
  }, [dispatch])

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    dispatch(logout())
    navigate('/auth/login')
  }

  return (
    <aside className={cl.aside}>
      {<UserProfile name={name} email={email} isLoading={isLoading} />}

      <Navigation />

      <Button appearance="exit" onClick={handleLogout}>
        <img src="/icons/exit_icon.svg" alt="exit_icon" />
        Выход
      </Button>
    </aside>
  )
}
