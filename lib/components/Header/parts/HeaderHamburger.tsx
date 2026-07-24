import { IconMenu } from '@components/icons/default'

export type HeaderHamburgerProps = {
  onClick?: () => void
  isOpen?: boolean
  controls?: string
  'data-testid'?: string
}

export const HeaderHamburger = ({
  onClick,
  isOpen,
  controls,
  'data-testid': dataTestId,
}: HeaderHamburgerProps) => {
  return (
    <button
      type="button"
      className="au-header__hamburger"
      onClick={onClick}
      aria-label="Abrir menu de navegação"
      aria-expanded={isOpen}
      aria-controls={controls}
      data-testid={dataTestId}>
      <IconMenu aria-hidden="true" />
    </button>
  )
}
