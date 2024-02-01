import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Title } from 'components/Title'
import { InputWithLabel } from 'components/UI/Input/InputWithLabel'
import { Button } from 'components/UI/Button'

import { useHTTP } from 'hooks/useHTTP'
import {
  FormInputs,
  SuccessfulAuthRes,
} from 'shared/interfaces/fetch.interface'
import cl from './LoginPage.module.scss'

export const LoginPage = () => {
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
        url: '/auth/login',
        method: 'post',
        body: {
          email: e.currentTarget.email.value,
          password: e.currentTarget.password.value,
        },
      })

      localStorage.setItem('jwt', res.access_token)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
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

        {errorMessage && <div className={cl.error}>{errorMessage}</div>}

        <Button appearance="big" disabled={loadingStatus === 'loading'}>
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
