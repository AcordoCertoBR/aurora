import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Breadcrumb } from './index'

describe('Breadcrumb', () => {
  it('should render the title correctly', () => {
    render(<Breadcrumb title="Página Inicial" handleReturn={vi.fn()} />)

    expect(screen.getByText('Página Inicial')).toBeInTheDocument()
  })

  it('should call handleReturn when return button is clicked', async () => {
    const onReturn = vi.fn()
    render(<Breadcrumb title="Voltar" handleReturn={onReturn} />)

    const user = userEvent.setup()

    const returnBtn = document.querySelector('.au-breadcrumb__button')

    if (returnBtn) {
      await user.click(returnBtn)
    }

    expect(onReturn).toHaveBeenCalledTimes(1)
  })

  it('should not render help button when handleHelpInfo is not provided', () => {
    render(<Breadcrumb title="Sem Ajuda" handleReturn={vi.fn()} />)

    const root = document.querySelector('.au-breadcrumb')
    const helpBtn = document.querySelector('.au-icon--iconhelpcircle')
    expect(root).not.toHaveClass('au-breadcrumb--with-help')
    expect(helpBtn).not.toBeInTheDocument()
  })

  it('should render help button and call handleHelpInfo when provided', async () => {
    const onHelp = vi.fn()
    render(
      <Breadcrumb
        title="Com Ajuda"
        handleReturn={vi.fn()}
        handleHelpInfo={onHelp}
      />,
    )

    const user = userEvent.setup()
    const root = document.querySelector('.au-breadcrumb')

    expect(root).toHaveClass('au-breadcrumb--with-help')

    const buttons = document.querySelectorAll('.au-breadcrumb__button')
    const helpBtn = buttons[1]

    if (helpBtn) {
      await user.click(helpBtn)
    }

    expect(onHelp).toHaveBeenCalledTimes(1)
  })

  it('should have the correct structure and classes for styling', () => {
    render(<Breadcrumb title="Teste de Classe" handleReturn={vi.fn()} />)

    const titleElement = screen.getByText('Teste de Classe')

    expect(titleElement).toHaveClass('au-breadcrumb__title')
  })
})
