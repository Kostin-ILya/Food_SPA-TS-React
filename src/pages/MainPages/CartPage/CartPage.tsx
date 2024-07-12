import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from 'hooks/redux'
import { useHTTP } from 'hooks/useHTTP'
import { IoChevronBackCircleOutline as Back } from 'react-icons/io5'
import { AnimatePresence } from 'framer-motion'
import Modal from 'react-modal'

import { Title } from 'components/Title'
import { Button } from 'components/UI/Button'
import { CartItem } from './CartItem'

import { getCartItems } from 'store/cart/cartSlice'
import { getJwt } from 'store/user/userSlice'
import cl from './CartPage.module.scss'

export const CartPage = () => {
  const items = useAppSelector(getCartItems)
  const jwt = useAppSelector(getJwt)
  const navigate = useNavigate()
  const { request, loadingStatus } = useHTTP('authApi')

  const promoRef = useRef<HTMLInputElement>(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isPromo, setIsPromo] = useState(false)

  const totalCost = items.reduce(
    (acc, item) => acc + item.price * item.count,
    0
  )

  const handleSendOrder = () => {
    request({
      url: '/order',
      method: 'post',
      body: { ...items },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then(() => {
        navigate('/success')
      })
      .catch((err) => console.error('Fetch error', err))
  }

  const handlePromo = () => {
    if (promoRef.current?.value.trim()) {
      setModalIsOpen(true)
      Modal.setAppElement('#root')

      promoRef.current.value = ''
      setIsPromo(true)
    }
  }

  if (!items.length) {
    return (
      <div className={cl.emptyCartPage}>
        <Title className={cl.title}>Корзина</Title>

        <Title className={cl.empty}>Корзина пуста</Title>
      </div>
    )
  }

  return (
    <>
      <header className={cl.header}>
        <Title className={cl.title}>Корзина</Title>
        <Link to="/" className={cl.back}>
          <Back />
        </Link>
      </header>

      <main className={cl.cartPage}>
        <div className={cl.cartList}>
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </AnimatePresence>
        </div>

        <div className={cl.promo}>
          <input ref={promoRef} type="text" placeholder="Промокод" />
          <Button onClick={() => handlePromo()} animated={false}>
            Применить
          </Button>
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
              Общая стоимость &nbsp;
              <span className={cl.count}>
                ({items.reduce((acc, item) => acc + item.count, 0)}шт.)
              </span>
              {isPromo && (
                <span className={cl.promoApplied}>&nbsp;-15% (промокод)</span>
              )}
            </span>
            <div>
              {!isPromo ? totalCost + 290 : totalCost * 0.85}
              <span className={cl.ruble}>&nbsp;₽</span>
            </div>
          </div>
        </div>

        <Button
          className={cl.buyBtn}
          appearance="big"
          onClick={handleSendOrder}
          disabled={loadingStatus === 'loading'}
        >
          Оформить
        </Button>
      </main>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Modal"
        className={cl.modal}
        overlayClassName={cl.overlay}
        bodyOpenClassName={null}
      >
        <div className={cl.modal}>
          <Title>Промокод применен</Title>
          <Button onClick={() => setModalIsOpen(false)}>Закрыть</Button>
        </div>
      </Modal>
    </>
  )
}

export default CartPage
