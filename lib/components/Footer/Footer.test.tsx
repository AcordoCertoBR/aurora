/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Footer } from './index'
import * as isMobileModule from '@core/utils/isMobile'
import { FooterProps } from './types'

vi.mock('../LazyImage', () => ({
  LazyImage: (props: any) => (
    <img
      data-testid={props.alt || 'lazy'}
      src={props.src}
      onClick={props.onClick}
      className={props.className}
    />
  ),
}))

describe('Footer', () => {
  let openSpy: any

  beforeEach(() => {
    openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
  })

  afterEach(() => {
    openSpy.mockRestore()
    vi.restoreAllMocks()
  })

  it('renders the footer with logo and links', () => {
    const mockLogo = <div>Mock Logo</div>
    const mockCategoryLinks = [
      {
        categoryTitle: 'Category 1',
        links: [
          { title: 'Link 1', url: 'https://example.com/1' },
          { title: 'Link 2', url: 'https://example.com/2' },
        ],
      },
    ]

    render(
      <Footer
        logo={mockLogo}
        categoryLinks={mockCategoryLinks}
        socialLinks={{}}
        cnpj="00.000.000/0000-00"
        address="Mock Address"
        companyOverview="Mock Overview"
        certificates={[]}
        copyrights="Mock Copyrights"
      />,
    )

    expect(screen.getByText('Mock Logo')).toBeInTheDocument()
    expect(screen.getByText('Category 1')).toBeInTheDocument()
    expect(screen.getByText('Link 1')).toBeInTheDocument()
    expect(screen.getByText('Link 2')).toBeInTheDocument()
  })

  it('renders category links as anchors with correct href and target', () => {
    const mockLogo = <div>Mock Logo</div>
    const mockCategoryLinks = [
      {
        categoryTitle: 'Category 1',
        links: [{ title: 'Link 1', url: 'https://example.com/1' }],
      },
    ]

    render(
      <Footer
        logo={mockLogo}
        categoryLinks={mockCategoryLinks}
        socialLinks={{}}
        cnpj="00.000.000/0000-00"
        address="Mock Address"
        companyOverview="Mock Overview"
        certificates={[]}
        copyrights="Mock Copyrights"
      />,
    )

    const link = screen.getByText('Link 1').closest('a')
    expect(link).toHaveAttribute('href', 'https://example.com/1')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('maps socialLinks and only marks as clickable when url present', () => {
    vi.spyOn(isMobileModule, 'isMobile').mockReturnValue(false)

    const mockLogo = <div>Mock Logo</div>
    const mockCategoryLinks = [
      {
        categoryTitle: 'Category 1',
        links: [],
      },
    ]

    const socialLinks = {
      instagram: 'https://instagram.com/brand',
      facebook: '',
    }

    render(
      <Footer
        logo={mockLogo}
        categoryLinks={mockCategoryLinks}
        socialLinks={socialLinks}
        cnpj="00.000.000/0000-00"
        address="Mock Address"
        companyOverview="Mock Overview"
        certificates={[]}
        copyrights="Mock Copyrights"
      />,
    )

    const socialAnchors = document.querySelectorAll(
      '.au-footer-full__links-socials .au-footer-full__links',
    )
    expect(socialAnchors.length).toBe(2)

    const clickable = document.querySelectorAll(
      '.au-footer-full__links-socials .au-footer-full__links--is-clickable',
    )
    expect(clickable.length).toBe(1)
    expect(clickable[0]).toHaveAttribute('href', 'https://instagram.com/brand')
    expect(clickable[0]).toHaveAttribute('target', '_blank')
  })

  it('maps stores and renders clickable LazyImage on mobile', () => {
    vi.spyOn(isMobileModule, 'isMobile').mockReturnValue(true)

    const mockLogo = <div>Mock Logo</div>
    const mockCategoryLinks = [
      {
        categoryTitle: 'Category 1',
        links: [],
      },
    ]

    const stores = {
      googleplay: 'https://play.google.com/app',
      appstore: '',
    }

    render(
      <Footer
        logo={mockLogo}
        categoryLinks={mockCategoryLinks}
        socialLinks={{}}
        cnpj="00.000.000/0000-00"
        address="Mock Address"
        companyOverview="Mock Overview"
        certificates={[]}
        copyrights="Mock Copyrights"
        stores={stores}
      />,
    )

    const storeImg = screen.getByTestId('Google Play')
    const anchor = storeImg.closest('a')
    expect(anchor).toHaveAttribute('href', 'https://play.google.com/app')
    expect(anchor).toHaveAttribute('target', '_blank')
  })

  it('maps stores and renders bottom stores on desktop', () => {
    vi.spyOn(isMobileModule, 'isMobile').mockReturnValue(false)

    const mockLogo = <div>Mock Logo</div>
    const mockCategoryLinks = [
      {
        categoryTitle: 'Category 1',
        links: [],
      },
    ]

    const stores = {
      googleplay: 'https://play.google.com/app',
    }

    render(
      <Footer
        logo={mockLogo}
        categoryLinks={mockCategoryLinks}
        socialLinks={{}}
        cnpj="00.000.000/0000-00"
        address="Mock Address"
        companyOverview="Mock Overview"
        certificates={[]}
        copyrights="Mock Copyrights"
        stores={stores}
      />,
    )

    expect(
      document.querySelector(
        '.au-footer-full__bottom-side .au-footer-full__stores',
      ),
    ).toBeTruthy()
  })

  it('renders simple footer (no categoryLinks) with certificates and copyrights', () => {
    const mockLogo = <div>Simple Logo</div>
    const certificates = [
      'fintech2022',
      'pcidss',
    ] as FooterProps['certificates']
    const copyrights = '© 2025 Company'

    render(
      <Footer
        logo={mockLogo}
        socialLinks={{}}
        cnpj="00.000.000/0000-00"
        address="Mock Address"
        companyOverview={undefined}
        certificates={certificates}
        copyrights={copyrights}
      />,
    )

    expect(document.querySelector('.au-footer')).toBeTruthy()
    expect(screen.getByTestId('Melhores Fintechs 2022')).toBeInTheDocument()
    expect(screen.getByTestId('PCI DSS Compliant')).toBeInTheDocument()
    expect(screen.getByText('© 2025 Company')).toBeInTheDocument()
  })
})
