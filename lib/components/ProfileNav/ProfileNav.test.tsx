import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProfileNav } from './index'

describe('ProfileNav', () => {
  it('renders initials from fullName and greeting with name', () => {
    render(<ProfileNav name="Gisele" fullName="Gisele Araujo" />)

    expect(screen.getByText('GA')).toBeInTheDocument()
    expect(screen.getByText('Olá, Gisele')).toBeInTheDocument()
    expect(screen.getByText('Tudo bem?')).toBeInTheDocument()
  })
})
