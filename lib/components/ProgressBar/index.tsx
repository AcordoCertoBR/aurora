import { Conditional } from '@components/misc'
import classNames from 'classnames'
import { Text } from '../Text'

import './styles.scss'

interface ProgressBarProps {
  percentageMode?: boolean
  stepName: string
  currentStep: number
  totalSteps: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percentageMode = false,
  stepName,
  currentStep,
  totalSteps,
}) => {
  const safeCurrentStep = Math.max(1, Math.min(currentStep, totalSteps))
  const percentageWidth = (safeCurrentStep / totalSteps) * 100
  const roundedPercentage = Math.round(percentageWidth)

  const progressText = percentageMode
    ? `${roundedPercentage}%`
    : `${safeCurrentStep} de ${totalSteps}`

  return (
    <div
      className="au-progress-bar"
      role="progressbar"
      aria-valuenow={percentageMode ? roundedPercentage : safeCurrentStep}
      aria-valuemin={percentageMode ? 0 : 1}
      aria-valuemax={percentageMode ? 100 : totalSteps}
      aria-label={stepName}>
      <Conditional
        condition={!!percentageMode}
        renderIf={
          <div className="au-progress-bar__bar">
            <div
              style={{ width: `${percentageWidth}%` }}
              className="au-progress-bar__bar-filled"
            />
          </div>
        }
        renderElse={
          <div className="au-progress-bar__steps">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div key={index} className="au-progress-bar__step-container">
                <div
                  className={classNames('au-progress-bar__step-filled', {
                    'au-progress-bar__step-filled--is-active':
                      index < safeCurrentStep,
                  })}
                />
              </div>
            ))}
          </div>
        }
      />

      <div className="au-progress-bar__text">
        <Text as="span" variant="body-medium">
          {stepName}
        </Text>

        <Text as="span" variant="body-medium">
          {progressText}
        </Text>
      </div>
    </div>
  )
}
