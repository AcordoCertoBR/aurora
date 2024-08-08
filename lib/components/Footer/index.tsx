import { ReactNode } from 'react'
import './styles.scss'
import { Text } from '../Text'
import fintech2022Logo from '../../assets/certifications/fintech-2022.svg'
import fintech2023Logo from '../../assets/certifications/fintech-2023.svg'
import pcidssLogo from '../../assets/certifications/pci-dss.svg'
import quintessaLogo from '../../assets/certifications/quintessa.svg'
import ra1000Logo from '../../assets/certifications/ra1000.svg'
import reclameaquiLogo from '../../assets/certifications/reclame-aqui.svg'
import scaleupLogo from '../../assets/certifications/scale-up.svg'
import sslblindadoLogo from '../../assets/certifications/ssl-blindado.svg'

import {
  IconInstagram,
  IconFacebook,
  IconYoutube,
  IconLinkedin,
} from '../icons'
import classNames from 'classnames'

const socialsMap = {
  instagram: {
    name: 'Instagram',
    icon: <IconInstagram />,
  },
  facebook: {
    name: 'Facebook',
    icon: <IconFacebook />,
  },
  youtube: {
    name: 'Youtube',
    icon: <IconYoutube />,
  },
  linkedin: {
    name: 'Linkedin',
    icon: <IconLinkedin />,
  },
}

const certificatesMap = {
  fintech2022: {
    logo: fintech2022Logo,
    name: 'Melhores Fintechs 2022',
  },
  fintech2023: {
    logo: fintech2023Logo,
    name: 'Melhores Fintechs 2023',
  },
  pcidss: {
    logo: pcidssLogo,
    name: 'PCI DSS Compliant',
  },
  quintessa: {
    logo: quintessaLogo,
    name: 'Quintessa',
  },
  ra1000: {
    logo: ra1000Logo,
    name: 'RA 1000',
  },
  reclameaqui: {
    logo: reclameaquiLogo,
    name: 'Ótimo Reclame Aqui',
  },
  scaleup: {
    logo: scaleupLogo,
    name: 'Scale Up',
  },
  sslblindado: {
    logo: sslblindadoLogo,
    name: 'SSL Blindado',
  },
}

type FooterProps = {
  logo: ReactNode | string | JSX.Element | JSX.Element[]
  links: Array<{
    category: string
    items: Array<{ name: string; url?: string }>
  }>
  socials: {
    instagram?: string
    facebook?: string
    youtube?: string
    linkedin?: string
  }
  address: string
  certificates: Array<keyof typeof certificatesMap>
  notes: ReactNode | string | JSX.Element | JSX.Element[]
  copyrights: ReactNode | string | JSX.Element | JSX.Element[]
}

export const Footer = ({
  logo,
  links,
  socials,
  address,
  certificates,
  notes,
  copyrights,
}: FooterProps) => {
  const usedCertificates = certificates.map(
    (certificate) => certificatesMap[certificate],
  )

  const usedSocials = Object.keys(socials).map((social) => {
    return {
      ...socialsMap[social as keyof typeof socialsMap],
      url: socials[social as keyof typeof socials],
    }
  })

  const handleClick = (url: string) => {
    window.open(url, '_blank')
  }

  console.log(usedSocials)

  return (
    <footer className="au-footer">
      <section className="au-footer__logo">{logo}</section>
      <section className="au-footer__links">
        {links.map(({ category, items }, index) => {
          return (
            <div key={index} className="au-footer__links__category">
              <Text as="h2" variant="heading-micro" weight="bold">
                {category}
              </Text>
              {items.map(({ name, url }, index) => {
                return (
                  <div
                    className={classNames('au-footer__links', {
                      clickable: !!url,
                    })}
                    key={index}
                    onClick={() => url && handleClick(url)}>
                    <Text
                      as="a"
                      variant="body-medium"
                      weight="regular"
                      color="secondary">
                      {name}
                    </Text>
                  </div>
                )
              })}
            </div>
          )
        })}
        <div className="au-footer__links__category">
          <Text as="h2" variant="heading-micro" weight="bold">
            Siga a gente
          </Text>
          <div className="au-footer__links__socials">
            {usedSocials.map(({ icon, url }, index) => {
              return (
                <div
                  className={classNames('au-footer__links', {
                    clickable: !!url,
                  })}
                  key={index}
                  onClick={() => url && handleClick(url)}>
                  {icon}
                </div>
              )
            })}
          </div>
          <Text
            as="h2"
            variant="body-medium"
            weight="regular"
            color="secondary">
            {address}
          </Text>
        </div>
      </section>
      <section className="au-footer__certifications">
        <div className="au-footer__certifications__certificates">
          {usedCertificates.map(({ logo, name }, index) => {
            return <img key={index} src={logo} alt={name} />
          })}
        </div>
        <div className="au-footer__certifications__notes">
          <Text
            as="h2"
            variant="body-medium"
            weight="regular"
            color="secondary">
            {notes}
          </Text>
        </div>
      </section>
      <section className="au-footer__copyrights">
        <Text as="h2" variant="body-medium" weight="regular" color="secondary">
          {copyrights}
        </Text>
      </section>
    </footer>
  )
}
