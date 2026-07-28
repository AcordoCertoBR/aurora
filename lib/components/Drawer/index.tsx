import classNames from 'classnames'
import { ReactNode } from 'react'
import { IconX } from '../icons/default'
import './styles.scss'

type DrawerProps = {
  renderHeader: ReactNode | string | JSX.Element | JSX.Element[]
  renderContent: ReactNode | string | JSX.Element | JSX.Element[]
  isOpen: boolean
  handleOpen: () => void
  /**
   * Edge the drawer slides in from. 'right' is the classic side sheet;
   * 'bottom' renders the Bottom Sheet surface (Figma: Modal v2, Surface=BottomSheet).
   * @default 'right'
   */
  position?: 'right' | 'bottom'
  'data-testid'?: string
}

export const Drawer = ({
  renderHeader,
  renderContent,
  isOpen = false,
  handleOpen,
  position = 'right',
  'data-testid': dataTestId,
}: DrawerProps) => {

  return (
    <div
      className={classNames('au-drawer', {
        'au-drawer--is-open': isOpen,
        'au-drawer--position-bottom': position === 'bottom',
      })}
      role="dialog"
      aria-modal="true"
      data-testid={dataTestId}>
      <div className="au-drawer__container">
        <div className="au-drawer__header">
          {renderHeader}
          <button className="au-drawer__header-close" onClick={handleOpen} aria-label="Fechar">
            <IconX aria-hidden="true" />
          </button>
        </div>
        <div className="au-drawer__content">{renderContent}</div>
      </div>
    </div>
  )
}
