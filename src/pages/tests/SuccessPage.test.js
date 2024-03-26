import { fireEvent } from '@testing-library/react'

import { renderWithRouter } from 'utils/testing'
import { SuccessPage } from 'pages/MainPages/SuccessPage'
import { clearCart } from 'store/cart/cartSlice'
import * as ReduxHooks from 'hooks/redux'

const mockedDispatch = jest.spyOn(ReduxHooks, 'useAppDispatch')

describe('SuccessPage component', () => {
  it('renders component correctly', () => {
    mockedDispatch.mockReturnValueOnce(jest.fn())
    const { getByText, getByRole } = renderWithRouter(<SuccessPage />)

    expect(getByText('Ваш заказ успешно оформлен!')).toBeInTheDocument()
    expect(getByRole('img', { name: 'pizza' })).toBeInTheDocument()
    expect(getByText('Сделать новый заказ')).toBeInTheDocument()
  })

  it('calls clearCart on mount', () => {
    const dispatch = jest.fn()
    mockedDispatch.mockReturnValueOnce(dispatch)
    renderWithRouter(<SuccessPage />)

    expect(dispatch).toHaveBeenCalledWith(clearCart())
  })

  it('redirects to home page when button is clicked', () => {
    mockedDispatch.mockReturnValueOnce(jest.fn())
    const { getByRole } = renderWithRouter(<SuccessPage />)

    const button = getByRole('button', { name: 'Сделать новый заказ' })
    fireEvent.click(button)

    expect(window.location.pathname).toBe('/')
  })
})
