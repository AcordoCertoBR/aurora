export default function astroIconContent(name: string, content: string) {
  return `---
// This file is generated automatically
// To edit see the files in scripts/generate-icons
import Icon from '../../Icon/index.astro'
import type { Props as IconProps } from '../../Icon/index.astro'

export type Props = Omit<IconProps, 'markup'>
---

<Icon markup={${content}} name="${name}" {...Astro.props} />
`
}
