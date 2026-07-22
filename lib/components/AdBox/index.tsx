import classNames from 'classnames'
import './styles.scss'

const AD_LABEL = 'Publicidade'

export type AdBoxProps = {
  children?: React.ReactNode
  type?: 'content' | 'heading'
  className?: string
}

export const AdBox = ({
  children,
  type = 'content',
  className = '',
}: AdBoxProps) => {
  const classes = classNames('au-ad-box', {
    [`au-ad-box--type-${type}`]: !!type,
    [className]: !!className,
  })

  return (
    <aside className={classes} aria-label={AD_LABEL}>
      <div className="au-ad-box__heading">
        <span className="au-ad-box__label">{AD_LABEL}</span>
      </div>
      <div className="au-ad-box__box">
        <div className="au-ad-box__container">{children}</div>
      </div>
    </aside>
  )
}
