import { IconMenu } from '@components/icons/default'

export type HeaderHamburgerProps = {
  onClick?: () => void
  isOpen?: boolean
  controls?: string
}

export const HeaderHamburger = ({ onClick, isOpen, controls }: HeaderHamburgerProps) => {
  return (
    <button
      type="button"
      className="au-header__hamburger"
      onClick={onClick}
      aria-label="Abrir menu de navegação"
      aria-expanded={isOpen}
      aria-controls={controls}>
      <IconMenu aria-hidden="true" />
    </button>
  )
}
