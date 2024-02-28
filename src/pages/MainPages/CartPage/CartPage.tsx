import { Title } from 'components/Title'
import cl from './CartPage.module.scss'
import { Button } from 'components/UI/Button'
import { CartItem } from './CartItem'
import { useAppSelector } from 'hooks/redux'
import { getCartItems } from 'store/cart/cartSlice'

export const CartPage = () => {
  const items = useAppSelector(getCartItems)

  const totalCost = items.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  )

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
            <span>Общая стоимость</span>
            <div>
              {totalCost + 290} <span className={cl.ruble}>₽</span>
            </div>
          </div>
        </div>

        <Button className={cl.buyBtn} appearance="big">
          Оформить
        </Button>
      </main>
    </>
  )
}
