import { useState } from 'react'
import classNames from 'classnames'
import { Text } from '@components/Text'
import { IconPlay } from '@components/icons'
import pauseIcon from './pause.svg?raw'
import './styles.scss'

export type ChipBannerProps = {
  type?: 'play' | 'pause'
  timeInSeconds?: number
  loop?: boolean
  onComplete?: () => void
  negative?: boolean
  ariaLabel?: string
  onClick?: () => void
  className?: string
}

export const ChipBanner = ({
  type = 'pause',
  timeInSeconds,
  loop = false,
  onComplete,
  negative = false,
  ariaLabel,
  onClick,
  className = '',
}: ChipBannerProps) => {
  const [isPlaying, setIsPlaying] = useState(() => type === 'pause')
  // Bumping the key remounts the ring, resetting the sweep to 0. We only do
  // this when a run finishes — pausing/resuming keeps the same instance so it
  // freezes and continues from where it stopped.
  const [runId, setRunId] = useState(0)

  const label = isPlaying ? 'Pausar' : 'Reproduzir'
  const defaultAriaLabel = isPlaying
    ? 'Pausar reprodução'
    : 'Reproduzir conteúdo'

  const hasTimer = typeof timeInSeconds === 'number' && timeInSeconds > 0

  const handleClick = () => {
    setIsPlaying((prev) => !prev)
    onClick?.()
  }

  const handleRingEnd = () => {
    if (loop) return
    setIsPlaying(false)
    setRunId((prev) => prev + 1)
    onComplete?.()
  }

  const classes = classNames('au-chip-banner', {
    'au-chip-banner--negative': negative,
    [className]: !!className,
  })

  return (
    <button
      type="button"
      className={classes}
      aria-pressed={isPlaying}
      aria-label={ariaLabel ?? defaultAriaLabel}
      onClick={handleClick}>
      <span className="au-chip-banner__icon" aria-hidden="true">
        {isPlaying ? (
          <span
            className="au-chip-banner__pause"
            dangerouslySetInnerHTML={{ __html: pauseIcon }}
          />
        ) : (
          <IconPlay />
        )}
        {hasTimer && (
          <svg
            className="au-chip-banner__ring"
            viewBox="0 0 24 24"
            aria-hidden="true"
            style={{ visibility: isPlaying ? 'visible' : 'hidden' }}>
            <circle
              key={runId}
              className="au-chip-banner__ring-progress"
              cx="12"
              cy="12"
              r="10"
              fill="none"
              style={{
                animationDuration: `${timeInSeconds}s`,
                animationIterationCount: loop ? 'infinite' : 1,
                animationPlayState: isPlaying ? 'running' : 'paused',
              }}
              onAnimationEnd={handleRingEnd}
            />
          </svg>
        )}
      </span>
      <Text
        as="span"
        variant="body-medium"
        className="au-chip-banner__label">
        {label}
      </Text>
    </button>
  )
}
