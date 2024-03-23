import { render, fireEvent } from '@testing-library/react'
import { Input } from 'components/UI/Input'

describe('Input', () => {
  it('renders without crashing', () => {
    const { getByPlaceholderText } = render(
      <Input name="test" placeholder="Test Input" />
    )

    expect(getByPlaceholderText('Test Input')).toBeInTheDocument()
  })

  it('accepts input correctly', () => {
    const { getByPlaceholderText } = render(
      <Input name="test" placeholder="Test Input" />
    )
    const input = getByPlaceholderText('Test Input')

    fireEvent.change(input, { target: { value: 'Testing' } })

    expect(input.value).toBe('Testing')
  })

  it('calls onChange prop when changed', () => {
    const handleChange = jest.fn()
    const { getByPlaceholderText } = render(
      <Input name="test" placeholder="Test Input" onChange={handleChange} />
    )
    const input = getByPlaceholderText('Test Input')

    fireEvent.change(input, { target: { value: 'Testing' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('has the correct type', () => {
    const { getByPlaceholderText } = render(
      <Input name="test" type="email" placeholder="Email Input" />
    )
    const input = getByPlaceholderText('Email Input')

    expect(input).toHaveAttribute('type', 'email')
  })

  it('applies search class when name is search', () => {
    const { getByPlaceholderText } = render(
      <Input name="search" placeholder="Search Input" />
    )
    const input = getByPlaceholderText('Search Input')

    expect(input).toHaveClass('search')
  })

  it('is required by default', () => {
    const { getByPlaceholderText } = render(
      <Input name="test" placeholder="Test Input" />
    )
    const input = getByPlaceholderText('Test Input')

    expect(input).toBeRequired()
  })

  it('disables autoComplete for password fields', () => {
    const { getByPlaceholderText } = render(
      <Input name="password" type="password" placeholder="Password Input" />
    )
    const input = getByPlaceholderText('Password Input')

    expect(input).toHaveAttribute('autoComplete', 'off')
  })
})
