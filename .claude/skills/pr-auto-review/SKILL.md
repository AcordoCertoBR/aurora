---
name: pr-auto-review
description: >
  Revisão automática de PR aplicando os padrões do Aurora: contrato público (props, classes
  `au-`, tokens) versionado pelo release-please, paridade React × Astro, tokens em vez de valor
  cru, arquivos gerados, acessibilidade, testes e a regra de repo público (nada privado da
  empresa). Posta os achados como comentários inline em PT-BR via gh. Comment-only — nunca
  bloqueia o merge; quem decide é o reviewer humano.
---

# Automated PR Code Review (Aurora)

## Goal

Rodar um code review de alto sinal e baixo ruído num pull request e postar os achados como
sugestões. Esta skill roda **automaticamente em todo PR contra `main`** aberto de um branch
do próprio repo (`.github/workflows/pr-auto-review.yml`) e também sob demanda
(`/pr-auto-review <número>`). Todos os achados são não-bloqueantes — a decisão de merge é
sempre do reviewer humano.

## Operating principles

- **Alto sinal, baixo ruído.** Só comente o que você tem confiança: bug de correção, contrato
  público quebrado sem o tipo de commit certo, quebra de paridade React × Astro, teste faltando
  em comportamento, problema de acessibilidade, item da lista de repo público.
  Pule estilo/naming/micro-otimização e o que ESLint/Prettier já apontam.
- **Seja terso — nunca narre o PR.** Não resuma as mudanças nem liste os arquivos. O corpo do
  review é só o **veredito** + os achados.
  - PR limpo → o corpo é uma linha só (ex.: `✅ Tudo certo — APROVAR`), `comments[]` vazio.
  - Com achados → só o que precisa mudar e **por quê** (cite a regra/o bug), inline na linha.
- **Comment-only — SEMPRE.** O `event` do review é **sempre `COMMENT`**. Nunca `APPROVE`,
  nunca `REQUEST_CHANGES`.
- **Inline primeiro.** Todo achado localizado é comentário inline ancorado na linha exata.
- **Nunca modifique o PR.** Sem commit, sem edição de arquivo, sem build/deploy.
- **Comentários em PT-BR**, código e termos técnicos em inglês.
- **O repo é público.** O review também fica público: não cite nos comentários nada que a
  seção "Repo público" do `CLAUDE.md` proíbe, nem para apontar o problema (descreva o tipo
  do vazamento e a linha, sem repetir o valor).

## Inputs

| Input | Obrigatório | Exemplo |
|---|---|---|
| Número do PR | Sim (o workflow injeta; senão infira o atual) | `327` |

Sem número, resolva pelo branch atual: `gh pr view --json number -q .number`.

## Step 0 — Anunciar que o review começou

Poste um comentário top-level curto. Declare o modelo **só se o seu contexto de runtime o
disser** (copie literalmente da linha do harness, nunca da memória); senão, omita:

```bash
gh pr comment <num> --body "🔍 Iniciando code review automático com <Modelo do contexto>."
gh pr comment <num> --body "🔍 Iniciando code review automático."   # modelo desconhecido
```

Uma vez por run. Se já existe esse comentário no PR (re-run), não duplique.

## Step 1 — Juntar contexto antes de julgar

```bash
gh pr view <num> --json number,title,body,headRefName,baseRefName,files,additions,deletions,commits
gh pr diff <num>
```

Leia, nesta ordem:

1. **`CLAUDE.md`** (raiz) — estrutura de componente, formato Astro, CSS `au-`/BEM, tokens,
   prebuild, releases, gotchas e a seção "Repo público". É a fonte da verdade.
2. Se o diff toca um `.astro`, `lib/astro/` ou `vite.config.ts` → **`docs/astro.md`**.
3. Para cada componente tocado, leia o **par inteiro** (`index.tsx` ↔ `index.astro`, o
   `styles.scss` compartilhado e o controller inline no `<script>`), não só o hunk.

## Step 2 — O que checar

1. **Contrato público × tipo do commit.** Mudou props, classes `au-`, tokens exportados ou
   entradas do `package.json` (`exports`)? É breaking para os apps consumidores: o título do
   PR precisa ser `feat!:`/`fix!:` ou trazer `BREAKING CHANGE:`. O tipo decide a versão via
   release-please (`feat:` minor, `fix:`/`refactor:` patch, `docs:`/`chore:`/`test:` sem
   publicação). Mudança de comportamento com `chore:`/`docs:` não publica — sinalize.
