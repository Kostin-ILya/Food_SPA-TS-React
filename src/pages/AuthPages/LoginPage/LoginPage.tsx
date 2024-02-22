import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'hooks/redux'

import { Title } from 'components/Title'
import { InputWithLabel } from 'components/UI/Input/InputWithLabel'
import { Button } from 'components/UI/Button'

import { FormInputs } from 'shared/interfaces/fetch.interface'
import { getFetchStatus } from 'store/user/userSlice'
import { loginUser } from 'store/user/asyncUserThunk'

import cl from './LoginPage.module.scss'

export const LoginPage = () => {
  const dispatch = useAppDispatch()

  const { isLoading, errorMsg } = useAppSelector(getFetchStatus)
  const navigate = useNavigate()
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    firstInputRef.current?.focus()
  }, [])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement & FormInputs>
  ) => {
    e.preventDefault()

    dispatch(
      loginUser({
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      })
    )
      .unwrap()
      .then(() => navigate('/'))
      .catch((err) => console.error('Fetch error', err))
  }

  return (
    <div className={cl.login}>
      <Title>Вход</Title>

      <form className={cl.form} onSubmit={handleSubmit}>
        <InputWithLabel name="email" placeholder="Email" ref={firstInputRef}>
          Ваш email
        </InputWithLabel>

        <InputWithLabel name="password" type="password" placeholder="Пароль">
          Ваш пароль
        </InputWithLabel>

        {errorMsg && <div className={cl.error}>{errorMsg}</div>}

        <Button appearance="big" disabled={isLoading}>
          Вход
        </Button>
      </form>

      <div className={cl.reg}>
        <span>Нет акканута?</span>
        <Link to="/auth/register">Зарегистрироваться</Link>
      </div>
    </div>
  )
}
