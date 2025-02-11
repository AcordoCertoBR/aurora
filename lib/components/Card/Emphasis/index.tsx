import { Text } from '@components/Text'
import { CSSProperties } from 'react'

export type CardEmphasisProps = {
  content: { title: string; description?: string }[]
  height?: number
  maxHeight?: number
}
export const CardEmphasis = ({
  content,
  height,
  maxHeight,
}: CardEmphasisProps) => {
  const emphasisSize: CSSProperties = {
    height: `${height}px`,
    maxHeight: `${maxHeight}px`,
  }

  return (
    <div style={emphasisSize} className="au-card__emphasis">
      {content?.map((item, index) => {
        return (
          <div key={`au-card-emphasis-${item.title}-${index}`} className="au-card__emphasis-container">
            <Text variant="body-small" color="secondary">
              {item.title}
            </Text>
            <Text variant="body-small" weight="semibold">
              {item.description}
            </Text>
          </div>
        )
      })}
    </div>
  )
}
