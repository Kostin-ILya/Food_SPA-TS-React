import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { Title } from 'components/Title'
import { InputWithLabel } from 'components/UI/Input/InputWithLabel'
import { Button } from 'components/UI/Button'

import cl from './Login.module.scss'

export const Login = () => {
  const [error, setError] = useState<string | null>(null)
  const submitBtnRef = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()

  const handleSubmit = async (
    e: React.FormEvent<
      HTMLFormElement & { email: HTMLInputElement; password: HTMLInputElement }
    >
  ) => {
    e.preventDefault()

    submitBtnRef.current && (submitBtnRef.current.disabled = true)
    setError(null)
    try {
      const { data } = await axios.post('/auth/login', {
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      })

      localStorage.setItem('jwt', data.access_token)
      navigate('/')
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.message)
      }
    } finally {
      submitBtnRef.current && (submitBtnRef.current.disabled = false)
    }
  }

  return (
    <div className={cl.login}>
      <Title>Вход</Title>

      <form className={cl.form} onSubmit={handleSubmit}>
        <InputWithLabel name="email" placeholder="Email">
          Ваш email
        </InputWithLabel>

        <InputWithLabel name="password" type="password" placeholder="Пароль">
          Ваш пароль
        </InputWithLabel>

        {error && <div className={cl.error}>{error}</div>}

        <Button appearance="big" ref={submitBtnRef}>
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
