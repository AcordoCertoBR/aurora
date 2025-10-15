import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
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
