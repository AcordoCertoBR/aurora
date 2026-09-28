# Componentes Astro

Aurora publica dois formatos do mesmo componente: o React (`@consumidor-positivo/aurora`) e o Astro (`@consumidor-positivo/aurora/astro/<Nome>/index.astro`). O formato Astro segue as convenções do monorepo das páginas públicas, com uma diferença deliberada: o controller não fica num arquivo separado, ele mora dentro do próprio `.astro`.

## Por que existe

As páginas públicas (`www.acordocerto.com.br`, `www.consumidorpositivo.com.br`) são estáticas. Usar o componente React ali custa uma island (`client:load`), e os campos de formulário da Aurora sequer sobrevivem ao SSR do Astro porque tocam `document` durante a renderização. O resultado prático é que o time acaba reimplementando botão, texto e tabs localmente, e a marca sai de sincronia.

O formato Astro entrega a mesma marcação e o mesmo CSS com zero JavaScript quando o componente não tem comportamento, e com um controller enxuto quando tem.

## Onde os arquivos moram

O `.astro` fica na pasta do próprio componente, ao lado do `index.tsx` e do `styles.scss` que ele reaproveita:

```
lib/components/Button/
  index.tsx        # React
  index.astro      # Astro
  styles.scss      # compartilhado pelos dois
  Button.test.tsx
```

Subcomponentes seguem a mesma regra (`lib/components/Tabs/TabPanel/index.astro`).

## O que é publicado

Um `.astro` não passa por bundler: o Rollup não sabe parseá-lo, e compilá-lo aqui amarraria o pacote ao runtime interno de uma versão específica do Astro. O formato é publicado como **source**, e quem compila é o Astro do consumidor.

Por isso não existe um entry do Vite para eles. O `vite.config.ts` copia cada `.astro` de `lib/components/` (o `index.astro` de cada pasta e as variantes nomeadas, como `Logo/ac/Primary.astro`) para o mesmo caminho sob `astro/` com o `viteStaticCopy`, que já estava no config, no hook `writeBundle` (ou seja, depois do CSS já estar escrito). O runtime compartilhado, esse sim, é um entry normal do Vite e sai em `dist/astro/runtime/`.

Os `.astro` ficam em `astro/` na **raiz do pacote**, fora do `dist`, e é o `astro` no `files` que os publica. O motivo está no gotcha do `moduleResolution` abaixo: para os dois resolvedores concordarem, o caminho físico tem que ser igual ao caminho exportado. Como o `astro/` é gerado no build, ele está no `.gitignore` e o `npm run build` roda `rimraf astro` antes do Vite.

No `package.json`:

```json
"./astro/runtime": {
  "types": "./dist/astro/runtime/index.d.ts",
  "import": "./dist/astro/runtime/index.es.js"
},
"./astro/*": "./astro/*"
```

O runtime continua saindo no `dist` porque é um bundle de verdade. Para que ele também tenha caminho físico, o build copia `lib/astro/runtime/package.proxy.json` para `astro/runtime/package.json` — uma pasta-proxy com `main`/`types` apontando de volta para o `dist`, que é o que o resolvedor antigo sabe ler.

O consumidor importa com o caminho completo, extensão inclusa, igual ao que o monorepo das páginas públicas já faz internamente:

```astro
---
import Button from '@consumidor-positivo/aurora/astro/Button/index.astro'
import Tabs from '@consumidor-positivo/aurora/astro/Tabs/index.astro'
import TabPanel from '@consumidor-positivo/aurora/astro/Tabs/TabPanel/index.astro'
---
```

## Estilo: o mesmo SCSS, sem configuração no consumidor

No repo, o `.astro` importa o SCSS do componente:

```astro
---
import './styles.scss'
---
```

O `transform` do `viteStaticCopy` (`pointAstroStylesToBuiltCss`, em `vite.config.ts`) reescreve esse import na cópia publicada, apontando para o CSS que o Vite já compilou para o componente React:

```astro
---
import '../../dist/components/Button/styles.css'
---
```

Isso é o que evita exigir do consumidor injetar `variables.scss` e `mixins.scss` no `additionalData` do Sass. O CSS chega com os tokens já resolvidos, e um app que use as duas versões do mesmo componente carrega a mesma folha uma vez só.

