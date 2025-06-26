import { getInitialLetters } from '@core/utils/getInitialLetters'
import { IconBell, IconChevronDown, IconMenu } from '@components/icons/default'
import { Conditional } from '@components/misc'

export type HeaderProfileProps = {
  onClickNotifications?: () => void
  onClickMenu?: () => void
  fullName: string
  showNotifications?: boolean
}

export const HeaderProfile = ({
  onClickNotifications,
  onClickMenu,
  fullName,
  showNotifications = true,
}: HeaderProfileProps) => {
  const initialLetters = getInitialLetters(fullName)
  return (
    <div className="au-header__profile">
      <Conditional
        condition={showNotifications}
        renderIf={
          <div
            className="au-header__profile-notifications"
            onClick={onClickNotifications}>
            <IconBell />
          </div>
        }
      />

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
