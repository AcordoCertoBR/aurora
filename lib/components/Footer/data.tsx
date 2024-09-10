import fintech2022Logo from '../../assets/certifications/fintech-2022.png'
import fintech2023Logo from '../../assets/certifications/fintech-2023.png'
import pcidssLogo from '../../assets/certifications/pci-dss.png'
import quintessaLogo from '../../assets/certifications/quintessa.png'
import ra1000Logo from '../../assets/certifications/ra1000.png'
import reclameaquiLogo from '../../assets/certifications/reclame-aqui.png'
import scaleupLogo from '../../assets/certifications/scale-up.png'
import sslblindadoLogo from '../../assets/certifications/ssl-blindado.png'
import appStoreLogo from '../../assets/stores/app-store.png'
import googlePlayLogo from '../../assets/stores/google-play.png'

import {
  IconInstagram,
  IconFacebook,
  IconYoutube,
  IconLinkedin,
  IconTiktok,
} from '../icons'

export const certificatesMap = {
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
export const socialsMap = {
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
  tiktok: {
    name: 'TikTok',
    icon: <IconTiktok />,
  },
}

export const storesMap = {
  googleplay: {
    name: 'Google Play',
    icon: googlePlayLogo,
  },
  appstore: {
    name: 'App Store',
    icon: appStoreLogo,
  },
}
