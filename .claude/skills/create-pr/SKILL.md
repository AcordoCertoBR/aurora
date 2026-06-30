---
name: create-pr
description: >
  Cria um branch a partir da main e abre um pull request com título de commit
  convencional, descrição estruturada e labels — incluindo as tags
  constitucionais da Consumidor Positivo: classificação de custo (CapEx/OpEx),
  risco, prioridade, impacto e escopo. Use ao abrir um PR neste repo. Mantém
  também as regras específicas de Aurora (release-please, prebuild, lint).
---

# Create Pull Request (baseline constitucional da CP)

> Este é o **baseline da org** instalado pela `cp-repo-setup`. As **regras específicas do repo** (release-please, prebuild, lint, arquivos gerados) ficam na seção "Regras deste repo" no fim — **não as remova**.

## Objetivo
Criar branch a partir de `main`, commitar, push e abrir um PR com descrição clara e as **labels constitucionais** (custo CapEx/OpEx, risco, prioridade, impacto, escopo).

## Passo 1 — Branch a partir da main
```bash
git checkout main && git pull origin main
git checkout -b <tipo>/<descrição-curta>   # feat/ fix/ chore/ refactor/ docs/
```
Convenção de branch: `{tipo}/{descrição}`. Title em conventional commit: `{tipo}({escopo}): {descrição}` (1ª linha < 72 chars).

## Passo 2 — Commit & push
```bash
git add <arquivos>
git commit -m "<conventional commit>"
git push origin <branch>
```
Use só arquivos do diff (`git diff --name-only main`) — ignore untracked/`.gitignore`.

## Passo 3 — Descobrir o repo (sem hardcode)
```bash
REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner)
```

## Passo 4 — Labels constitucionais (toda PR)
Aplique de **cada categoria aplicável**. Mínimo: 1 de custo, 1 de risco, 1 de prioridade, 1+ de escopo. Crie a label se não existir (Passo 5).

### 4a. Custo — CapEx / OpEx — OBRIGATÓRIO
> **Todo PR carrega exatamente UMA label de custo** (`capex:<slug>` **ou** `opex`).

1. **Leia os slugs canônicos** (NÃO mantenha cópia neste repo) — consulte a skill org **`cp-capex`**. Ali estão os projetos **abertos** + a regra de classificação.
2. **Classifique:** projeto capex aberto (missão / rebuild / AI / dados) → `capex:<slug>`; caso contrário (manutenção da lib, ajuste em componente entregue) → `opex`. Na dúvida → pergunte; não invente slug.

### 4b. Risco
`low-risk` (docs/config, sem lógica) · `medium-risk` (componente com testes, backward-compatible) · `high-risk` (breaking na API pública, mudança de token global, sem testes).

### 4c. Prioridade
`priority: low` · `priority: medium` · `priority: high` · `priority: critical`.

### 4d. Impacto
`impact: feature` · `impact: reliability` · `impact: performance` · `impact: tech-debt` · `impact: dx` · `impact: a11y` (acessibilidade) · `impact: security`.

### 4e. Escopo
`front-end` (sempre aplicável aqui) · `scope: <componente>` (ex.: `scope: button`, `scope: tokens`, `scope: icons`) · `scope: cp` / `scope: ac` quando a mudança é de uma marca.

### 4f. Tipo de mudança (se aplicável)
`bug` · `documentation` · `dependencies` · `AI` (skills/agents/prompts).

## Passo 5 — Criar labels que faltam
```bash
gh label list --repo "$REPO" --search "<label>" | cat
gh label create "<label>" --color "<hex>" --description "<desc>" --repo "$REPO" 2>/dev/null || true
```
Cores: `capex:*` = `0E8A16` / `opex` = `5319E7`; `scope:*` = `D4C5F9`.

## Passo 6 — Descrição do PR + footer de missão
Corpo: Summary · Changes · Breaking? (props/classes `au-`/tokens) · Testing. **Se o PR pertence a uma missão** (`.ai-docs/missions/`), some `Mission: <slug>` no footer.
```bash
gh pr create --repo "$REPO" --title "<title>" --body-file /tmp/pr-body.md \
  --label "capex:<slug>|opex" --label "<risco>" --label "priority: <p>" --label "front-end"
```

---

## Regras deste repo (Aurora)

### O título do commit/PR decide a versão — release-please é automático
O versionamento e o `CHANGELOG.md` são gerados pelo **release-please** a partir dos commits convencionais que entram na `main` (ver `.github/workflows/release.yml`). O **tipo no título importa**:
- `feat:` → bump **minor** + publica nova versão no npm.
- `fix:` / `refactor:` → bump **patch** + publica.
- `docs:` / `chore:` / `test:` → entram no changelog, **sem bump** (não publicam sozinhos).
- `ci:` → oculto no changelog.
- **Breaking** (mudança incompatível em props, classes `au-` ou tokens públicos): use `feat!:`/`fix!:` ou `BREAKING CHANGE:` no corpo → bump **major**. Apps consumidores dependem desse contrato — sinalize sempre.

### Antes de abrir o PR (espelha o CI `aurora-tests.yml`)
1. Se mexeu em `lib/core/tokens/*.json` ou em SVGs de `lib/assets/icons/` → rode `npm run prebuild` (regenera tokens + ícones).
2. `npm run lint` — precisa passar com `--max-warnings 0`.
3. `npm test` (o CI roda `test:coverage`).
4. Para mudança que afeta o build da lib: `npm run build`.

### Nunca commite arquivos gerados
`lib/core/tokens/.cache/**` e `lib/components/icons/**` são gerados pelo prebuild. Não os inclua no diff — regenere, não edite à mão.

### Adicionou/alterou uma skill?
Atualize `lib/docs/DevelopingWithAI.mdx` com a seção da skill (regra do `CLAUDE.md`; há hook `PostToolUse` que lembra). Marque o PR com a label `AI`.
