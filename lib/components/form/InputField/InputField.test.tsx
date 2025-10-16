import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { createRef } from 'react'
import { InputField } from './index'

describe('InputField', () => {
  it('renders label and optional label when requested', () => {
    const { getByText } = render(
      <InputField label="Name" showOptionalLabel />,
    )

    expect(getByText('Name')).toBeInTheDocument()
    expect(getByText('(Opcional)')).toBeInTheDocument()
  })

  it('renders required asterisk when requiredInput is true and showOptionalLabel false', () => {
    const { queryByText, rerender } = render(
      <InputField label="Name" requiredInput={true} showOptionalLabel={false} />,
    )

    expect(queryByText('*')).toBeInTheDocument()

    rerender(<InputField label="Name" requiredInput={false} showOptionalLabel={false} />)
    expect(queryByText('*')).not.toBeInTheDocument()
  })

  it('renders rightSlot content inside InputHolder', () => {
    const { getByText } = render(
      <InputField rightSlot={<button>Send</button>} />,
    )

    expect(getByText('Send')).toBeInTheDocument()
  })

  it('forwards numericKeypad by setting inputMode on the input', () => {
    const { container } = render(<InputField numericKeypad />)
    const input = container.querySelector('input') as HTMLInputElement
    expect(input.getAttribute('inputmode')).toBe('numeric')
  })

  it('forwards onChange and supports inputRef', () => {
    const onChange = vi.fn()
    const ref = createRef<HTMLInputElement>()
    const { container } = render(
      <InputField onChange={onChange} inputRef={ref} />,
    )

    const input = container.querySelector('input') as HTMLInputElement
    expect(ref.current).toBe(input)

    fireEvent.change(input, { target: { value: 'hello' } })
    expect(onChange).toHaveBeenCalled()
  })

  it('renders errorMessage when error prop is true and shows helpMessage otherwise', () => {
    const { getByText, queryByText, rerender } = render(
      <InputField error errorMessage="Invalid" />,
    )
    expect(getByText('Invalid')).toBeInTheDocument()

    rerender(<InputField helpMessage="Helpful text" />)
    expect(getByText('Helpful text')).toBeInTheDocument()
    expect(queryByText('Invalid')).not.toBeInTheDocument()
  })
})