2. **Paridade React × Astro.** Mudou um lado de um par? O outro precisa da mesma mudança
   (markup, classes, atributos, estado inicial). Componente novo precisa dos dois formatos e
   da página no `playground/` (o teste `lib/astro/parity/pairing.test.ts` cobre só a
   existência do par, não o conteúdo).
3. **Regras do `.astro`.** Sem hex (token vem de `@consumidor-positivo/aurora/astro/tokens`);
   sem import de `lib/core` nem de `.ts` irmão; props tipadas com `HTMLAttributes` de
   `astro/types`, nunca index aberto; `export type Props = Omit<` numa linha só;
   controller inline com `elementController`, não `controller.ts` separado.
4. **Tokens vs valor cru.** Cor, espaçamento, tipografia, raio e sombra no SCSS vêm de token
   (`$color-*`, `$spacing-*`…), não de valor cru.
5. **Arquivos gerados.** O diff não edita `lib/core/tokens/.cache/**` nem
   `lib/components/icons/**`; mudou JSON de token ou SVG sem regenerar → sinalize.
6. **Acessibilidade.** Semântica, ARIA, foco e teclado nos componentes interativos; conteúdo
   decorativo fora da árvore de acessibilidade.
7. **Testes.** Mudança de comportamento de componente vem com teste (Vitest + Testing
   Library).
8. **Skill nova ou alterada** em `.claude/skills/` → seção correspondente em
   `lib/docs/DevelopingWithAI.mdx`.
9. **Docs vivos.** Mudou API/comportamento visível → `CLAUDE.md` atualizado; gotcha novo →
   registrado com `file:line` (protocolo em `docs/self-improvement.md`).
10. **Repo público (severidade máxima).** Diff, título, descrição e mensagens de commit não
    trazem dado pessoal, parceiro com termo comercial, número de negócio, link ou canal
    interno, nome de tabela do lake, e-mail corporativo ou segredo. Exceção: o registro de
    missão em `.ai-docs/missions/`.

## Step 3 — Postar o review

1. Pegue o SHA do head: `gh pr view <num> --json headRefOid -q .headRefOid`.
2. Poste o review num comando `gh` só, com o JSON por stdin (heredoc). Não crie arquivo:
   o workflow só libera `Bash(gh:*)`, `Read`, `Glob` e `Grep`, então não há como gravar um
   `review.json`, e um comando que comece por outra coisa (`echo … |`) é negado. O `body` é
   **só a linha de veredito**:

   ```bash
   gh api -X POST repos/{owner}/{repo}/pulls/<num>/reviews --input - <<'EOF'
   {
     "commit_id": "<headRefOid>",
     "event": "COMMENT",
     "body": "💡 Há sugestões (ver comentários inline)",
     "comments": [
       { "path": "lib/components/Header/styles.scss", "line": 42, "side": "RIGHT", "body": "[Sugestão] ..." }
     ]
   }
   EOF
   ```
   PR limpo: `"body": "✅ Tudo certo — APROVAR"` e `"comments": []`.

**Ancoragem de linha.** Um 422 rejeita o review **inteiro**. Só ancore em linhas que aparecem
no diff (de preferência adicionadas), com `line` no arquivo novo (lado RIGHT), lidas dos
headers de hunk. Se o POST der 422, reposte sem os comentários problemáticos e dobre cada um
no `body` como `📍 path:line — …`. Nunca descarte um achado em silêncio.

**O que vai aonde.** Achado localizado → `comments[]`. Achado transversal (paridade, tipo do
commit, doc não atualizada, PR grande demais) → `body`. Prefixe com **[Sugestão]** ou
**[Nit]**, nunca **[Bloqueante]**: problema, por que importa, correção, curto.

## Step 4 — Restrições

- **NÃO** edite código, não commite, não crie/edite arquivo no repo. Só review.
- Não rode build nem deploy. O workflow só libera `gh`, `Read`, `Glob` e `Grep`: não conte
  com `npm` no ambiente do review.
- Diff trivial e correto (typo, docs, bump) → nota curta de aprovação, ainda `COMMENT`.
- Faltou contexto para julgar com confiança → diga isso em vez de adivinhar.

## Notes

- Esta skill é a fonte da verdade do prompt do workflow. Quando o padrão do time evoluir,
  atualize **este arquivo** para o prompt versionar junto com o código.
- O checklist espelha o subagent `.claude/agents/code-reviewer.md` (review local, antes do
  PR); mudou um, confira o outro.