A reescrita vale para **qualquer** import relativo de `.scss`, não só o `./styles.scss` do próprio componente. O de-para sai do próprio bundle: o plugin `recordEmittedStylesheets` (`vite.config.ts`) anota, no `generateBundle`, qual CSS cada chunk emitiu para cada `styles.scss` que contém, e a cópia dos `.astro` (que roda depois, no `writeBundle`) consulta esse mapa. É assim que as partes de um barrel acham o CSS: `Card/Root` importa `../styles.scss` e sai apontando para `dist/components/Card/styles.css`, e `form/Field/Root` para o `Field/styles2.css` que o bundler escolheu.

O caminho não dá para deduzir do nome do entry: o CSS é nomeado pelo basename do chunk, então entries aninhados colidem e ganham número na ordem do build (`form/Field`, `Checkbox/Field` e `Radio/Field` viram `Field/styles{,2,3}.css`). Import sem contrapartida emitida é removido na cópia.

### O reset global

O reset (`box-sizing: border-box`, margens zeradas, fonte do body) mora no `GlobalStyles.scss` e viaja dentro do `dist/main.es.js`, o entry React. Uma página feita só com componentes Astro nunca importa esse entry e, sem o reset, o `padding` dos containers estoura a largura da viewport. Por isso o `globalStyles` é um entry próprio e o CSS dele é exportado sozinho:

```astro
---
import '@consumidor-positivo/aurora/global.css'
---
```

São 480 bytes, uma vez por página. Quem já usa componentes React da Aurora na mesma página não precisa: o reset já veio junto.

## Sem props de callback

O React expõe `onClick`, `onClickMenu`, `renderItem`. Astro renderiza em build time e não tem props de função, então a versão Astro entrega marcação e estado inicial, e o comportamento que é do **app** fica com o app:

```astro
<HeaderHamburger id="abrir-menu" controls="menu-mobile" />

<script>
  document.getElementById('abrir-menu')?.addEventListener('click', abrirDrawer)
</script>
```

Todas as props HTML passam adiante (`id`, `data-*`, `aria-*`, `class`), então o gancho é sempre um atributo. O `Header.Profile` já vem com `data-au-header-profile="notifications"` e `="menu"` para dispensar o `id`. O que é comportamento **do componente** continua embutido: o dropdown do `Header.NavbarLink` tem controller próprio.

O `Header.Navbar` também troca o `renderItem` do React por `data`: ele renderiza o `NavbarLink` sozinho, e o slot default fica para item customizado.

## Abrir um `Drawer` sem callback

O `Drawer` React recebe `isOpen` e `handleOpen`. Em Astro ele se abre sozinho: qualquer elemento com `data-au-drawer-toggle="<id do drawer>"` vira gatilho, de qualquer lugar da página.

```astro
<HeaderHamburger data-au-drawer-toggle="menu" controls="menu" />

<Drawer id="menu">
  <LogoPrimaryCP slot="header" />
  <NavbarVertical>
    {links.map((link) => <NavbarVerticalLink {...link} />)}
    <Fragment slot="actions">
      <Button expand="x" as="a" href="/cadastro">Cadastrar</Button>
    </Fragment>
  </NavbarVertical>
</Drawer>
```

O controller cuida do `aria-expanded` do gatilho e emite `au:draweropen` / `au:drawerclose` a partir do root, para o app reagir (fechar outro menu, travar o scroll).

Duas coisas o Astro faz e o React não: fecha no clique do backdrop e no `Esc`. São adições deliberadas — a marcação e o CSS continuam os mesmos, só o fechar tem mais caminhos.

## Paridade com o React

Regra da biblioteca: **o `.astro` renderiza e se comporta exatamente como o React.** Componente que não consegue ficar igual não ganha versão Astro. É por isso que o `Datepicker` não tem: o campo, a máscara e os seletores de mês e ano são código próprio, mas a grade do calendário vem do `react-aria-components`, que gera ids, `aria-label` por célula e navegação por teclado que um controller só reproduziria reescrevendo a biblioteca. O `SelectField`, que não usa `react-aria`, tem versão Astro com o mesmo DOM e o mesmo comportamento.

