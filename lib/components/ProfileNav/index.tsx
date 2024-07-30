import { Text } from '../Text'
import './styles.scss'

type ProfileNavProps = {
  name: string
}

export const ProfileNav = ({ name }: ProfileNavProps) => {
  return (
    <div className="au-profile-nav">
      <div className="au-profile-nav__badget">
        <Text variant="heading-small" weight="medium">
          FS
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
