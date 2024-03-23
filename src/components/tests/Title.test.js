import { render } from '@testing-library/react'
import { Title } from '../Title/Title'

describe('Title', () => {
  it('renders component correctly', () => {
    const { getByText } = render(<Title>Test Title</Title>)

    expect(getByText('Test Title')).toBeInTheDocument()
  })

  it('applies custom class name', () => {
    const customClassName = 'my-custom-class'
    const { container } = render(
      <Title className={customClassName}>Test Title</Title>
    )

    expect(container.firstChild).toHaveClass(customClassName)
  })

  it('applies default class name', () => {
    const { container } = render(<Title>Test Title</Title>)

    expect(container.firstChild).toHaveClass('title')
  })
})