"Igual" quer dizer: com as mesmas props, o DOM depois do controller rodar é o mesmo do React (tags, classes, atributos, estilos inline, texto), incluindo as esquisitices do React (`au-alert__title--undefined`, `width: undefinedpx` no `Card`, `<p>` vazio). As únicas diferenças aceitas são as mecânicas do formato:

- callback vira atributo repassado, `data-*` fixo ou evento `au:*` (ver **Eventos**);
- `ReactNode` vira slot;
- atributos de wiring do controller (`data-element`, `data-au-controller-ran`) e ids gerados.

O que o React decide em runtime o controller decide igual, com a mesma regra:
- o `Modal` fechado sai da página (o React renderiza `null`) e fica um comentário no lugar;
- no `full-screen`, o `Modal` escolhe entre SubHeader e X a cada abertura com o mesmo `matchMedia` do `isMobile()`;
- o `LazyImage` segura o `src` até o IntersectionObserver ver a imagem, com as mesmas opções do `useLazyImage`;
- o `Alert` só insere o botão de ação quando o timer zera.

Quem ainda não está na DOM fica num `<template>` que o controller lê e remove.

A paridade foi provada com um harness que renderiza os dois lados (React com `react-dom`, Astro com `experimental_AstroContainer`), roda o controller em jsdom e compara a árvore, inclusive depois de cliques, digitação e timers. O harness não está no repo nem no CI; se um componente mudar, a paridade precisa ser conferida de novo.

Em 28/09/2026 a paridade foi medida de novo, agora no browser: um projeto Astro com `@astrojs/react` renderiza cada caso nos dois formatos na mesma página, e o Playwright compara print (pixelmatch) e DOM normalizada depois de cada interação, em desktop e mobile (tablet para Header, Footer e Modal). Foram 614 comparações em 40 componentes; 598 saíram idênticas em pixel. As diferenças que sobraram estão nos gotchas do `CLAUDE.md` (badge do `Header.Profile`, Footer em tablet, espaço do Tabs, sublink do NavbarVertical, `aria-hidden` dos ícones, `div` do `Text` com HTML, atributo `slot`) e no relatório da missão no Notion. O harness continua fora do repo.

## Modal sem callback

Mesmo modelo do Drawer: qualquer `data-au-modal-toggle="<id do modal>"` na página abre e fecha, com `aria-expanded` e `aria-controls` no gatilho. Um componente que controla o próprio modal (o `SelectField` em tela cheia) dispara `document.dispatchEvent(new CustomEvent('au:modalcontrol', { detail: { id, open }, bubbles: true }))`; sem `open` o modal alterna. A prop `portal` move o modal para o `document.body` quando o controller roda, o equivalente do `createPortal` do React. `closeButton` (padrão `true`) faz o papel do `onClose` do React: sem ele não há X, e o `closeOnBackdropClick` não fecha. Não fecha no `Esc`, porque o React não fecha. Emite `au:modalopen` / `au:modalclose` com `{ id }`.

## SelectField

O `SelectField` React é escrito à mão (wrapper `combobox`, `input`, `ul` de opções e um `<select hidden>` com o `name` para o formulário), então o `.astro` reproduz o mesmo DOM e o controller segue o hook passo a passo: abre no clique, ArrowUp/ArrowDown pulando opção desabilitada, Enter, Escape, filtro por rótulo com `autocomplete`, opção destacada acompanhando o mouse, altura da lista calculada pelo espaço abaixo, clique fora fechando só com uma opção destacada e o atraso de 500ms antes de fechar depois da escolha. `value` é a seleção inicial; `onChange` vira `au:selectchange` (`detail.value`, disparado na escolha e em cada tecla com `autocomplete`, como o callback React) e `onBlur` vira `au:selectblur` (`detail.target`, a opção que o React devolve), 200ms depois do blur.

Com `fullScreenOptions`, o React abre a lista num `Modal` via `createPortal` no mobile (`isMobile()`, decidido na renderização). O `.astro` renderiza o `Modal` no fim da marcação com `portal`, e o controller decide com o mesmo `matchMedia` ao rodar: no mobile remove a `ul` e abre o modal por `au:modalcontrol`; no desktop o modal fica fechado e fora da página, só o comentário do placeholder sobra no `body`.

## Formulário

