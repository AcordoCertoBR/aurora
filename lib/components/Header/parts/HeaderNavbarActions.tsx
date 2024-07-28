import { IconBell, IconChevronDown } from '../../icons/default'

type HeaderNavbarActionsProps = {
  onClickNotifications?: () => void
  onClickMenu?: () => void
}

export const HeaderNavbarActions = ({
  onClickNotifications,
  onClickMenu,
}: HeaderNavbarActionsProps) => {
  return (
    <div className="au-header__navbar-actions">
      <div
        className="au-header__navbar-notifications"
        onClick={onClickNotifications}>
        <IconBell />
      </div>

      <div className="au-header__navbar-menu" onClick={onClickMenu}>
        <div className="au-header__navbar-letters">FS</div>
        <IconChevronDown />
      </div>
    </div>
  )
}
