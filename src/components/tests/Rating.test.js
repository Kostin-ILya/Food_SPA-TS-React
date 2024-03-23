import { render } from '@testing-library/react'
import { Rating } from '../Rating'

describe('Rating', () => {
  it('renders component correctly', () => {
    const { getByText, getByRole } = render(<Rating rating={4} />)

    expect(getByRole('img')).toBeInTheDocument()
    expect(getByText('4')).toBeInTheDocument()
  })

  it('applies default class name', () => {
    const { container } = render(<Rating rating={4} />)

    expect(container.firstChild).toHaveClass('rating')
  })

  it('applies absolute class name', () => {
    const { container } = render(<Rating rating={4} absolute />)

    expect(container.firstChild).toHaveClass('rating', 'absolute')
  })
})
