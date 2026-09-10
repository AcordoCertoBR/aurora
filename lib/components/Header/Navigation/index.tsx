import { ReactNode } from 'react'

export type HeaderNavigationProps = {
  children: ReactNode | string | JSX.Element | JSX.Element[]
  'data-testid'?: string
}

export const HeaderNavigation = ({
  children,
  'data-testid': dataTestId,
}: HeaderNavigationProps) => {
  return <div className="au-header__navigation" data-testid={dataTestId}>{children}</div>
}
