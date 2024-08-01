import { IconBell, IconChevronDown, IconMenu } from '../../icons/default'

export type HeaderProfileProps = {
  onClickNotifications?: () => void
  onClickMenu?: () => void
}

export const HeaderProfile = ({
  onClickNotifications,
  onClickMenu,
}: HeaderProfileProps) => {
  return (
    <div className="au-header__profile">
      <div
        className="au-header__profile-notifications"
        onClick={onClickNotifications}>
        <IconBell />
      </div>

      <div className="au-header__profile-menu-mobile" onClick={onClickMenu}>
        <IconMenu />
      </div>

      <div className="au-header__profile-menu" onClick={onClickMenu}>
        <div className="au-header__profile-letters">FS</div>
        <IconChevronDown />
      </div>
    </div>
  )
}
