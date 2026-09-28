![aurora-capa](https://github.com/user-attachments/assets/87cc0477-e345-4b98-b17e-90e941744eab)

# Aurora ✨

> A aurora boreal é um fenômeno luminoso que se desenvolve na termosfera (ou ionosfera), uma das camadas superiores da atmosfera do planeta Terra, que se estende de uma altura mínima de 60 km a partir da superfície até 1000 km. Essa camada está situada entre a exosfera e a mesosfera.

O Projeto Aurora é uma abordagem estruturada e abrangente para o Design System dos projetos Consumidor Positivo e Acordo Certo, criado com o objetivo de padronizar e otimizar a experiência do usuário em ambas as plataformas. Este sistema de design consiste em uma biblioteca de componentes reutilizáveis, diretrizes de estilo, padrões de interação e documentação detalhada para garantir consistência e eficiência no desenvolvimento e design de interfaces.

Cada componente visual é publicado em **dois formatos**: **React**, para as aplicações (área logada, formulários com estado), e **Astro**, para as páginas públicas estáticas, que assim não carregam React. Os dois usam a mesma marcação e o mesmo CSS. Veja [Dois formatos: React e Astro](#dois-formatos-react-e-astro).

<p align="center">
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#sites">Sites</a> •
  <a href="#dois-formatos-react-e-astro">React e Astro</a> •
  <a href="#desenvolvimento">Desenvolvimento</a>
</p>

### Tech Stack

- <img width="20" height="20" src="https://github.com/AcordoCertoBR/mono-debtor-hub-ui/assets/397832/2edb6c43-89a3-4c08-b126-96771d488e9b" /> [Reactjs](https://reactjs.org/) ( JS lib )
- <img width="20" height="20" src="https://astro.build/favicon.svg" /> [Astro](https://astro.build/) ( versão estática dos componentes )
- <img width="20" height="20" src="https://github.com/AcordoCertoBR/mono-debtor-hub-ui/assets/397832/116d0ad2-55a8-4bd6-a8b8-4fbdb3aab82b" /> [Typescript](https://www.typescriptlang.org/) ( Types )
- <img width="20" height="20" src="https://github.com/AcordoCertoBR/mono-debtor-hub-ui/assets/397832/862d66f3-703d-42f1-8e70-3e6ab5c6d318" /> [Vitejs](https://reactjs.org/) ( Tooling )
- <img width="20" height="20" src="https://github.com/AcordoCertoBR/mono-debtor-hub-ui/assets/397832/4a977365-7a05-4131-8b11-6589acbf0831" /> [Sass](<https://emotion.sh/docs/introduction](https://sass-lang.com/)>) ( CSS )
- <img width="20" height="20" src="https://github.com/AcordoCertoBR/mono-debtor-hub-ui/assets/397832/96405885-c5c0-4e26-a645-0e84b7d12ef3" /> [Storybook](https://storybook.js.org/) ( UI dos componentes React; os Astro têm um playground próprio )

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

## Dois formatos: React e Astro

O caminho do import decide qual versão você usa.

**React**, import nomeado do pacote:

```tsx
import { Button, Text } from '@consumidor-positivo/aurora'

<Button type="primary">Simular agora</Button>
```

**Astro**, import default pelo caminho completo do arquivo, com a extensão `.astro`:

```astro
---
import '@consumidor-positivo/aurora/global.css'
import Button from '@consumidor-positivo/aurora/astro/Button/index.astro'
import Text from '@consumidor-positivo/aurora/astro/Text/index.astro'
---

<Button type="primary">Simular agora</Button>
```

A versão Astro renderiza em build time, sem ilha e sem React no bundle, e tem as mesmas props visuais da React. Como o Astro não tem prop de função, os callbacks viram atributos e eventos: `data-au-modal-toggle` e `data-au-drawer-toggle` abrem Modal e Drawer, e os componentes emitem eventos `au:*` (`au:tabchange`, `au:modalopen`...). Uma página feita só com componentes Astro importa o reset uma vez, pelo `global.css`.

Todo componente visual tem as duas versões. Ficam só em React os utilitários (`Transition`, `IsMobile`, `misc/*`) e o `Prototype/Carousel`. A referência completa está em [docs/astro.md](docs/astro.md) e na página "Componentes Astro" do Storybook.

## Desenvolvimento

```bash
npm install
npm run prebuild          # gera tokens e ícones (obrigatório antes de rodar qualquer coisa)
npm run storybook         # componentes React, porta 6006
npm run playground:astro  # componentes Astro, porta 4321
npm run check:astro       # type check dos .astro
```

### Playground Astro

O Storybook não renderiza `.astro`. Para ver os componentes Astro no navegador, o repo tem um playground em `playground/`: um site Astro mínimo, com uma página por componente, que renderiza os arquivos de `lib/` direto.

```bash
npm run playground:astro         # http://localhost:4321
npm run playground:astro:build   # build estático das mesmas páginas
```

Para adicionar um exemplo, crie um arquivo em `playground/src/pages/components/`, importe o componente por `@components/<Nome>/index.astro` e envolva cada caso em `Example`. A página nova entra no índice sozinha. O CI faz o build do playground, então cada exemplo também é um teste de compilação.

## Testes

Este projeto usa Vitest para testes unitários e @testing-library/react para testes de componentes React.

execute os testes com:

```bash
npm test
```

Para rodar no modo watch:

```bash
npm run test:watch
```
