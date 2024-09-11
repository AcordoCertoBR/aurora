import { create } from '@storybook/theming';
 
export default create({
  base: 'dark',
  fontBase: '"Source Sans 3", sans-serif',
  brandTitle: 'Aurora - Consumidor Positivo',
  brandUrl: 'https://www.consumidorpositivo.com.br',
  brandImage: 'https://assets.consumidorpositivo.com.br/f/114280/571x112/e6b00ad1f4/aurora-logo-white.png',
  brandTarget: '_self',

  colorPrimary: '#1737A4',
  colorSecondary: '#0048DB',

  // UI
  appBg: '#16181D',
  appContentBg: '#16181D',
  appPreviewBg: '#16181D',
  appBorderColor: '#454A54',
  appBorderRadius: 4,


  // Text colors
  textColor: '#ffffff',
  textInverseColor: '#16181D',
 
  // Toolbar default and active colors
  barTextColor: '#ffffff',
  barSelectedColor: '#454A54',
  barHoverColor: '#454A54',
  barBg: '#16181D',
});