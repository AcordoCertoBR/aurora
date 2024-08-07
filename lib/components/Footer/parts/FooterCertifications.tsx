import { ReactNode } from 'react'
import fintech2022Logo from '../../../assets/certifications/fintech-2022.svg'
import fintech2023Logo from '../../../assets/certifications/fintech-2023.svg'
import pcidssLogo from '../../../assets/certifications/pci-dss.svg'
import quintessaLogo from '../../../assets/certifications/quintessa.svg'
import ra1000Logo from '../../../assets/certifications/ra1000.svg'
import reclameaquiLogo from '../../../assets/certifications/reclame-aqui.svg'
import scaleupLogo from '../../../assets/certifications/scale-up.svg'
import sslblindadoLogo from '../../../assets/certifications/ssl-blindado.svg'

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

export type FooterCertificationsProps = {
  children: ReactNode | string | JSX.Element | JSX.Element[]
  certificates: Array<keyof typeof certificatesMap>
}

export const FooterCertifications = ({
  children,
  certificates,
}: FooterCertificationsProps) => {
  const usedCertificates = certificates.map(
    (certificate) => certificatesMap[certificate],
  )

  return (
    <div className="au-footer__certifications">
      <div className="au-footer__certifications__certificates">
        {usedCertificates.map(({ logo, name }, index) => {
          return <img key={index} src={logo} alt={name} />
        })}
      </div>
      <div className="au-footer__certifications__info">{children}</div>
    </div>
  )
}
