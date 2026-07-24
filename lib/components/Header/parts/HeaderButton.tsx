import { ReactNode } from 'react'

export type HeaderButtonProps = {
  children: ReactNode | string | JSX.Element | JSX.Element[]
  onClick: () => void
  'data-testid'?: string
}

export const HeaderButton = ({
  children,
  onClick,
  'data-testid': dataTestId,
}: HeaderButtonProps) => {
  return (
    <button
      type="button"
      className="au-header__button"
      onClick={onClick}
      data-testid={dataTestId}>
      {children}
    </button>
  )
}
