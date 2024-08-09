import { Text } from '../Text'
import classNames from 'classnames'
import { FooterProps } from './types'
import { certificatesMap, socialsMap } from './data'
import './styles.scss'

export const Footer = ({
  logo,
  categoryLinks,
  socialLinks,
  address,
  certificates,
  notes,
  copyrights,
}: FooterProps) => {
  const usedCertificates = certificates.map(
    (certificate) => certificatesMap[certificate],
  )

  const usedSocials = Object.keys(socialLinks).map((social) => {
    return {
      ...socialsMap[social as keyof typeof socialsMap],
      url: socialLinks[social as keyof typeof socialLinks],
    }
  })

  const handleClick = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <footer className="au-footer">
      <section className="au-footer__logo">{logo}</section>
      <section className="au-footer__links">
        {categoryLinks.map(({ categoryTitle, links }, index) => {
          return (
            <div key={index} className="au-footer__links__category">
              <Text as="h2" variant="heading-micro" weight="bold">
                {categoryTitle}
              </Text>
              {links.map(({ title, url }, index) => {
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
                      {title}
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