Os campos compõem as partes de `form/Field/*` (cada uma com o seu `.astro`), e o `...rest` vai no elemento de formulário, como o React espalha as props de input.

`CheckboxGroup` e `RadioGroup` recebem `options` (cada item são as props de um Field) em vez de clonar filhos, porque o Astro não inspeciona o slot. A marcação que sai é a mesma do React. O slot default aceita Field customizado, que precisa trazer o próprio `name`.

## Eventos

Onde o React recebe callback, o Astro emite um `CustomEvent` que borbulha a partir da raiz:

| Componente | Eventos |
|---|---|
| `Alert` | `au:alertclose`, `au:alertaction`, `au:countdownend` |
| `ChipBanner` | `au:chipbannertoggle`, `au:chipbannercomplete` |
| `Modal` | `au:modalopen`, `au:modalclose` |
| `SpecialButton` | `au:confirm` |
| `EmailField` | `au:emailselect` |
| `SelectField` | `au:selectchange`, `au:selectblur` |
| `PasswordField` | `au:passwordtoggle` |
| `TokenField` | `au:tokenchange`, `au:tokencomplete`, `au:tokentimer` |

`Switch`, `Checkbox` e `Radio` usam o `change` nativo. Botão que só chama callback do app sai com `data-*` fixo: `data-au-sub-header="return|help"`, `data-au-partner-banner="button"`, `data-au-notifications-bar="link|delete"`.

## Tokens

Os tokens gerados (`lib/core/tokens/.cache/tokens.ts`, a mesma fonte do React) saem também como entry próprio, `@consumidor-positivo/aurora/astro/tokens`, com pasta-proxy para `moduleResolution: "node"`, como o runtime. O frontmatter do `.astro` importa dali, nunca escreve o valor:

```astro
---
import { COLOR_SUCCESS_50 } from '@consumidor-positivo/aurora/astro/tokens'
---
```

O import roda só no build do consumidor; nada vai para o cliente. No repo, o `tsconfig.json` aponta o specifier para `lib/core/tokens`.

## Ícones

O `npm run icons` gera, para cada SVG de `lib/assets/icons/<coleção>/`, duas coisas na mesma pasta de saída: o componente React (`IconChevronDown.tsx`) e o Astro (`IconChevronDown.astro`). Os dois saem do mesmo markup, então não há como um divergir do outro.

```astro
---
import IconChevronDown from '@consumidor-positivo/aurora/astro/icons/default/IconChevronDown.astro'
---

<IconChevronDown size="large" color="success" />
```

O `.astro` gerado é uma casca: ele passa o markup para o `Icon` (`lib/components/Icon/index.astro`), o primitivo escrito à mão que renderiza o `div.au-icon` com as classes de `size`, `color`, `rawColor` e nome. As props são as mesmas do React, menos `onClick`.

O primitivo continua exportado (`@consumidor-positivo/aurora/astro/Icon/index.astro`) para quem precisar renderizar um SVG que não está na biblioteca:

```astro
<Icon markup={SVG_DO_PARCEIRO} name="IconParceiro" />
```

São 327 arquivos `.astro` no pacote (uns 600 kB de source). Como não passam por bundler, só pesa no build de quem importa.

## Tipagem

`astro check` roda no repo (`npm run check:astro`) e no CI, e é o que impede um `.astro` quebrado de passar. Três coisas que ele obriga:

**As props usam `HTMLAttributes` do `astro/types`, não um índice `[key: string]: unknown`.** Com o índice, `sizee="large"` passa batido; com `HTMLAttributes`, o consumidor ganha `id`, `data-*`, `aria-*` e `class` tipados de verdade e erra no que não existe. Onde a prop da Aurora colide com o atributo HTML, `Omit` resolve:

```ts
import type { HTMLAttributes } from 'astro/types'

export type Props = Omit<HTMLAttributes<'button'>, 'type' | 'disabled'> &
  AuroraButtonProps
```

**O `<script>` é TypeScript.** O Astro type-checa o conteúdo da tag, então `event.target.closest(...)` e `event.key` não compilam sem narrowing. O runtime ajuda: `on` é sobrecarregado por nome de evento, então `on('keydown', (event) => event.key)` já recebe um `KeyboardEvent`.

