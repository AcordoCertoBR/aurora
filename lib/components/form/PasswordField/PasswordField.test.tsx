import { render, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { PasswordField } from './index'

describe('PasswordField', () => {
  it('renders PasswordField', () => {
    const { container } = render(<PasswordField />)
    expect(container).toBeInTheDocument()
  })

  it('toggles password visibility when button is clicked', () => {
    const { container, getByText } = render(<PasswordField />)

    const input = container.querySelector('input') as HTMLInputElement | null
    expect(input).not.toBeNull()
    expect(input).toHaveAttribute('type', 'password')

    const btn = getByText(/mostrar|ocultar/)

    fireEvent.click(btn)
    expect(input).toHaveAttribute('type', 'text')

    fireEvent.click(btn)
    expect(input).toHaveAttribute('type', 'password')
  })
})
