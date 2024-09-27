import { IconMenu } from '@components/icons/default'

export type HeaderHamburgerProps = {
  onClick?: () => void
}

export const HeaderHamburger = ({ onClick }: HeaderHamburgerProps) => {
  return (
    <div className="au-header__hamburger">
      <div className="au-header__hamburger" onClick={onClick}>
        <IconMenu />
      </div>
    </div>
  )
}
