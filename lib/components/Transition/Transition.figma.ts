// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=18137-13210
// source=lib/components/Transition/index.tsx
// component=Transition
import figma from 'figma'

// Progress (Begin | Mid | End) are animation frames and Size is responsive —
// the code component animates the message sequence on its own; no Figma
// property maps to a prop.

export default {
  example: figma.code`<Transition
  messages={['Analisando seus dados...', 'Buscando as melhores ofertas...']}
  onFinish={() => {}}
/>`,
  imports: ["import { Transition } from '@consumidor-positivo/aurora'"],
  id: 'transition',
  metadata: { nestable: false },
}
