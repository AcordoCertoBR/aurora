import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

/**
 * A helper component designed to address z-index conflicts within modals and dialogs.
 * This component ensures that the element remains fixed in its position, unaffected by other elements
 * possessing higher z-index values further up the DOM tree.
 */

type PortalProps = {
  /** The children to be rendered into the `Portal`. */
  children: React.ReactNode
  /** The id of the DOM node into which the `Portal` will render. */
  portalId?: string
}

export const Portal = ({ children, portalId = 'au-portal' }: PortalProps) => {
  const portalDoor = useRef(document.createElement('div'))

  useEffect(() => {
    let portalRoot = document.getElementById(portalId)
    if (!portalRoot) {
      portalRoot = document.createElement('div')
      portalRoot.setAttribute('id', portalId)
      document.body.appendChild(portalRoot)
    }

    portalRoot.appendChild(portalDoor.current)

    return () => {
      if (portalRoot) {
        portalRoot.removeChild(portalDoor.current)
      }
    }
  }, [portalId])

  return ReactDOM.createPortal(children, portalDoor.current)
}
