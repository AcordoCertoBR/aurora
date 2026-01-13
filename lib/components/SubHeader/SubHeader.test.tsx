import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { SubHeader } from './index'

describe('SubHeader', () => {
  it('should render the title correctly', () => {
    render(<SubHeader title="Página Inicial" handleReturn={vi.fn()} />)

    expect(screen.getByText('Página Inicial')).toBeInTheDocument()
  })

  it('should call handleReturn when return button is clicked', async () => {
    const onReturn = vi.fn()
    render(<SubHeader title="Voltar" handleReturn={onReturn} />)

    const user = userEvent.setup()

    const returnBtn = document.querySelector('.au-sub-header__button')

    if (returnBtn) {
      await user.click(returnBtn)
    }

    expect(onReturn).toHaveBeenCalledTimes(1)
  })

  it('should not render help button when handleHelpInfo is not provided', () => {
    render(<SubHeader title="Sem Ajuda" handleReturn={vi.fn()} />)

    const root = document.querySelector('.au-sub-header')
    const helpBtn = document.querySelector('.au-icon--iconhelpcircle')
    expect(root).not.toHaveClass('au-sub-header--with-help')
    expect(helpBtn).not.toBeInTheDocument()
  })

  it('should render help button and call handleHelpInfo when provided', async () => {
    const onHelp = vi.fn()
    render(
      <SubHeader
        title="Com Ajuda"
        handleReturn={vi.fn()}
        handleHelpInfo={onHelp}
      />,
    )

    const user = userEvent.setup()
    const root = document.querySelector('.au-sub-header')

    expect(root).toHaveClass('au-sub-header--with-help')

    const buttons = document.querySelectorAll('.au-sub-header__button')
    const helpBtn = buttons[1]

    if (helpBtn) {
      await user.click(helpBtn)
    }

    expect(onHelp).toHaveBeenCalledTimes(1)
  })

  it('should have the correct structure and classes for styling', () => {
    render(<SubHeader title="Teste de Classe" handleReturn={vi.fn()} />)

    const titleElement = screen.getByText('Teste de Classe')

    expect(titleElement).toHaveClass('au-sub-header__title')
  })
})