**Os imports do runtime e dos tokens resolvem pelo source, não pelo `dist`.** O `tsconfig.json` mapeia `@consumidor-positivo/aurora/astro/runtime` para `lib/astro/runtime` e `.../astro/tokens` para `lib/core/tokens`, senão o check dependeria de um `dist` recém-buildado para ver os tipos certos.

## Controller inline

Componentes com comportamento usam `elementController`, o mesmo padrão do monorepo das páginas públicas, servido por `@consumidor-positivo/aurora/astro/runtime`. A diferença é que aqui ele fica no `<script>` do próprio `.astro`, não num `controller.ts` irmão:

```astro
<div data-element="au-tabs" data-active-tab={activeTab}>
  <slot />
</div>

<script>
  import { elementController } from '@consumidor-positivo/aurora/astro/runtime'

  elementController('au-tabs', ({ root, query, queryAll, on, emit }) => {
    // root     = o elemento com data-element="au-tabs"
    // on       = listener escopado ao root; prefixo 'global:' mira o window
    // query    = querySelector escopado
    // queryAll = querySelectorAll escopado, já como array
    // emit     = CustomEvent que borbulha a partir do root
  })
</script>
```

O nome passado para `elementController` tem que bater com o `data-element` da marcação. Sem o par, o controller nunca roda.

O runtime da Aurora é um port do runtime dos sites públicos com duas adições:

- `on` devolve uma função de unsubscribe.
- o builder roda no máximo uma vez por elemento (marca `data-au-controller-ran`), então o mesmo componente usado em duas páginas ou reimportado não duplica listener.

`elementController('nome', builder, { lazy: true, rootMargin: '200px' })` adia o builder até o elemento entrar na viewport.

## Adicionando um componente novo

1. Escreva `lib/components/<Nome>/index.astro` renderizando exatamente o que o `index.tsx` gera (ver **Paridade com o React**). As classes `au-*` são o contrato; se as duas versões divergirem, o CSS deixa de servir para as duas. Token vem de `@consumidor-positivo/aurora/astro/tokens`, nunca em hex.
2. Importe `./styles.scss` no frontmatter.
3. Se precisar de comportamento, adicione o `<script>` com `elementController` e um `data-element` na raiz.
4. Rode `npm run check:astro` e valide num app Astro de verdade (ver **Como verificar** abaixo). A cópia é automática: o glob do `viteStaticCopy` pega qualquer `.astro` sob `lib/components/`.
5. Commit como `feat:` — é contrato público novo.

## Como verificar

`npm run check:astro` (`astro check`) é o gate: faz parse e type check completos, incluindo o conteúdo dos `<script>`. Roda no CI.

Ele não cobre renderização. Para mudanças não triviais, monte um projeto Astro descartável e instale o **tarball**:

```bash
npm run build
npm pack --pack-destination /tmp/smoke
cd /tmp/smoke && npm install ./consumidor-positivo-aurora-<versao>.tgz
npx astro check && npx astro build && npx astro preview
```

Rodar `astro check` do lado do consumidor é o único jeito de saber que os tipos publicados chegaram inteiros: o check dentro do repo usa o alias para o source e não passa pelo campo `exports`.

## Gotchas

