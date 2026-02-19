import { IconX } from '@components/icons'
import { SubHeader } from '@components/SubHeader'
import classNames from 'classnames'
import { If, IfElse, Then, Else } from '../misc'

import { isMobile } from '@core/utils/isMobile'

import './styles.scss'

type ModalLayout = 'default' | 'centralized'
type ModalLayoutMobile = 'default' | 'centralized' | 'full-screen'

export type ModalProps = {
  isOpen: boolean
  onClose?: () => void
  headerContent?: React.ReactNode | string | JSX.Element | JSX.Element[]
  content?: React.ReactNode | string | JSX.Element | JSX.Element[]
  layoutMobile?: ModalLayoutMobile
  layoutDesktop?: ModalLayout
  mobileModalTitle?: string
  handleHelpInfo?: () => void
}

export const Modal = ({
  isOpen,
  onClose,
  headerContent,
  content,
  layoutMobile = 'default',
  layoutDesktop = 'default',
  mobileModalTitle = 'Título',
  handleHelpInfo,
}: ModalProps) => {
  if (!isOpen) return null

  const modalClasses = classNames('au-modal', {
    'au-modal--is-open': isOpen,
    'au-modal--mobile-full-screen': layoutMobile === 'full-screen',
    'au-modal--mobile-centralized': layoutMobile === 'centralized',
    'au-modal--desktop-centralized': layoutDesktop === 'centralized',
  })

  return (
    <div className={modalClasses}>
      <div className="au-modal__container">
        <div className="au-modal__header">
          <IfElse condition={layoutMobile !== 'full-screen' || !isMobile()}>
            <Then>
              <If condition={!!onClose}>
                <button className="au-modal__header-close" onClick={onClose}>
                  <IconX />
                </button>
              </If>
              {headerContent}
            </Then>
            <Else>
              <If condition={!!onClose}>
                <SubHeader
                  title={mobileModalTitle}
                  handleReturn={onClose!}
                  handleHelpInfo={handleHelpInfo}
                />
              </If>
            </Else>
          </IfElse>
        </div>
        <div className="au-modal__content">{content}</div>
      </div>
    </div>
  )
}
