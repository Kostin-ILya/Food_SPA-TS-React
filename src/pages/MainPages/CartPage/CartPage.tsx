import { Title } from 'components/Title'
import cl from './CartPage.module.scss'
import { Button } from 'components/UI/Button'
import { CartItem } from './CartItem'
import { useAppDispatch, useAppSelector } from 'hooks/redux'
import { clearCart, getCartItems } from 'store/cart/cartSlice'
import axios from 'axios'
import { getJwt } from 'store/user/userSlice'
import { useState } from 'react'

export const CartPage = () => {
  const [isSending, setIsSending] = useState(false)
  const items = useAppSelector(getCartItems)
  const jwt = useAppSelector(getJwt)
  const dispatch = useAppDispatch()

  const totalCost = items.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  )

  items.map((item) => ({ id: item.id, count: item.count }))

  const handleSendOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsSending(true)

    axios
      .post(
        '/order',
        { ...items },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(() => {
        setIsSending(false)
        dispatch(clearCart())
      })
      .catch((err) => console.error('Fetch error', err))
  }

  if (!items.length) {
    return (
      <>
        <Title>Корзина</Title>
        <div className={cl.empty}>
          <Title>Корзина пуста</Title>
        </div>
      </>
    )
  }

  return (
    <>
      <Title>Корзина</Title>

      <main className={cl.cartPage}>
        <div className={cl.cartList}>
          {items.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>

        <div className={cl.promo}>
          <input type="text" placeholder="Промокод" />
          <Button>Применить</Button>
        </div>

        <div className={cl.summary}>
          <div>
            <span>Итог</span>
            <div>
              {totalCost} <span className={cl.ruble}>₽</span>
            </div>
          </div>
          <div>
            <span>Доставка</span>
            <div>
              290 <span className={cl.ruble}>₽</span>
            </div>
          </div>
          <div>
            <span>
              Общая стоимость
              <span className={cl.count}>
                {'  '}({items.reduce((acc, item) => acc + item.count, 0)})
              </span>
            </span>
            <div>
              {totalCost + 290} <span className={cl.ruble}>₽</span>
            </div>
          </div>
        </div>

        <Button
          className={cl.buyBtn}
          appearance="big"
          onClick={handleSendOrder}
          disabled={isSending}
        >
          Оформить
        </Button>
      </main>
    </>
  )
}