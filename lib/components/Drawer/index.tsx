import classNames from 'classnames'
import { ReactNode, useState } from 'react'
import { IconX } from '../icons/default'
import './styles.scss'

type DrawerProps = {
  renderHeader: () => ReactNode
  renderContent: () => ReactNode
  isOpen: boolean
}

export const Drawer = ({
  renderHeader,
  renderContent,
  isOpen,
}: DrawerProps) => {
  const [open, toggleOpen] = useState<Boolean>(isOpen)

  function onClickClose() {
    toggleOpen((prev) => !prev)
  }

  return (
    <div
      className={classNames('au-drawer', {
        'is-open': open,
      })}>
      <div className="au-drawer__header">
        <div className="au-drawer__header-close" onClick={onClickClose}>
          <IconX />
        </div>
        {renderHeader()}
      </div>
      <div className="au-drawer__content">{renderContent()}</div>
    </div>
  )
}
