import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useHTTP } from 'hooks/useHTTP'

import { Title } from 'components/Title'
import { InputWithLabel } from 'components/UI/Input/InputWithLabel'
import { Button } from 'components/UI/Button'

import {
  FormInputs,
  SuccessfulAuthRes,
} from 'shared/interfaces/fetch.interface'
import cl from './RegistrationPage.module.scss'

export const RegistrationPage = () => {
  const { request, loadingStatus, errorMessage } = useHTTP()
  const firstInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    firstInputRef.current?.focus()
  }, [])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement & FormInputs>
  ) => {
    e.preventDefault()

    try {
      const res = await request<SuccessfulAuthRes>({
        url: '/auth/register',
        method: 'post',
        body: {
          email: e.currentTarget.email.value,
          password: e.currentTarget.password.value,
          name: e.currentTarget.name.value,
        },
      })

      localStorage.setItem('jwt', res.access_token)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
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

        {errorMessage && <div className={cl.error}>{errorMessage}</div>}

        <Button appearance="big" disabled={loadingStatus === 'loading'}>
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
