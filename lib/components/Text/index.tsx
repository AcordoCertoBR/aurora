import DynamicTagComponentStories from '../misc/DynamicTagComponent'
import classNames from 'classnames'
import { TextProps } from './types'
import Conditional from '../misc/Conditional'
import React from 'react'
import './styles.scss'

const Text: React.FC<TextProps> = ({
  as = 'p',
  children,
  className = '',
  color = 'common',
  variant = 'body-large',
  variantDesk,
  weight = 'bold',
  dangerouslySetInnerHTML,
  ...props
}: TextProps) => {
  const rootClasses = classNames('au-text', {
    [`au-text--${variant}`]: !!variant,
    [`au-text--desk-${variantDesk}`]: !!variantDesk,
    [`au-text--color-${color}`]: !!color,
    [`au-text--weight-${weight}`]: !!weight,
    [className]: !!className,
  })

  return (
    <DynamicTagComponentStories tag={as} className={rootClasses} {...props}>
      <Conditional
        condition={dangerouslySetInnerHTML}
        renderIf={
          <div dangerouslySetInnerHTML={{ __html: dangerouslySetInnerHTML }} />
        }
        renderElse={children}
      />
    </DynamicTagComponentStories>
  )
}

export default Text
