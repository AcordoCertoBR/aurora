import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { PartnerBanner } from '.'

describe('PartnerBanner', () => {
  it('renders the text and the button label', () => {
    render(<PartnerBanner text="Oferta especial" btnText="Ver oferta" />)

    expect(screen.getByText('Oferta especial')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Ver oferta' }),
    ).toBeInTheDocument()
  })

  it('renders as a complementary landmark labelled by ariaLabel', () => {
    render(
      <PartnerBanner
        text="Oferta"
        btnText="Ver"
        ariaLabel="Oferta de parceiro"
      />,
    )

    expect(
      screen.getByRole('complementary', { name: 'Oferta de parceiro' }),
    ).toBeInTheDocument()
  })

  it('exposes a button with type="button"', () => {
    render(<PartnerBanner text="Oferta" btnText="Ver" />)

    expect(screen.getByRole('button', { name: 'Ver' })).toHaveAttribute(
      'type',
      'button',
    )
  })

  it('calls onButtonClick when the button is clicked', () => {
    const onButtonClick = vi.fn()
    render(
      <PartnerBanner text="Oferta" btnText="Ver" onButtonClick={onButtonClick} />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Ver' }))
    expect(onButtonClick).toHaveBeenCalledTimes(1)
  })

  it('renders the icon and applies the --with-icon modifier when an icon is given', () => {
    render(
      <PartnerBanner
        text="Oferta"
        btnText="Ver"
        icon={<svg data-testid="partner-icon" />}
      />,
    )

    expect(screen.getByTestId('partner-icon')).toBeInTheDocument()
    expect(document.querySelector('.au-partner-banner')).toHaveClass(
      'au-partner-banner--with-icon',
    )
  })

  it('does not render the icon slot nor the modifier when no icon is given', () => {
    render(<PartnerBanner text="Oferta" btnText="Ver" />)

    expect(document.querySelector('.au-partner-banner__icon')).toBeNull()
    expect(document.querySelector('.au-partner-banner')).not.toHaveClass(
      'au-partner-banner--with-icon',
    )
  })

  it('merges a custom className', () => {
    render(<PartnerBanner text="Oferta" btnText="Ver" className="custom-class" />)

    expect(document.querySelector('.au-partner-banner')).toHaveClass(
      'custom-class',
    )
  })
})
