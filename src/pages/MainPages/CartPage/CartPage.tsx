import { Title } from 'components/Title'
import cl from './CartPage.module.scss'
import { Button } from 'components/UI/Button'

export interface CartPageProps {}

export const CartPage = (/* {}: CartPageProps */) => {
  return (
    <>
      <Title>Корзина</Title>

      <main className={cl.cartPage}>
        {/* <div className={cl.cartList}></div> */}

        <div className={cl.promo}>
          <input type="text" placeholder="Промокод" />
          <Button>Применить</Button>
        </div>

        <div className={cl.summary}>
          <div>
            <span>Итог</span>
            <div>
              600 <span className={cl.ruble}>₽</span>
            </div>
          </div>
          <div>
            <span>Доставка</span>
            <div>
              600 <span className={cl.ruble}>₽</span>
            </div>
          </div>
          <div>
            <span>Общая стоимость</span>
            <div>
              1200 <span className={cl.ruble}>₽</span>
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
