import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

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
