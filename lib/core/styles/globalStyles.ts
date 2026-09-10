// Entry that emits the global stylesheet on its own, so a page built only with
// the Astro components can load the reset without pulling the React bundle.
import './GlobalStyles.scss'
