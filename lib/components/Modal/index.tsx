import { IconX } from '@components/icons'
import classNames from 'classnames'

type ModalProps = {
  isOpen: boolean
  onClose?: () => void
  headerContent?: React.ReactNode | string | JSX.Element | JSX.Element[]
  content?: React.ReactNode | string | JSX.Element | JSX.Element[]
}

export const Modal = ({
  isOpen,
  onClose,
  headerContent,
  content,
}: ModalProps) => {
  if (!isOpen) return null

  const modalClasses = classNames('au-modal', {
    'au-modal--is-open': isOpen,
  })

  return (
    <div className={modalClasses}>
      <div className="au-modal__container">
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
