import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { Title } from 'components/Title'
import { InputWithLabel } from 'components/UI/Input/InputWithLabel'
import { Button } from 'components/UI/Button'

import { ErrorRes, SuccessfulAuthRes } from 'shared/interfaces/fetch.interface'
import cl from './RegistrationPage.module.scss'

export const RegistrationPage = () => {
  const [error, setError] = useState<string | null>(null)
  const submitBtnRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    submitBtnRef.current?.focus()
  }, [])

  const handleSubmit = async (
    e: React.FormEvent<
      HTMLFormElement & {
        email: HTMLInputElement
        password: HTMLInputElement
        name: HTMLInputElement
      }
    >
  ) => {
    e.preventDefault()

    submitBtnRef.current && (submitBtnRef.current.disabled = true)
    setError(null)
    try {
      const { data } = await axios.post<SuccessfulAuthRes>('/auth/register', {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
        name: e.currentTarget.name.value,
      })

      localStorage.setItem('jwt', data.access_token)
      navigate('/')
    } catch (err) {
      if (axios.isAxiosError<ErrorRes>(err)) {
        err.response && setError(err.response.data.message)
      }
    } finally {
      submitBtnRef.current && (submitBtnRef.current.disabled = false)
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
          ref={submitBtnRef}
        >
          Ваш email
        </InputWithLabel>

        <InputWithLabel name="password" type="password" placeholder="Пароль">
          Ваш пароль
        </InputWithLabel>

        <InputWithLabel name="name" placeholder="Имя">
          Ваше имя
        </InputWithLabel>

        {error && <div className={cl.error}>{error}</div>}

        <Button appearance="big">Зарегистрироваться</Button>
      </form>

      <div className={cl.login}>
        <span>Есть аккаунт?</span>
        <Link to="/auth/login">Войти</Link>
      </div>
    </div>
  )
}
