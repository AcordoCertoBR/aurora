import { getInitialLetters } from '../../../core/utils/getInitialLetters'
import { IconBell, IconChevronDown, IconMenu } from '../../icons/default'

export type HeaderProfileProps = {
  onClickNotifications?: () => void
  onClickMenu?: () => void
  fullName: string
}

export const HeaderProfile = ({
  onClickNotifications,
  onClickMenu,
  fullName,
}: HeaderProfileProps) => {
  const initialLetters = getInitialLetters(fullName)
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
        <div className="au-header__profile-letters">{initialLetters}</div>
        <IconChevronDown />
      </div>
    </div>
  )
}
