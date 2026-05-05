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
          <button
            type="button"
            className="au-header__profile-notifications"
            onClick={onClick}
            aria-label={
              shouldShowBadge
                ? `Notificações, ${count && count > 0 ? count : 'novas'}`
                : 'Notificações'
            }>
            <IconBell aria-hidden="true" />
            <Conditional
              condition={!!shouldShowBadge}
              renderIf={
                <span
                  className="au-header__profile-notifications-badge"
                  aria-hidden="true">
                  {count && count > 0 ? count : null}
                </span>
              }
            />
          </button>
        }
      />

      <button
        type="button"
        className="au-header__profile-menu-mobile"
        onClick={onClickMenu}
        aria-label="Abrir menu de perfil">
        <IconMenu aria-hidden="true" />
      </button>

      <button
        type="button"
        className="au-header__profile-menu"
        onClick={onClickMenu}
        aria-label={`Menu de ${fullName}`}>
        <span className="au-header__profile-letters" aria-hidden="true">
          {initialLetters}
        </span>
        <IconChevronDown aria-hidden="true" />
      </button>
    </div>
  )
}
