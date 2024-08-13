import { IconGallery, IconItem } from '@storybook/blocks'
import { useState } from 'react'

type IconsPresentationProps = {
  iconsMap: Record<string, React.FC>
}

function filterIcons(search: string, icons: [string, React.FC][]) {
  return icons.filter(([key]) =>
    key.toLowerCase().includes(search.toLowerCase()),
  )
}

export function IconsPresentation({ iconsMap }: IconsPresentationProps) {
  const iconsEntries = Object.entries(iconsMap)
  const [search, setSearch] = useState('')
  const showedIcons = search ? filterIcons(search, iconsEntries) : iconsEntries

  return (
    <div style={{ marginTop: '30px' }}>
      <input
        type="text"
        placeholder="Buscar"
        style={{ height: '30px', width: '250px', marginBottom: '30px' }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconGallery>
        {showedIcons.map(([key, Comp]) => (
          <IconItem key={key} name={key}>
            <Comp />
          </IconItem>
        ))}
      </IconGallery>
    </div>
  )
}
