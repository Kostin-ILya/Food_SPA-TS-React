import { render, fireEvent } from '@testing-library/react'
import { Button } from '../UI/Button'

describe('Button', () => {
  it('renders component correctly', () => {
    const { getByText } = render(<Button>Test Button</Button>)

    expect(getByText('Test Button')).toBeInTheDocument()
  })

  it('triggers onClick event', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>
    )

    fireEvent.click(getByText('Click me'))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    const { getByRole } = render(<Button disabled>Disabled Button</Button>)

    expect(getByRole('button')).toBeDisabled()
  })

  it('applies custom class name', () => {
    const customClassName = 'custom-class'
    const { container } = render(
      <Button className={customClassName}>Custom Button</Button>
    )

    expect(container.firstChild).toHaveClass(customClassName)
  })

  it('applies big class', () => {
    const { container } = render(<Button appearance="big">Big Button</Button>)

    expect(container.firstChild).toHaveClass('big')
  })

  it('applies withIcon class', () => {
    const { container } = render(
      <Button appearance="withIcon">Icon Button</Button>
    )

    expect(container.firstChild).toHaveClass('withIcon')
  })

  it('applies default class', () => {
    const { container } = render(<Button>Icon Button</Button>)

    expect(container.firstChild).toHaveClass('button')
  })
})
