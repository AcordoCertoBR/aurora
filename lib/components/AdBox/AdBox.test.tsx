import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { AdBox } from '.'

describe('AdBox', () => {
  it('renders the mandatory "Publicidade" label and exposes it as aria-label', () => {
    render(<AdBox />)

    expect(screen.getByText('Publicidade')).toBeInTheDocument()
    expect(
      screen.getByRole('complementary', { name: 'Publicidade' }),
    ).toBeInTheDocument()
  })

  it('applies the default type modifier (content)', () => {
    render(<AdBox />)

    const root = document.querySelector('.au-ad-box')
    expect(root).toHaveClass('au-ad-box--type-content')
  })

  it('applies the given type modifier', () => {
    render(<AdBox type="heading" />)

    const root = document.querySelector('.au-ad-box')
    expect(root).toHaveClass('au-ad-box--type-heading')
  })

  it('renders the creative passed as children in the slot', () => {
    render(
      <AdBox>
        <img alt="Anúncio do parceiro" src="creative.png" />
      </AdBox>,
    )

    expect(screen.getByAltText('Anúncio do parceiro')).toBeInTheDocument()
  })

  it('merges a custom className', () => {
    render(<AdBox className="custom-class" />)

    expect(document.querySelector('.au-ad-box')).toHaveClass('custom-class')
  })
})
