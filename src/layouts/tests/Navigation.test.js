import { renderWithRouter } from './../../utils/testing'
import { Navigation } from '../MainLayout/Aside/Navigation/Navigation'
import * as ReduxHooks from './../../hooks/redux'

const mockedSelector = jest.spyOn(ReduxHooks, 'useAppSelector')

describe('Navigation', () => {
  it('renders correctly with empty cart', () => {
    mockedSelector.mockReturnValueOnce([])

    const { getByText, container } = renderWithRouter(<Navigation />)

    expect(getByText('Меню')).toBeInTheDocument()
    expect(getByText('Корзина')).toBeInTheDocument()
    expect(container.querySelector('.count')).not.toBeInTheDocument()
  })

  it('renders correctly with non-empty cart', () => {
    mockedSelector.mockReturnValueOnce([
      { id: 1, count: 1 },
      { id: 2, count: 2 },
    ])

    const { getByText, container } = renderWithRouter(<Navigation />)

    expect(getByText('Меню')).toBeInTheDocument()
    expect(getByText('Корзина')).toBeInTheDocument()
    expect(container.querySelector('.count')).toBeInTheDocument()
    expect(container.querySelector('.count').textContent).toBe('3')
  })
})
