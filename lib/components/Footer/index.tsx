import { Text } from '../Text'
import { FooterProps } from './types'
import { certificatesMap, socialsMap, storesMap } from './data'
import { Conditional } from '../misc'
import classNames from 'classnames'
import './styles.scss'

export const Footer = ({
  logo,
  categoryLinks,
  socialLinks,
  address,
  certificates,
  copyrights,
  stores = {},
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

  const usedStores = Object.keys(stores).map((store) => {
    return {
      ...storesMap[store as keyof typeof storesMap],
      url: stores[store as keyof typeof stores],
    }
  })

  const handleClick = (url: string) => {
    window.open(url, '_blank')
  }
  if (categoryLinks) {
    return (
      <footer role="contentinfo" className="au-footer-full">
        <div className="au-footer-full__logo">{logo}</div>
        <div className="au-footer-full__links">
          {categoryLinks.map(({ categoryTitle, links }, index) => {
            return (
              <div key={index} className="au-footer-full__links-category">
                <Text as="h2" variant="heading-micro" weight="bold">
                  {categoryTitle}
                </Text>
                {links.map(({ title, url }, index) => {
                  return (
                    <div
                      className={classNames('au-footer-full__links', {
                        'is-clickable': !!url,
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
          <div className="au-footer-full__links-category">
            <Text as="h2" variant="heading-micro" weight="bold">
              Siga a gente
            </Text>
            <div className="au-footer-full__links-socials">
              {usedSocials.map(({ icon, url }, index) => {
                return (
                  <div
                    className={classNames('au-footer-full__links', {
                      'is-clickable': !!url,
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
        </div>
        <div className="au-footer-full__bottom">
          <div className="au-footer-full__bottom-certificates">
            {usedCertificates.map(({ logo, name }, index) => {
              return <img key={index} src={logo} alt={name} />
            })}
          </div>
          <div className="au-footer-full__bottom-side">
            <Conditional
              condition={!!usedStores.length}
              renderIf={
                <div className="au-footer-full__stores">
                  {usedStores.map(({ icon, url, name }, index) => {
                    return (
                      <img
                        className={classNames('au-footer-full__stores-logo', {
                          'is-clickable': !!url,
                        })}
                        key={index}
                        src={icon}
                        alt={name}
                        onClick={() => url && handleClick(url)}
                      />
                    )
                  })}
                </div>
              }
            />
            <Text
              as="h2"
              variant="body-medium"
              weight="regular"
              color="secondary"
              className="au-footer-full__copyrights"
              dangerouslySetInnerHTML={copyrights}
            />
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer role="contentinfo" className="au-footer">
      <div className="au-footer__top">
        <div className="au-footer__top-logos">
          {logo}
          <div className="au-footer__top-divider" />
          <div className="au-footer__top-certificates">
            {usedCertificates.map(({ logo, name }, index) => {
              return <img key={index} src={logo} alt={name} />
            })}
          </div>
        </div>
        <div className="au-footer__top-social">
          <Text as="h2" variant="heading-micro" weight="bold">
            Siga a gente
          </Text>
          <div className="au-footer__top-social-links">
            {usedSocials.map(({ icon, url }, index) => {
              return (
                <div key={index} onClick={() => url && handleClick(url)}>
                  {icon}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="au-footer__content">
        <div className="au-footer__content-certificates">
          {usedCertificates.map(({ logo, name }, index) => {
            return <img key={index} src={logo} alt={name} />
          })}
        </div>
        <div className="au-footer__content-social">
          <Text as="h2" variant="heading-micro" weight="bold">
            Siga a gente
          </Text>
          <div className="au-footer__content-social-links">
            {usedSocials.map(({ icon, url }, index) => {
              return (
                <div key={index} onClick={() => url && handleClick(url)}>
                  {icon}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="au-footer__bottom">
        <Text as="h2" variant="body-medium" weight="regular" color="secondary">
          {copyrights}
        </Text>
      </div>
    </footer>
  )
}
