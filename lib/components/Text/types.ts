type TextVariant =
  | 'display-large'
  | 'display-medium'
  | 'display-small'
  | 'heading-big'
  | 'heading-large'
  | 'heading-medium'
  | 'heading-small'
  | 'heading-micro'
  | 'body-big'
  | 'body-large'
  | 'body-medium'
  | 'body-small'
  | 'caption'

type TextWeight = 'bold' | 'semibold' | 'medium' | 'regular' | 'light'

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof React.ReactHTML
  className?: string
  color?: 'common' | 'secondary'
  variant?: TextVariant
  variantDesk?: TextVariant
  weight?: TextWeight
  dangerouslySetInnerHTML?: any
}
