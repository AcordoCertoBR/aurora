---
name: token-audit
description: Detects hardcoded values in a component's SCSS that should be replaced with Aurora design tokens, and suggests the correct token for each one
---

# Token Audit

Detect hardcoded values in a component's SCSS file and suggest Aurora design token replacements.

If the component name has not been provided, ask for it before proceeding.

---

## Steps

### 1. Grep for hardcoded values

Run the following grep commands on `lib/components/<ComponentName>/styles.scss` to find candidates. Run all in parallel:

```bash
# Hex colors
grep -n "#[0-9a-fA-F]\{3,8\}" lib/components/<ComponentName>/styles.scss

# Hardcoded font-size
grep -n "font-size:\s*[0-9]" lib/components/<ComponentName>/styles.scss

# Hardcoded font-weight
grep -n "font-weight:\s*[0-9]" lib/components/<ComponentName>/styles.scss

# Hardcoded font-family (string literals, not variables)
grep -n "font-family:\s*['\"]" lib/components/<ComponentName>/styles.scss

# Hardcoded border-radius (px values)
grep -n "border-radius:\s*[0-9]" lib/components/<ComponentName>/styles.scss

# Hardcoded box-shadow
grep -n "box-shadow:\s*[0-9]" lib/components/<ComponentName>/styles.scss

# Hardcoded opacity (decimal values)
grep -n "opacity:\s*0\.[0-9]" lib/components/<ComponentName>/styles.scss

# Hardcoded spacing in padding/margin/gap (px values)
grep -n -E "(padding|margin|gap|top|right|bottom|left):\s*[1-9][0-9]*px" lib/components/<ComponentName>/styles.scss
```

### 2. Read token sources

Read all token files to build the substitution map:

- `lib/core/tokens/colors.json`
- `lib/core/tokens/typography.json`
- `lib/core/tokens/border.json`
- `lib/core/tokens/layout.json`
- `lib/core/tokens/shadow.json`
- `lib/core/tokens/opacity.json`

### 3. Filter false positives

Ignore the following — they are intentional and have no token equivalent:

- `0`, `0px`, `0%` — zero values
- `1px` — hairline borders
- `100%`, `50%`, `auto`, `inherit`, `none` — layout utilities
- `rgba(...)` inside `box-shadow` — shadows use their own token
- Values that are already SCSS variables (starting with `$`) or CSS custom properties (`var(--...)`)
- `!important` modifiers — check the value itself, not the flag

### 4. Output a report

For each hardcoded value found (after filtering), output an entry in this format:

---

**`<property>: <value>`** — [styles.scss:<line>](lib/components/<ComponentName>/styles.scss#L<line>)

- **Token:** `$<token-name>` → `<token-value>`
- **Replace with:** `<property>: $<token-name>`

---

If no matching token exists for a value, output:

**`<property>: <value>`** — [styles.scss:<line>](...)
- **Token:** none found in Aurora token set
- **Note:** <brief explanation — e.g. "intermediate spacing value not covered by the spacing scale">

---

## Token reference summary

Use the values below to match hardcoded values to tokens:

### Colors (`$color-*`)
All color tokens follow the pattern `$color-<palette>-<shade>`.
Palettes: `neutral`, `brand-blue`, `brand-emerald`, `brand-cyan`, `brand-yellow`, `info`, `success`, `error`, `warning`.
Shades: `00`, `10`, `20`, `30`, `40`, `50`, `60`.
Read `lib/core/tokens/colors.json` for the full hex map.

### Typography
| Token | Value |
|---|---|
| `$font-title` | `'Lexend Deca', sans-serif` |
| `$font-body` | `'Source Sans 3', sans-serif` |
| `$font-weight-bold` | `700` |
| `$font-weight-semibold` | `600` |
| `$font-weight-medium` | `500` |
| `$font-weight-regular` | `400` |
| `$font-size-h1` | `56px` |
| `$font-size-h2` | `48px` |
| `$font-size-h3` | `40px` |
| `$font-size-h4` | `32px` |
| `$font-size-h5` | `28px` |
| `$font-size-h6` | `24px` |
| `$font-size-p1` | `20px` |
| `$font-size-p2` | `16px` |
| `$font-size-p3` | `14px` |
| `$font-size-p4` | `12px` |

### Spacing (`$spacing-*`)
| Token | Value |
|---|---|
| `$spacing-050` | `4px` |
| `$spacing-100` | `8px` |
| `$spacing-200` | `16px` |
| `$spacing-300` | `24px` |
| `$spacing-400` | `32px` |
| `$spacing-500` | `40px` |
| `$spacing-600` | `48px` |
| `$spacing-700` | `56px` |
| `$spacing-800` | `64px` |
| `$spacing-900` | `72px` |

### Border radius (`$border-radius-*`)
| Token | Value |
|---|---|
| `$border-radius-small` | `4px` |
| `$border-radius-medium` | `8px` |
| `$border-radius-big` | `16px` |
| `$border-radius-pill` | `999px` |

### Shadows (`$shadow-*`)
| Token | Value |
|---|---|
| `$shadow-01` | `0px 2px 8px ...` |
| `$shadow-02` | `0px 8px 24px ...` |
| `$shadow-03` | `0px 16px 40px ...` |
| `$shadow-04` | `0px 24px 56px ...` |

### Opacity (`$opacity-*`)
| Token | Value |
|---|---|
| `$opacity-00` | `0.05` |
| `$opacity-10` | `0.2` |
| `$opacity-20` | `0.4` |
| `$opacity-30` | `0.6` |
| `$opacity-40` | `0.8` |

---

## End of report

Close with a one-line summary:
> **X hardcoded value(s) found — Y have a token replacement, Z have no equivalent in the Aurora token set.**
