import { render, screen, fireEvent } from '@testing-library/react'
import { Search } from '../MainLayout/Main/Search/Search'

describe('Search', () => {
  const mockSearch = 'test'
  const mockSetSearch = jest.fn()

  beforeEach(() => {
    render(<Search search={mockSearch} setSearch={mockSetSearch} />)
  })

  it('renders the search input with the correct placeholder', () => {
    expect(
      screen.getByPlaceholderText('Введите блюдо или состав')
    ).toBeInTheDocument()
  })

  it('displays the correct search value', () => {
    expect(screen.getByDisplayValue(mockSearch)).toBeInTheDocument()
  })

  it('calls setSearch when the input changes', () => {
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'new search' } })

    expect(mockSetSearch).toHaveBeenCalledTimes(1)
  })
})
