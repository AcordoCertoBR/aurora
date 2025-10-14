import { IconX } from '@components/icons'
import classNames from 'classnames'
import { If } from '../misc'

import './styles.scss'

type ModalLayout = 'default' | 'centralized'

type ModalProps = {
  isOpen: boolean
  onClose?: () => void
  headerContent?: React.ReactNode | string | JSX.Element | JSX.Element[]
  content?: React.ReactNode | string | JSX.Element | JSX.Element[]
  layoutMobile?: ModalLayout
  layoutDesktop?: ModalLayout
}

export const Modal = ({
  isOpen,
  onClose,
  headerContent,
  content,
  layoutMobile = 'default',
  layoutDesktop = 'default',
}: ModalProps) => {
  if (!isOpen) return null

  const modalClasses = classNames('au-modal', {
    'au-modal--is-open': isOpen,
    'au-modal--mobile-centralized': layoutMobile === 'centralized',
    'au-modal--desktop-centralized': layoutDesktop === 'centralized',
  })

  return (
    <div className={modalClasses}>
      <div className="au-modal__container">
        <div className="au-modal__header">
          <If condition={!!onClose}>
          <button className="au-modal__header-close" onClick={onClose}>
            <IconX />
          </button>
          </If>
          {headerContent}
        </div>
        <div className="au-modal__content">{content}</div>
      </div>
    </div>
  )
}