- **No `exports`, a condição `types` vem antes de `import`.** O TypeScript para na primeira condição que casa; com `import` na frente, o subpath resolve o `.js` e o consumidor recebe `any` com o erro "could not be resolved when respecting package.json exports". O campo `types` da raiz não cobre subpath.
- **Consumidor em `moduleResolution: "node"` (node10) ignora o `exports`.** É o caso do monorepo das páginas públicas (`tsconfig.base.json`). O TypeScript resolve o specifier como caminho físico e o Vite resolve pelo `exports`, então os dois só concordam se o arquivo estiver fisicamente em `astro/<caminho>/index.astro`. Com os `.astro` dentro do `dist`, o `astro check` acusa `Cannot find module` e trocar o import para `.../dist/astro/...` inverte o erro: aí é o Vite que quebra com `Missing "./dist/astro/..." specifier in package`.
- **`npm link` (ou `file:`) não serve para testar.** O Vite resolve o symlink para o caminho real, então o `.astro` passa a ser compilado de fora do projeto do consumidor: o `astro check` acusa `is not under 'rootDir'` e o build quebra em `Rollup failed to resolve import "@consumidor-positivo/aurora/astro/runtime"`, porque a resolução do `<script>` parte do repo da Aurora, onde o pacote não existe. Sempre teste com `npm pack` + tarball.
- **Atributo booleano `false` some.** O Astro não renderiza `aria-selected={false}`. Onde o valor `"false"` importa para acessibilidade, passe a string: `aria-selected={ativo ? 'true' : 'false'}`.
- **`set:html` não pode ser condicional.** A diretiva sempre substitui o conteúdo, então um `set:html={undefined}` apaga o `<slot />`. `Text` resolve isso ramificando a tag inteira (`lib/components/Text/index.astro:59`).
- **`Tabs` exige `active` explícito no painel inicial.** O Astro não sabe qual painel corresponde ao `initialTab` na hora de renderizar o `TabPanel`, e resolver isso só no controller causaria flash de todos os painéis abertos. O consumidor marca `<TabPanel tab="x" active>`.
- **`Tabs` renderiza todos os painéis**, escondendo os inativos com o atributo `hidden`, enquanto a versão React monta só o ativo. Conteúdo pesado em aba secundária pesa no HTML.
- **`export type Props = Omit<` quebrado em várias linhas quebra o compilador, e o `astro check` não pega.** O build falha com `Expected ">" but found "$$Index"`. Mantenha o `Omit<...>` numa linha só ou use um alias (`lib/components/Chip/index.astro:7`).
- **Um `.astro` não importa `lib/core` nem `.ts` irmão.** Só os `.astro` vão no pacote. Token tem entry próprio (ver **Tokens**); helper não, então o `getInitialLetters` está copiado em `lib/components/ProfileNav/index.astro:16`. Mudou o helper, mude a cópia.
- **`hidden` não esconde elemento cuja classe define `display`.** E mesmo quando esconde, o React não renderiza o nó, então a paridade pede tirar da DOM: o `Alert` fecha com `root.remove()`, e `ChipBanner`, `SpecialButton` e `Alert` guardam o que ainda não aparece em `<template>`.
- **`Astro.slots.has()` é `true` para slot repassado por um pai, mesmo vazio.** `form/Field/InputHolder/index.astro:15` e `form/Field/Label/index.astro:49` renderizam o slot e testam o texto.
- **O `Card` escreve `undefinedpx`.** O React monta o `style` com todos os tamanhos, definidos ou não, e o Astro replica a string literal. O browser descarta os inválidos.
- **Componente usado com `slot="x"` recebe `slot` como prop.** Se ele espalha `...rest`, o atributo `slot` aparece no HTML. `NotificationsBar/List` descarta; nos outros é um atributo inerte fora de shadow DOM.
- **Dois breakpoints no Modal.** O cabeçalho troca em 767px (o do `isMobile()`), mas o layout `full-screen` usa `belowMedium` (600px), então entre 600 e 767px sai o SubHeader sem o container em tela cheia. O React tem o mesmo descompasso.
- **`Esc` fecha todos os drawers abertos**, não só o de cima. O `Modal` não fecha no `Esc`, como no React.
- **As logos cp `PrimaryFillWhite`, `PrimaryFullWhite`, `PrimaryLogoWhite`, `PrimaryNegative` e `PrimaryWhite` usam `clipPath id="a"`.** Duas na mesma página compartilham o id, igual ao React. Só é inofensivo enquanto os recortes forem iguais.
- **`@deprecated` numa prop marca a prop inteira.** O `Button` React usa `@deprecated` no `type` para desencorajar só o valor `'link'`, e o efeito é um aviso em toda chamada de `<Button type="primary">`. A versão Astro descreve a restrição em texto em vez de usar a tag. O React continua com o aviso falso.
- **`class:list` num componente sobrescreve as classes dele.** O Astro passa a diretiva como prop crua; se o componente espalha `...rest` no elemento, ela cai depois do `class:list` interno e apaga tudo. Foi assim que os links do `NavbarVertical` perderam as classes `au-text` e saíram com o azul default do browser. `Text`, `Button` e `Icon` agora capturam `'class:list'` das props e mesclam; nos outros, passe `class`.
- **Componente Astro não pode depender de ordem de folha.** No React todo o CSS entra na ordem do `main.ts`; compondo `.astro`, cada componente traz a própria folha na ordem em que é importado. Onde uma classe de estado disputa com uma de token do `Text` (mesma especificidade, 0-1-0), o resultado inverte: `au-navbar-vertical__link--is-active` perdia para `au-text--color-common`. A regra de estado tem que compor (`&--is-active.au-text`), não contar com a ordem.
- **Os ícones Astro não isolam ids de SVG.** O React sufixa `id`/`url(#…)` por instância (usa `useId`); o `Icon` Astro insere o markup como veio. Só importa para ícone que define id (o do YouTube define): duas instâncias do mesmo ícone na mesma página compartilhariam o id.
- **Os dados do Footer estão duplicados.** `lib/components/Footer/data.tsx` é JSX e não vai no pacote publicado, então o `Footer/index.astro` repete os mapas de certificado, loja e rede social. Mudou URL de certificado, mude nos dois.
- **O Footer troca `isMobile()` por breakpoint de CSS.** O React decide em runtime (`max-width: 767px`) onde renderizar o bloco de lojas e se a faixa de certificados leva borda. Saída estática não decide nada em runtime: o bloco de lojas vai nas duas posições e o `au-footer-full__stores-slot--mobile|--desktop` esconde uma com `display`, no breakpoint de 1024px, que é onde o resto do layout do footer já vira desktop.
- **`Header` e `Footer` recebem a logo por slot.** A logo é componente React por marca (`Logo/ac`, `Logo/cp`); no Astro, o consumidor passa a própria marcação (`<slot name="logo">` no Footer, slot default no `Header.Logo`).
- **`.au-tabs-root` só existe no Astro.** É o `display: contents` que junta a barra e os painéis sob um único root de controller sem criar caixa no layout (`lib/components/Tabs/styles.scss:79`).

