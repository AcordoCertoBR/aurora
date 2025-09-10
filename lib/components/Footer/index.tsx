import classNames from 'classnames'
import { Text } from '../Text'
import { FooterProps } from './types'
import { certificatesMap, socialsMap, storesMap } from './data'
import { Conditional } from '../misc'
import { LazyImage } from '../LazyImage'
import { isMobile } from '@core/utils/isMobile'
import './styles.scss'

export const Footer = ({
  logo,
  categoryLinks,
  socialLinks,
  cnpj,
  address,
  companyOverview,
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

  const showCertificatesBorder = usedCertificates.length > 3 && !!isMobile()
  
  if (categoryLinks) {
    return (
      <footer role="contentinfo" className="au-footer-full">
        <div className="au-footer-full__container">
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
                          'au-footer-full__links--is-clickable': !!url,
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
            <div className="au-footer-full__company-info">
              <Text as="h2" variant="heading-micro" weight="bold">
                Siga a gente
              </Text>
              <div className="au-footer-full__links-socials">
                {usedSocials.map(({ icon, url }, index) => {
                  return (
                    <div
                      className={classNames('au-footer-full__links', {
                        'au-footer-full__links--is-clickable': !!url,
                      })}
                      key={index}
                      onClick={() => url && handleClick(url)}>
                      {icon}
                    </div>
                  )
                })}
              </div>
              <Text
                as="div"
                variant="body-medium"
                weight="regular"
                color="secondary">
                <Text
                  as="strong"
                  weight="bold"
                  color="secondary">
                  CNPJ:
                </Text> {cnpj}
              </Text>
              <Text
                as="div"
                variant="body-medium"
                weight="regular"
                color="secondary">
                <Text
                  as="h2"
                  variant="body-medium"
                  weight="bold"
                  color="secondary">
                  Localização (sem atendimento ao público):
                </Text>
                {address}
              </Text>
            </div>
          </div>
          <Conditional
            condition={!!usedStores.length && Boolean(isMobile())}
            renderIf={
              <div className="au-footer-full__stores">
                <Text
                  className="au-footer-full__stores-title"
                  as="h2"
                  variant="heading-micro"
                  weight="bold">
                  Baixe nosso app
                </Text>
                {usedStores.map(({ icon, url, name }, index) => {
                  return (
                    <LazyImage
                      className={classNames('au-footer-full__stores-logo', {
                        'au-footer-full__stores-logo--is-clickable': !!url,
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
          {companyOverview && (
            <div className="au-footer-full__company-overview">
              <Text color="secondary">{companyOverview}</Text>
            </div>
          )}
          <div className="au-footer-full__bottom">
            <div className={classNames("au-footer-full__bottom-certificates", {
              'au-footer-full__bottom-certificates--with-border': showCertificatesBorder,
            })}>
              {usedCertificates.map(({ logo, name }, index) => {
                return <LazyImage key={index} src={logo} alt={name} />
              })}
            </div>
            <div className="au-footer-full__bottom-side">
              <Conditional
                condition={!!usedStores.length && !isMobile()}
                renderIf={
                  <div className="au-footer-full__stores">
                    <Text
                      className="au-footer-full__stores-title"
                      as="h2"
                      variant="heading-micro"
                      weight="bold">
                      Baixe nosso app
                    </Text>
                    {usedStores.map(({ icon, url, name }, index) => {
                      return (
                        <LazyImage
                          className={classNames('au-footer-full__stores-logo', {
                            'au-footer-full__stores-logo--is-clickable': !!url,
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
        </div>
      </footer>
    )
  }

  return (
    <footer role="contentinfo" className="au-footer">
      <div className="au-footer__container">
        <div className="au-footer__content">
          <div className="au-footer__content-logos">
            {logo}
            <div className="au-footer__content-divider" />
            <div className="au-footer__content-certificates">
              {usedCertificates.map(({ logo, name }, index) => {
                return <LazyImage key={index} src={logo} alt={name} />
              })}
            </div>
          </div>
          <div className="au-footer__content-copyrights">
            <Text
              as="h2"
              variant="body-medium"
              weight="regular"
              color="secondary">
              {copyrights}
            </Text>
          </div>
        </div>
      </div>
    </footer>
  )
}
