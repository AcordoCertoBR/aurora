import { ReactNode } from 'react'

export type CardEmphasisProps = {
  content: ReactNode
}
export const CardEmphasis = ({ content }: CardEmphasisProps) => {
  return <div>{content}</div>
}
