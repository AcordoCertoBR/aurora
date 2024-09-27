import { ReactNode } from 'react'
import { Conditional } from '@components/misc'

export type HeaderLogoProps = {
  children?: ReactNode | string | JSX.Element | JSX.Element[]
  renderMobile?: ReactNode | string | JSX.Element | JSX.Element[]
  renderDesktop?: ReactNode | string | JSX.Element | JSX.Element[]
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
        renderIf={<div className="au-header__logo--mobile">{renderMobile}</div>}
      />
      <Conditional
        condition={!!renderDesktop}
        renderIf={
          <div className="au-header__logo--desktop">{renderDesktop}</div>
        }
      />
      {children}
    </div>
  )
}
