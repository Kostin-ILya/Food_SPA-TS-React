import { render, fireEvent } from '@testing-library/react'
import { InputWithLabel } from 'components/UI/Input/InputWithLabel'

describe('InputWithLabel', () => {
  it('renders input with the correct label', () => {
    const { getByLabelText } = render(
      <InputWithLabel name="test">Label</InputWithLabel>
    )
    const input = getByLabelText('Label')

    expect(input).toBeInTheDocument()
  })

  it('passes additional props to Input component', () => {
    const handleChange = jest.fn()
    const { getByLabelText } = render(
      <InputWithLabel
        name="test"
        onChange={handleChange}
        placeholder="Enter text"
      >
        Label
      </InputWithLabel>
    )
    const input = getByLabelText('Label')

    fireEvent.change(input, { target: { value: 'New text' } })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(input).toHaveAttribute('placeholder', 'Enter text')
  })
})
