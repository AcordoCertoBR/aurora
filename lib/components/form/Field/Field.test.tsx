import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { createRef } from 'react'
import Field from './index'

describe('Field', () => {
  it('renders Field.Root', () => {
    const { container } = render(<Field.Root>Field Content</Field.Root>)
    expect(container).toBeInTheDocument()
  })

  it('renders Field.Label with text', () => {
    const { getByText } = render(<Field.Label text="Label" />)
    expect(getByText('Label')).toBeInTheDocument()
  })

  it('renders Field.Label with optional', () => {
    const { getByText } = render(<Field.Label text="Label" showOptionalLabel />)
    expect(getByText('Label')).toBeInTheDocument()
    expect(getByText('(Opcional)')).toBeInTheDocument()
  })

  it('shows * only when required is true and showOptionalLabel is false', () => {
    const { queryByText, rerender } = render(
      <Field.Label text="Label" required={false} showOptionalLabel={false} />,
    )
    expect(queryByText('*')).not.toBeInTheDocument()

    rerender(
      <Field.Label text="Label" required={true} showOptionalLabel={true} />,
    )
    expect(queryByText('*')).not.toBeInTheDocument()

    rerender(
      <Field.Label text="Label" required={true} showOptionalLabel={false} />,
    )
    expect(queryByText('*')).toBeInTheDocument()
  })

  it('renders Field.Input', () => {
    const { getByRole } = render(<Field.Input />)
    expect(getByRole('textbox')).toBeInTheDocument()
  })

  it('renders Field.TextArea', () => {
    const { getByRole } = render(<Field.TextArea />)
    expect(getByRole('textbox')).toBeInTheDocument()
  })

  it('renders Field.InputHolder with rightSideSlot', () => {
    const { getByText } = render(
      <Field.InputHolder rightSideSlot={<span>Right</span>} />,
    )
    expect(getByText('Right')).toBeInTheDocument()
  })

  it('renders Field.ErrorMessage when hasError is true', () => {
    const { getByText } = render(
      <Field.ErrorMessage hasError message="Error!" />,
    )
    expect(getByText('Error!')).toBeInTheDocument()
  })

  it('does not render Field.ErrorMessage when hasError is false', () => {
    const { queryByText } = render(
      <Field.ErrorMessage hasError={false} message="Error!" />,
    )
    expect(queryByText('Error!')).not.toBeInTheDocument()
  })

  it('renders Field.Message with helpMessage', () => {
    const { getByText } = render(<Field.Message helpMessage="Help here" />)
    expect(getByText('Help here')).toBeInTheDocument()
  })

  it('shows errorMessage in Field.Message only when hasError is true', () => {
    const { queryByText, rerender } = render(
      <Field.Message hasError={false} errorMessage="Error!" />,
    )
    expect(queryByText('Error!')).not.toBeInTheDocument()

    rerender(<Field.Message hasError={true} errorMessage="Error!" />)
    expect(queryByText('Error!')).toBeInTheDocument()
  })
})

describe('Field.TextArea (hook integration)', () => {
  it('renders and shows char counter when maxLength is provided', () => {
    const { container, getByText } = render(<Field.TextArea maxLength={10} />)

    expect(container.querySelector('.au-field__textarea')).toBeTruthy()
    expect(getByText(/0\s*\/\s*10/)).toBeTruthy()
  })

  it('applies customClass and horizontalResize class', () => {
    const { container } = render(
      <Field.TextArea customClass="my-textarea" horizontalResize />,
    )

    const textarea = container.querySelector('.au-field__textarea')
    expect(textarea).toBeTruthy()
    expect(textarea?.classList.contains('my-textarea')).toBe(true)
    expect(textarea?.classList.contains('au-field__textarea--horizontal-resize')).toBe(true)
  })

  it('updates charCount and forwards onChange', () => {
    const onChange = vi.fn()
    const { container, getByText } = render(
      <Field.TextArea maxLength={5} onChange={onChange} />,
    )

    const textarea = container.querySelector('textarea') as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: 'abc' } })

    expect(onChange).toHaveBeenCalled()
    expect(getByText(/3\s*\/\s*5/)).toBeTruthy()
  })

  it('supports textareaRef and can be focused', () => {
    const ref = createRef<HTMLTextAreaElement>()
    const { container } = render(<Field.TextArea textareaRef={ref} />)

    const textarea = container.querySelector('textarea') as HTMLTextAreaElement
    expect(ref.current).toBe(textarea)

    ref.current?.focus()
    expect(document.activeElement).toBe(ref.current)
  })
})
