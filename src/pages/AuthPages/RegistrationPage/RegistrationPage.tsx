import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Title } from 'components/Title'
import { InputWithLabel } from 'components/UI/Input/InputWithLabel'
import { Button } from 'components/UI/Button'

import { FormInputs } from 'shared/interfaces'
import cl from './RegistrationPage.module.scss'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { getFetchStatus } from 'store/user/userSlice'
import { registerUser } from 'store/user/asyncUserThunk'

export const RegistrationPage = () => {
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
      registerUser({
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
        name: e.currentTarget.name.value,
      })
    )
      .unwrap()
      .then(() => navigate('/'))
      .catch((err) => console.error('Fetch error', err))
  }

  return (
    <div className={cl.registration}>
      <Title>Регистрация</Title>

      <form className={cl.form} onSubmit={handleSubmit}>
        <InputWithLabel
          name="email"
          type="email"
          placeholder="Email"
          ref={firstInputRef}
        >
          Ваш email
        </InputWithLabel>

        <InputWithLabel name="password" type="password" placeholder="Пароль">
          Ваш пароль
        </InputWithLabel>

        <InputWithLabel name="name" placeholder="Имя">
          Ваше имя
        </InputWithLabel>

        {errorMsg && <div className={cl.error}>{errorMsg}</div>}

        <Button appearance="big" disabled={isLoading}>
          Зарегистрироваться
        </Button>
      </form>

      <div className={cl.login}>
        <span>Есть аккаунт?</span>
        <Link to="/auth/login">Войти</Link>
      </div>
    </div>
  )
}

export default RegistrationPage
