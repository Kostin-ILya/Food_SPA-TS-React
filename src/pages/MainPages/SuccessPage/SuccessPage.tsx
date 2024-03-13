import { useEffect } from 'react'
import { useAppDispatch } from 'hooks/redux'
import { Link } from 'react-router-dom'

import { Title } from 'components/Title'
import { Button } from 'components/UI/Button'

import { clearCart } from 'store/cart/cartSlice'
import cl from './SuccessPage.module.scss'

export const SuccessPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(clearCart())
  }, [dispatch])

  return (
    <div className={cl.successPage}>
      <img src="/images/pizza_success.png" alt="pizza" />
      <Title>Ваш заказ успешно оформлен!</Title>
      <Link to={'/'} className={cl.link}>
        <Button appearance="big">Сделать новый заказ</Button>
      </Link>
    </div>
  )
}
