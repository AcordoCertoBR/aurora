import { IconX } from '@components/icons'
import classNames from 'classnames'

import './styles.scss'

type ModalProps = {
  isOpen: boolean
  onClose?: () => void
  headerContent?: React.ReactNode | string | JSX.Element | JSX.Element[]
  content?: React.ReactNode | string | JSX.Element | JSX.Element[]
  layout?: 'default' | 'centralized'
}

export const Modal = ({
  isOpen,
  onClose,
  headerContent,
  content,
  layout = 'default',
}: ModalProps) => {
  if (!isOpen) return null

  const modalClasses = classNames('au-modal', {
    'au-modal--is-open': isOpen,
    'au-modal--default': layout !== 'centralized',
    'au-modal--centralized': layout === 'centralized',
  })

  return (
    <div className={modalClasses}>
      <div
        className={classNames('au-modal__container', {
          'au-modal__container--default': layout !== 'centralized',
          'au-modal__container--centralized': layout === 'centralized',
        })}>
        <div className="au-modal__header">
          <div className="au-modal__header-close" onClick={onClose}>
            <IconX />
          </div>
          {headerContent}
        </div>
        <div className="au-modal__content">{content}</div>
      </div>
    </div>
  )
}
