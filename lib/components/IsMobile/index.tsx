import { isMobile } from '../../core/utils/isMobile'
import { Conditional } from '../misc'
import { ReactNode } from 'react'

type IsMobileProps = {
  renderIf: ReactNode | string | JSX.Element | JSX.Element[]
  renderElse: ReactNode | string | JSX.Element | JSX.Element[]
}

export const IsMobile = ({ renderIf, renderElse }: IsMobileProps) => {
  return (
    <Conditional
      condition={!!isMobile()}
      renderIf={renderIf}
      renderElse={renderElse}
    />
  )
}
