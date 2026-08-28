// url=https://www.figma.com/design/mJ6TJpnbZZYLiGXYnpg84b/Aurora-DS?node-id=18239-24789
// source=lib/components/PartnerBanner/index.tsx
// component=PartnerBanner
import figma from 'figma'
const instance = figma.selectedInstance

const text = instance.getString('Label')

export default {
  example: figma.code`<PartnerBanner text="${text}" btnText="Ver oferta" onButtonClick={() => {}} />`,
  imports: ["import { PartnerBanner } from '@consumidor-positivo/aurora'"],
  id: 'partner-banner',
  metadata: { nestable: true },
}
