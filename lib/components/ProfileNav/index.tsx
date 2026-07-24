import { getInitialLetters } from '@core/utils/getInitialLetters'
import { Text } from '../Text'
import './styles.scss'

type ProfileNavProps = {
  name: string
  fullName: string
  'data-testid'?: string
}

export const ProfileNav = ({
  name,
  fullName,
  'data-testid': dataTestId,
}: ProfileNavProps) => {
  const initialLetters = getInitialLetters(fullName)

  return (
    <div className="au-profile-nav" data-testid={dataTestId}>
      <div className="au-profile-nav__badget">
        <Text variant="heading-small" weight="medium">
          {initialLetters}
        </Text>
      </div>
      <div className="div">
        <Text as="h3" variant="heading-micro" weight="bold">
          Olá, {name}
        </Text>
        <Text color="secondary">Tudo bem?</Text>
      </div>
    </div>
  )
}
