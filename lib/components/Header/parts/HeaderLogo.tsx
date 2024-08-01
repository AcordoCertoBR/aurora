import { ReactNode } from 'react'
import { Conditional } from '../../misc'

export type HeaderLogoProps = {
  children?: ReactNode
  renderMobile?: () => ReactNode
  renderDesktop?: () => ReactNode
}

export const HeaderLogo = ({
  children,
  renderMobile,
  renderDesktop,
}: HeaderLogoProps) => {
  return (
    <div className="au-header__logo">
      <Conditional
        condition={!!renderMobile}
        renderIf={
          <div className="au-header__logo--mobile">
            {renderMobile && renderMobile()}
          </div>
        }
      />
      <Conditional
        condition={!!renderDesktop}
        renderIf={
          <div className="au-header__logo--desktop">
            {renderDesktop && renderDesktop()}
          </div>
        }
      />
      {children}
    </div>
  )
}
