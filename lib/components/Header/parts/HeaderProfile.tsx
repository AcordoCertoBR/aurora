import { getInitialLetters } from '@core/utils/getInitialLetters'
import { IconBell, IconChevronDown, IconMenu } from '@components/icons/default'
import { Conditional } from '@components/misc'

export type NotificationsConfig = {
  visible?: boolean
  count?: number
  hasUnread?: boolean
  onClick?: () => void
}

export type HeaderProfileProps = {
  fullName: string
  onClickMenu?: () => void
  notifications?: NotificationsConfig
}

export const HeaderProfile = ({
  fullName,
  onClickMenu,
  notifications = {},
}: HeaderProfileProps) => {
  const initialLetters = getInitialLetters(fullName)

  const { visible = true, hasUnread = false, count, onClick } = notifications
  const shouldShowBadge = (count && count > 0) || hasUnread

  return (
    <div className="au-header__profile">
      <Conditional
        condition={visible}
        renderIf={
          <div className="au-header__profile-notifications" onClick={onClick}>
            <IconBell />
            <Conditional
              condition={!!shouldShowBadge}
              renderIf={
                <div className="au-header__profile-notifications-badge">
                  {count}
                </div>
              }
            />
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
