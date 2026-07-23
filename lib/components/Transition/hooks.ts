import { useEffect, useRef, useState } from 'react'

type UseTransitionProps = {
  totalMessages: number
  messageDuration: number
  isLoading?: boolean
  onFinish?: () => void
}

export const useTransition = ({
  totalMessages,
  messageDuration,
  isLoading,
  onFinish,
}: UseTransitionProps) => {
  const [currentStep, setCurrentStep] = useState(0)
  // Paints the bar at 0 on the first frame so the fill animates from the
  // start — CSS transitions don't run on the initial mount width.
  const [mounted, setMounted] = useState(false)
  const hasFinished = useRef(false)
  const onFinishRef = useRef(onFinish)

  useEffect(() => {
    onFinishRef.current = onFinish
  }, [onFinish])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Restart the sequence when the flow is reconfigured.
  useEffect(() => {
    setCurrentStep(0)
    hasFinished.current = false
  }, [totalMessages, messageDuration])

  const isLast = currentStep >= totalMessages - 1
  // When gated by `isLoading`, hold on the penultimate message until the real
  // work resolves — the final message reads as a terminal success state.
  const holdIndex = Math.max(0, totalMessages - 2)
  const shouldHold = isLoading === true && currentStep >= holdIndex

  useEffect(() => {
    if (isLast || shouldHold) return

    const timer = setTimeout(() => {
      setCurrentStep((step) => Math.min(step + 1, totalMessages - 1))
    }, messageDuration)

    return () => clearTimeout(timer)
  }, [currentStep, shouldHold, isLast, messageDuration, totalMessages])

  useEffect(() => {
    if (!isLast || hasFinished.current) return
    hasFinished.current = true

    const timer = setTimeout(() => {
      onFinishRef.current?.()
    }, messageDuration)

    return () => clearTimeout(timer)
  }, [isLast, messageDuration])

  const progress =
    mounted && totalMessages > 0 ? ((currentStep + 1) / totalMessages) * 100 : 0

  return { currentStep, progress }
}
