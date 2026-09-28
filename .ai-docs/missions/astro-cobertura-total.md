# Missão: Páginas públicas sem React (Astro no Aurora)

**Estado:** em andamento (parte do Aurora em PR, set/2026)
**Quem acompanha:** Gisele Araújo (dev). **Quem valida:** Tim Fontes.
**Pitch:** [Notion](https://app.notion.com/p/3e41ec40f1b481d2990fe86733e36dd8)

## O problema

A versão Astro do header, do footer e do botão, feita pelo Tim, cortou cerca de 93% do JavaScript da home (AC de 314 kB para 21 kB e CP de 320 kB para 19 kB, em gzip). Com ela, 127 das 388 páginas públicas deixaram de carregar React (fonte: PR 990 do mono-public-pages). As outras 261 páginas continuam com React porque usam algum componente da Aurora que só existe nesse formato. A migração dos blogs do WordPress para Astro vai aumentar essa demanda.

## Sucesso

Todo componente visual da Aurora ganha uma versão Astro, com o `npm run check:astro` passando no CI. Se a missão também incluir as páginas públicas, o número de páginas sem React sobe de 127 para perto de 388.

## Como validar

- **No Aurora:** contar os componentes da lista do pitch que têm `.astro` publicado em `astro/` depois do `npm run build`, com o CI verde.
- **Nas páginas públicas:** repetir a medição do PR 990.

## O que entra no Aurora

Os componentes da lista do pitch, as 18 variantes de Logo que faltavam e o `loading` do Button Astro.

A regra é paridade exata: a versão Astro renderiza e se comporta igual à React, e isso foi provado componente a componente com um harness que compara os dois lados. O SelectField (código próprio) e o Datepicker (cuja grade é uma cópia fiel do que o react-aria-components 1.17 renderiza) ganharam versão Astro em 28/09/2026, com o mesmo DOM e comportamento provados no harness. Todo componente visual da Aurora tem versão Astro. As cores vêm dos mesmos tokens do React, nunca escritas à mão.

Ficam de fora, como diz o pitch, os utilitários que só existem em React (Transition, IsMobile, Conditional, Portal, DynamicTagComponent) e o Carousel, que ainda é protótipo.

O caminho de cada formato e as limitações estão em `docs/astro.md`.

Como o Storybook não renderiza Astro, o repo ganhou um playground (`npm run playground:astro`, PR separado): um site Astro mínimo com uma página por componente, que faz para o formato Astro o que o Storybook faz para o React. O CI faz o build dele, então cada exemplo também é um teste de compilação.

## Decisão (25/09/2026)

A missão inclui as páginas públicas: Gisele cria a versão Astro de todos os componentes no Aurora, depois o Kauan troca os componentes em todas as páginas públicas (mono-public-pages) e o Tim valida. Apetite de 10 dias úteis, como missão secundária, com ok do Lucas Rodrigues no canal `#_temp-missao-aurora-astro`. Este PR cobre só a parte do Aurora.

## Em aberto

- Nenhum componente ficou de fora. A grade do Datepicker Astro é uma cópia do react-aria-components 1.17.0; subir essa dependência exige rodar o harness de paridade de novo.
