import classNames from 'classnames'
import { ReactNode } from 'react'
import { IconX } from '../icons/default'
import './styles.scss'

type DrawerProps = {
  renderHeader: ReactNode | string | JSX.Element | JSX.Element[]
  renderContent: ReactNode | string | JSX.Element | JSX.Element[]
  isOpen: boolean
  handleOpen: () => void
}

export const Drawer = ({
  renderHeader,
  renderContent,
  isOpen = false,
  handleOpen,
}: DrawerProps) => {

  if(!isOpen) return null
  
  return (
    <div
      className={classNames('au-drawer', {
        'au-drawer--is-open': isOpen,
      })}>
      <div className="au-drawer__container">
        <div className="au-drawer__header">
          {renderHeader}
          <button className="au-drawer__header-close" onClick={handleOpen}>
            <IconX />
          </button>
        </div>
        <div className="au-drawer__content">{renderContent}</div>
      </div>
    </div>
  )
}
