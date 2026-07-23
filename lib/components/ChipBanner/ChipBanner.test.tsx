import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { ChipBanner } from '.'

const getRing = () =>
  document.querySelector('.au-chip-banner__ring-progress') as SVGCircleElement | null

const getRingSvg = () =>
  document.querySelector('.au-chip-banner__ring') as SVGSVGElement | null

describe('ChipBanner', () => {
  it('renders the pause label and aria-pressed=true by default (playing)', () => {
    render(<ChipBanner />)

    expect(screen.getByText('Pausar')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
  })

  it('renders the play label and aria-pressed=false when type is "play"', () => {
    render(<ChipBanner type="play" />)

    expect(screen.getByText('Reproduzir')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false')
  })

  it('renders the pause.svg glyph in the pause (playing) state', () => {
    render(<ChipBanner type="pause" />)

    const glyph = document.querySelector('.au-chip-banner__pause svg')
    expect(glyph).toBeInTheDocument()
  })

  it('exposes a native button with type="button"', () => {
    render(<ChipBanner />)

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })

  it('provides a default aria-label describing the current action', () => {
    render(<ChipBanner type="pause" />)
    expect(
      screen.getByRole('button', { name: 'Pausar reprodução' }),
    ).toBeInTheDocument()
  })

  it('uses the "Reproduzir conteúdo" aria-label in the play state', () => {
    render(<ChipBanner type="play" />)
    expect(
      screen.getByRole('button', { name: 'Reproduzir conteúdo' }),
    ).toBeInTheDocument()
  })

  it('allows overriding the aria-label', () => {
    render(<ChipBanner type="play" ariaLabel="Assistir ao vídeo" />)

    expect(
      screen.getByRole('button', { name: 'Assistir ao vídeo' }),
    ).toBeInTheDocument()
    // The visible label stays the fixed design copy.
    expect(screen.getByText('Reproduzir')).toBeInTheDocument()
  })

  it('toggles between play and pause when clicked, and calls onClick', () => {
    const onClick = vi.fn()
    render(<ChipBanner type="pause" onClick={onClick} />)

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('Pausar')).toBeInTheDocument()

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(button).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText('Reproduzir')).toBeInTheDocument()
  })

  it('applies the --negative modifier when negative is set', () => {
    render(<ChipBanner negative />)

    expect(document.querySelector('.au-chip-banner')).toHaveClass(
      'au-chip-banner--negative',
    )
  })

  it('merges a custom className', () => {
    render(<ChipBanner className="custom-class" />)

    expect(document.querySelector('.au-chip-banner')).toHaveClass(
      'custom-class',
    )
  })

  describe('progress ring', () => {
    it('renders a decorative, visible, running ring while playing when timeInSeconds > 0', () => {
      render(<ChipBanner type="pause" timeInSeconds={10} />)

      const ring = getRing()
      expect(ring).toBeInTheDocument()
      expect(ring).toHaveStyle({
        animationDuration: '10s',
        animationPlayState: 'running',
      })
      expect(getRingSvg()).toHaveAttribute('aria-hidden', 'true')
      expect(getRingSvg()).toHaveStyle({ visibility: 'visible' })
    })

    it('does not render the ring without a positive timeInSeconds', () => {
      const { rerender } = render(<ChipBanner type="pause" />)
      expect(getRing()).toBeNull()

      rerender(<ChipBanner type="pause" timeInSeconds={0} />)
      expect(getRing()).toBeNull()
    })

    it('keeps the ring mounted but hidden and paused in the play state', () => {
      render(<ChipBanner type="play" timeInSeconds={10} />)

      expect(getRing()).toBeInTheDocument()
      expect(getRing()).toHaveStyle({ animationPlayState: 'paused' })
      // In the "Reproduzir" state the ring must not be visible.
      expect(getRingSvg()).toHaveStyle({ visibility: 'hidden' })
    })

    it('freezes/hides and resumes the same ring instance across pause/resume', () => {
      render(<ChipBanner type="pause" timeInSeconds={10} />)
      const button = screen.getByRole('button')

      const ringWhilePlaying = getRing()
      expect(ringWhilePlaying).toHaveStyle({ animationPlayState: 'running' })
      expect(getRingSvg()).toHaveStyle({ visibility: 'visible' })

      // Pause: the ring freezes in place (same element, just paused) and is
      // hidden, so it can continue from where it stopped when resumed.
      fireEvent.click(button)
      const ringWhilePaused = getRing()
      expect(ringWhilePaused).toBe(ringWhilePlaying)
      expect(ringWhilePaused).toHaveStyle({ animationPlayState: 'paused' })
      expect(getRingSvg()).toHaveStyle({ visibility: 'hidden' })

      // Resume: still the same instance, visible and running again from its
      // frozen position.
      fireEvent.click(button)
      const ringResumed = getRing()
      expect(ringResumed).toBe(ringWhilePlaying)
      expect(ringResumed).toHaveStyle({ animationPlayState: 'running' })
      expect(getRingSvg()).toHaveStyle({ visibility: 'visible' })
    })

    it('resets the ring to a fresh instance and calls onComplete when a non-looping ring ends', () => {
      const onComplete = vi.fn()
      render(
        <ChipBanner type="pause" timeInSeconds={5} onComplete={onComplete} />,
      )

      const ring = getRing()
      expect(ring).toHaveStyle({ animationIterationCount: '1' })

      fireEvent.animationEnd(ring as SVGCircleElement)

      expect(onComplete).toHaveBeenCalledTimes(1)
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-pressed',
        'false',
      )
      expect(screen.getByText('Reproduzir')).toBeInTheDocument()

      // A finished run is reset to a new (paused) instance, so replay starts
      // over — and it is hidden while in the "Reproduzir" state.
      const ringAfter = getRing()
      expect(ringAfter).not.toBeNull()
      expect(ringAfter).not.toBe(ring)
      expect(ringAfter).toHaveStyle({ animationPlayState: 'paused' })
      expect(getRingSvg()).toHaveStyle({ visibility: 'hidden' })
    })

    it('keeps playing and does not call onComplete when loop is true', () => {
      const onComplete = vi.fn()
      render(
        <ChipBanner
          type="pause"
          timeInSeconds={5}
          loop
          onComplete={onComplete}
        />,
      )

      const ring = getRing()
      expect(ring).toHaveStyle({ animationIterationCount: 'infinite' })

      // A looping ring never emits animationEnd, but guard the behavior anyway.
      fireEvent.animationEnd(ring as SVGCircleElement)

      expect(onComplete).not.toHaveBeenCalled()
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-pressed',
        'true',
      )
      expect(screen.getByText('Pausar')).toBeInTheDocument()
    })
  })
})
