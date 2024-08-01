import classNames from 'classnames'
import { ReactNode } from 'react'
import { IconX } from '../icons/default'
import './styles.scss'

type DrawerProps = {
  renderHeader: () => ReactNode
  renderContent: () => ReactNode
  isOpen: boolean
  handleOpen: () => void
}

export const Drawer = ({
  renderHeader,
  renderContent,
  isOpen = false,
  handleOpen,
}: DrawerProps) => {
  return (
    <div
      className={classNames('au-drawer', {
        'is-open': isOpen,
      })}>
      <div className="au-drawer__header">
        <div className="au-drawer__header-close" onClick={handleOpen}>
          <IconX />
        </div>
        {renderHeader()}
      </div>
      <div className="au-drawer__content">{renderContent()}</div>
    </div>
  )
}
