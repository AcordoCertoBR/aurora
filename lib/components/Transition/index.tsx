import classNames from 'classnames'
import { Text } from '@components/Text'
import { useTransition } from './hooks'
import './styles.scss'

export type TransitionAlign = 'left' | 'center'

export type TransitionProps = {
  /** Ordered loading messages — one per instance (design shows 3). */
  messages: string[]
  /** Time each message is shown, in milliseconds. */
  messageDuration?: number
  /** Horizontal alignment of the messages and progress bar. */
  align?: TransitionAlign
  /**
   * Optional async gate. While `true`, holds on the penultimate message;
   * when it flips to `false`, advances to the final message and finishes.
   * Omit it to run straight through all messages.
   */
  isLoading?: boolean
  /** Called once the last message has been shown. */
  onFinish?: () => void
  className?: string
}

export const Transition = ({
  messages,
  messageDuration = 2000,
  align = 'left',
  isLoading,
  onFinish,
  className,
}: TransitionProps) => {
  const { currentStep, progress } = useTransition({
    totalMessages: messages.length,
    messageDuration,
    isLoading,
    onFinish,
  })

  const currentMessage = messages[currentStep] ?? ''
  const previousMessage = currentStep > 0 ? messages[currentStep - 1] : null

  return (
    <div
      className={classNames(
        'au-transition',
        `au-transition--align-${align}`,
        className,
      )}>
      <div className="au-transition__messages">
        <Text
          as="p"
          variant="heading-medium"
          weight="semibold"
          aria-hidden="true"
          className={classNames(
            'au-transition__message',
            'au-transition__message--previous',
            { 'au-transition__message--hidden': !previousMessage },
          )}>
          {previousMessage || ' '}
        </Text>

        <Text
          key={currentStep}
          as="p"
          variant="heading-medium"
          weight="semibold"
          aria-live="polite"
          className="au-transition__message au-transition__message--current">
          {currentMessage}
        </Text>
      </div>

      <div
        className="au-transition__bar"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={currentMessage}>
        <div
          className="au-transition__bar-filled"
          style={{
            width: `${progress}%`,
            transitionDuration: `${messageDuration}ms`,
          }}
        />
      </div>
    </div>
  )
}
