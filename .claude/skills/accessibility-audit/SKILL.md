---
name: accessibility-audit
description: Reads a component and lists accessibility issues based on WCAG 2.1 AA and web accessibility best practices
---

# Accessibility Audit

Perform an accessibility audit on an Aurora component based on WCAG 2.1 AA criteria and web accessibility best practices.

If the component name or path has not been provided, ask for it before proceeding.

---

## Steps

1. Read the component's `index.tsx` and `styles.scss` from `lib/components/<ComponentName>/`
2. If the component has sub-components (composition pattern), read all relevant files
3. Analyze the code against the checklist below
4. Output a prioritized report

---

## Audit checklist

### Semantic HTML
- Are the correct HTML elements being used for their semantic meaning? (e.g. `<button>` for actions, `<a>` for navigation, `<nav>`, `<main>`, `<section>`, `<header>`, `<footer>` where appropriate)
- Are headings (`<h1>`–`<h6>`) used in a logical hierarchy, not skipping levels?
- Are lists (`<ul>`, `<ol>`, `<li>`) used for list content instead of repeated `<div>`s?
- Are `<table>` elements used only for tabular data, with `<th>`, `scope`, and `<caption>` where needed?

### ARIA
- Are ARIA roles, states, and properties used correctly and only when native HTML semantics are insufficient?
- Are interactive elements missing `aria-label` or `aria-labelledby` when their visible label is not descriptive enough?
- Are `aria-hidden="true"` and `role="presentation"` used appropriately to hide decorative content from screen readers?
- Are live regions (`aria-live`, `aria-atomic`) used for dynamic content updates?
- Are expanded/collapsed states communicated via `aria-expanded`?
- Are `aria-describedby` associations correct and pointing to existing elements?

### Keyboard navigation
- Are all interactive elements (buttons, links, inputs) reachable via Tab key?
- Are custom interactive components (e.g. dropdowns, modals, carousels) implementing correct keyboard patterns per [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)?
- Is focus order logical and consistent with the visual layout?
- Are there any `tabIndex` values greater than 0 (which break natural focus order)?
- Does the component trap focus when appropriate (e.g. modals)?

### Focus management
- Are focusable elements missing a visible focus indicator? (`:focus-visible` styles in SCSS)
- Is focus managed programmatically when content changes dynamically (e.g. opening a modal, showing an error)?

### Images and icons
- Do `<img>` elements have meaningful `alt` text, or `alt=""` if decorative?
- Do SVG icons used as interactive elements have `aria-label` or `<title>`?
- Do decorative SVG icons have `aria-hidden="true"`?

### Forms and inputs
- Does every form input have an associated `<label>` (via `for`/`id` or wrapping)?
- Are error messages associated with their input via `aria-describedby`?
- Are required fields marked with `aria-required="true"` or `required`?
- Is the purpose of each input identifiable (autocomplete attributes where applicable)?

### Color and contrast
- Are there any styles that rely on color alone to convey information?
- Are token-based colors used (not hardcoded hex values that bypass the design system)?
- Flag any use of low-contrast text combinations if visible in the SCSS

### Motion and animation
- Are CSS animations or transitions respecting `prefers-reduced-motion`?

### Touch and pointer
- Are touch targets at least 44×44px (WCAG 2.5.5)?

---

## Output format

Group findings by severity. For each issue, provide:
- **What**: a clear description of the problem
- **Where**: file and line reference (e.g. `index.tsx:12`)
- **Why**: the WCAG criterion it violates (e.g. WCAG 1.3.1 Info and Relationships)
- **Fix**: a concrete, actionable suggestion

### Severity levels

| Level | Meaning |
|---|---|
| 🔴 Critical | Blocks access for users with disabilities — must fix |
| 🟡 Warning | Degrades the experience — should fix |
| 🔵 Suggestion | Best practice improvement — consider fixing |

End the report with a summary: total issues by severity and an overall accessibility health assessment (Poor / Needs Work / Good / Excellent).
