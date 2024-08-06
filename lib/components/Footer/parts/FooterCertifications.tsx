import React, { ReactNode } from 'react'
import fintech2022Logo from '../../../assets/certifications/fintech-2022.svg'
import fintech2023Logo from '../../../assets/certifications/fintech-2023.svg'
import pcidssLogo from '../../../assets/certifications/pci-dss.svg'
import quintessaLogo from '../../../assets/certifications/quintessa.svg'
import ra1000Logo from '../../../assets/certifications/ra1000.svg'
import reclameaquiLogo from '../../../assets/certifications/reclame-aqui.svg'
import scaleupLogo from '../../../assets/certifications/scale-up.svg'
import sslblindadoLogo from '../../../assets/certifications/ssl-blindado.svg'
import { Conditional } from '../../misc/Conditional'

export type FooterCertificationsProps = {
  children: ReactNode | string | JSX.Element | JSX.Element[]
  fintech2022?: boolean
  fintech2023?: boolean
  pcidss?: boolean
  quintessa?: boolean
  ra1000?: boolean
  reclameaqui?: boolean
  scaleup?: boolean
  sslblindado?: boolean
}

export const FooterCertifications = ({
  children,
  fintech2022 = false,
  fintech2023 = false,
  pcidss = false,
  quintessa = false,
  ra1000 = false,
  reclameaqui = false,
  scaleup = false,
  sslblindado = false,
}: FooterCertificationsProps) => {
  const certificates = [
    {
      active: fintech2022,
      logo: fintech2022Logo,
      name: 'Fintech 2022',
    },
    {
      active: fintech2023,
      logo: fintech2023Logo,
      name: 'Fintech 2023',
    },
    {
      active: pcidss,
      logo: pcidssLogo,
      name: 'PCI DSS',
    },
    {
      active: quintessa,
      logo: quintessaLogo,
      name: 'Quintessa',
    },
    {
      active: ra1000,
      logo: ra1000Logo,
      name: 'RA1000',
    },
    {
      active: reclameaqui,
      logo: reclameaquiLogo,
      name: 'ReclameAqui',
    },
    {
      active: scaleup,
      logo: scaleupLogo,
      name: 'ScaleUp',
    },
    {
      active: sslblindado,
      logo: sslblindadoLogo,
      name: 'SSL Blindado',
    },
  ]

  return (
    <div className="au-footer__certifications">
      <div className="au-footer__certifications__certificates">
        {certificates.map(({ active, logo, name }) => {
          return (
            <Conditional
              key={name}
              condition={active}
              renderIf={<img src={logo} alt={name} />}
            />
          )
        })}
      </div>
      <div className="au-footer__certifications__info">{children}</div>
    </div>
  )
}
