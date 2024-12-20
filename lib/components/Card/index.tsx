import { CardContainer, CardContainerProps } from './Container'
import { CardEmphasis, CardEmphasisProps } from './Emphasis'
import { CardImage, CardImageProps } from './Image'
import { CardRoot, CardRootProps } from './Root'
import { CardTag, CardTagProps } from './Tag'

type Components = {
  Root: React.FC<CardRootProps>
  Container: React.FC<CardContainerProps>
  Emphasis: React.FC<CardEmphasisProps>
  Image: React.FC<CardImageProps>
  Tag: React.FC<CardTagProps>
}

const components: Components = {
  Root: CardRoot,
  Container: CardContainer,
  Emphasis: CardEmphasis,
  Image: CardImage,
  Tag: CardTag,
}

Object.keys(components).forEach((key) => {
  const component = components[key as keyof Components]
  component.displayName = `Card.${key}`
})

export { components as Card }
