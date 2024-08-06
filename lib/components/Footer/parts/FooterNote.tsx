import { ReactNode } from 'react'

export type FooterNoteProps = {
  children: ReactNode | string | JSX.Element | JSX.Element[]
}

export const FooterNote = ({ children }: FooterNoteProps) => {
  return <div className="au-footer__note">{children}</div>
}
