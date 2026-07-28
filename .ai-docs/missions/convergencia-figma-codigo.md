# Missão: Convergência Figma × Código do Aurora

**Estado:** em andamento (Onda 1 entregue em 28/jul/2026)
**Quem acompanha:** Gisele Araújo (dev) + time de design (Aurora DS no Figma)

## O problema

A biblioteca Aurora (código) e a biblioteca "Aurora DS" (Figma) divergiram ao longo do tempo: componentes que existem só no design, componentes que existem só no código, e props/estados diferentes entre os dois. Isso faz designer e dev falarem de coisas diferentes com o mesmo nome.

## O plano (ondas)

Auditoria completa (jul/2026) mapeou 103 component sets do Figma contra o código e organizou a correção em ondas:

- **Onda 0 — quick wins de código** ✅ ([PR #280](https://github.com/AcordoCertoBR/aurora/pull/280), mergeado 28/jul/2026): Modal fecha no clique do fundo (opt-in), documentação das props que não existem no Figma.
- **Onda 1 — código alcança o Figma** ✅ (28/jul/2026): Drawer ganha posição inferior (Bottom Sheet), botão Negative (botões brancos para fundos coloridos) e SpecialButton — um componente com dois modos: `press` (segurar para confirmar, Figma "Press Button") e `slider` (arrastar para confirmar, Figma "Swipe Button").
- **Onda 2 — alinhamento de API** (pendente, breaking major único): Spinner tokenizado, destino do Tag, estados novos do Alert, Link Button.
- **Onda Design** (paralela, com o time de design): atualizar status 🔴→✅ das páginas com código pronto, documentar no Figma o que só existe no código, limpeza da biblioteca.
- **Governança** (pendente): Code Connect + regra de "nascimento duplo" (componente novo nasce nos dois lados).

## Onde está a verdade

O relatório vivo da auditoria (fora do repo, com a dev) é a fonte do progresso onda a onda. No repo, cada onda vira PR com testes e stories no Storybook.
