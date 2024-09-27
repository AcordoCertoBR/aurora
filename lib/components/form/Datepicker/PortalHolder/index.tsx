import { above } from '@core/utils/screen'
import { BREAKPOINT_MD } from '@core/tokens'
import { Portal } from '@components/misc/Portal'

type PortalHolderProps = {
  withPortal?: boolean
  children: React.ReactNode
}

export const PortalHolder = ({ withPortal, children }: PortalHolderProps) => {
  const shouldUsePortal = !above(BREAKPOINT_MD) && withPortal

  if (shouldUsePortal) return <Portal>{children}</Portal>

  return <>{children}</>
}