## Cobertura atual

| Componente | Comportamento |
|---|---|
| `Button` | estático |
| `Text` | estático |
| `Icon` | estático (recebe o markup do SVG) |
| `Tabs` + `Tabs/TabPanel` | controller inline |
| `Header` (`Logo`, `Navigation`, `Navbar`, `NavbarLink`, `Actions`, `Badges`, `Button`, `Hamburger`, `Profile`) | estático, menos o dropdown do `NavbarLink` |
| `Footer` | estático |
| `Logo` + `Logo/ac/Tertiary`, `Logo/cp/Primary` | estático |
| `Drawer` | controller inline |
| `NavbarVertical` + `NavbarVertical/Link` | controller inline no `Link` |
| `Logo`: as 20 variantes de `ac/` e `cp/` | estático |
| `LazyImage` | controller (IntersectionObserver, como o React) |
| `AdBox`, `BadgeInfo`, `BadgeState`, `Card/*` (`Root`, `Container`, `Emphasis`, `Image`, `Tag`), `Chip`, `Container`, `Divider`, `Image`, `LinkButton`, `NotificationsBar` (+ `List`, `Link`), `PartnerBanner`, `ProfileNav`, `ProgressBar`, `Skeleton`, `Spinner`, `SubHeader`, `Switch/Pure`, `Tooltip` | estático |
| `Alert`, `ChipBanner`, `Modal`, `SpecialButton`, `Switch/Card` | controller inline |
| `form/Field/*`, `InputField`, `Checkbox` (`Field`, `Group`), `Radio` (`Field`, `Group`) | estático |
| `form/Field/TextArea`, `TextareaField` | controller só do contador (`maxLength`) |
| `EmailField`, `PasswordField`, `TokenField`, `SelectField` | controller inline |

Ficam só em React: `Datepicker` (não fica igual, ver **Paridade com o React**), os utilitários sem sentido em Astro (`Transition`, `IsMobile`, `misc/Conditional`, `misc/Portal`, `misc/DynamicTagComponent`) e o `Prototype/Carousel`. O `Header/Wrap` é o `Header/index.astro`.

Os componentes anteriores a essa regra (`Tabs`, `Drawer`, `Footer`, `Header`) têm diferenças documentadas nos gotchas (todos os painéis no HTML, `Esc` e backdrop no Drawer, breakpoint de CSS no Footer) e não passaram pelo harness de paridade.
