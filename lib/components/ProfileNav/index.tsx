import { getInitialLetters } from '../../core/utils/getInitialLetters'
import { Text } from '../Text'
import './styles.scss'

type ProfileNavProps = {
  name: string
  fullName: string
}

export const ProfileNav = ({ name, fullName }: ProfileNavProps) => {
  const initialLetters = getInitialLetters(fullName)

  return (
    <div className="au-profile-nav">
      <div className="au-profile-nav__badget">
        <Text variant="heading-small" weight="medium">
          {initialLetters}
        </Text>
      </div>
      <div className="div">
        <Text as="h3" variant="heading-micro" weight="bold">
          Olá, {name}
        </Text>
        <Text>Tudo bem?</Text>
      </div>
    </div>
  )
}
