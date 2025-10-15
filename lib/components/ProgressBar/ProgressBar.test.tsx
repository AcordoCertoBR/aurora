import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { ProgressBar } from './index'

describe('ProgressBar', () => {
  it('renders progress bar in percentage mode', () => {
    render(
      <ProgressBar
        percentageMode
        stepName="Step 1"
        currentStep={3}
        totalSteps={5}
      />,
    )

    expect(screen.getByText('60%')).toBeInTheDocument()
  })

  it('renders progress bar in steps mode', () => {
    const { container } = render(
      <ProgressBar
        stepName="Step 1"
        currentStep={2}
        totalSteps={4}
      />,
    )

    expect(screen.getByText('2 de 4')).toBeInTheDocument()
    const steps = container.querySelectorAll('.au-progress-bar__step-filled')
    expect(steps).toHaveLength(4)
  })

  it('does not exceed progress limits', () => {
    const { rerender } = render(
      <ProgressBar
        stepName="Step 1"
        currentStep={-1}
        totalSteps={4}
      />,
    )

    expect(screen.getByText('1 de 4')).toBeInTheDocument()

    rerender(
      <ProgressBar
        stepName="Step 1"
        currentStep={10}
        totalSteps={4}
      />,
    )

    expect(screen.getByText('4 de 4')).toBeInTheDocument()
  })

  it('displays step name and progress text', () => {
    render(
      <ProgressBar
        stepName="Custom Step"
        currentStep={1}
        totalSteps={3}
      />,
    )

    expect(screen.getByText('Custom Step')).toBeInTheDocument()
    expect(screen.getByText('1 de 3')).toBeInTheDocument()
  })
})