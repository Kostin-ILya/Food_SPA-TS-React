import clsx from 'clsx'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/redux'

import { Button } from 'components/UI/Button'
import { UserProfile } from 'layouts/MainLayout/Aside/UserProfile'
import { Navigation } from 'layouts/MainLayout/Aside/Navigation'

import { getFetchStatus, getUserInfo, logout } from 'store/user/userSlice'
import { userProfile } from 'store/user/asyncUserThunk'
import cl from './Aside.module.scss'

interface AsideProps {
  isMenuOpen: boolean
  handleClose: () => void
}

export const Aside = ({ isMenuOpen, handleClose }: AsideProps) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { email, name } = useAppSelector(getUserInfo)
  const { isLoading } = useAppSelector(getFetchStatus)

  useEffect(() => {
    dispatch(userProfile())
      .unwrap()
      .catch((err) => console.error('Fetch error', err))
  }, [])

  const handleLogout = () => {
    dispatch(logout())
    navigate('/auth/login')
  }

  return (
    <aside className={clsx(cl.aside, { [cl.open]: isMenuOpen })}>
      {<UserProfile name={name} email={email} isLoading={isLoading} />}

      <img
        className={cl.exit}
        onClick={handleClose}
        src="/icons/delete_icon.svg"
        alt="exit"
      />

      <Navigation />

      <Button appearance="withIcon" onClick={handleLogout}>
        <img src="/icons/exit_icon.svg" alt="exit" />
        Выход
      </Button>
    </aside>
  )
}
