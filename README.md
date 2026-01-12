![aurora-capa](https://github.com/user-attachments/assets/87cc0477-e345-4b98-b17e-90e941744eab)

# Aurora ✨

> A aurora boreal é um fenômeno luminoso que se desenvolve na termosfera (ou ionosfera), uma das camadas superiores da atmosfera do planeta Terra, que se estende de uma altura mínima de 60 km a partir da superfície até 1000 km. Essa camada está situada entre a exosfera e a mesosfera.

O Projeto Aurora é uma abordagem estruturada e abrangente para o Design System dos projetos Consumidor Positivo e Acordo Certo, criado com o objetivo de padronizar e otimizar a experiência do usuário em ambas as plataformas. Este sistema de design consiste em uma biblioteca de componentes reutilizáveis, diretrizes de estilo, padrões de interação e documentação detalhada para garantir consistência e eficiência no desenvolvimento e design de interfaces.

<p align="center">
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#sites">Sites</a>
</p>

### Tech Stack

- <img width="20" height="20" src="https://github.com/AcordoCertoBR/mono-debtor-hub-ui/assets/397832/2edb6c43-89a3-4c08-b126-96771d488e9b" /> [Reactjs](https://reactjs.org/) ( JS lib )
- <img width="20" height="20" src="https://github.com/AcordoCertoBR/mono-debtor-hub-ui/assets/397832/116d0ad2-55a8-4bd6-a8b8-4fbdb3aab82b" /> [Typescript](https://www.typescriptlang.org/) ( Types )
- <img width="20" height="20" src="https://github.com/AcordoCertoBR/mono-debtor-hub-ui/assets/397832/862d66f3-703d-42f1-8e70-3e6ab5c6d318" /> [Vitejs](https://reactjs.org/) ( Tooling )
- <img width="20" height="20" src="https://github.com/AcordoCertoBR/mono-debtor-hub-ui/assets/397832/4a977365-7a05-4131-8b11-6589acbf0831" /> [Sass](<https://emotion.sh/docs/introduction](https://sass-lang.com/)>) ( CSS )
- <img width="20" height="20" src="https://github.com/AcordoCertoBR/mono-debtor-hub-ui/assets/397832/96405885-c5c0-4e26-a645-0e84b7d12ef3" /> [Storybook](https://storybook.js.org/) ( UI )

### Sites

> Consumidor Positivo

- [https://www.consumidorpositivo.com.br/](https://www.consumidorpositivo.com.br/)

> Acordo Certo

- [https://www.acordocerto.com.br/](https://www.acordocerto.com.br/)

## Instalação e Uso

### Instalação Básica

```bash
npm install @consumidor-positivo/aurora
```

### Componentes Opcionais

Alguns componentes requerem dependências adicionais que não são instaladas por padrão para evitar aumentar o bundle desnecessariamente.

#### Carousel

O componente Carousel requer a instalação do `react-snap-carousel`:

```bash
npm install react-snap-carousel
```

```tsx
import { Carousel } from '@consumidor-positivo/aurora'

// Agora você pode usar o Carousel
<Carousel items={items} />
```

> **Nota:** Se você tentar usar o Carousel sem instalar o `react-snap-carousel`, receberá um erro de dependência em tempo de execução.

## Testes

Este projeto usa Vitest para testes unitáriåos e @testing-library/react para testes de componentes React.

execute os testes com:

```bash
npm test
```

Para rodar em modo watch:

```bash
npm run test:watch
```
