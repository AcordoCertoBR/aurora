export type TokenCollection = {
  name: string
  desc: string
  items: Record<string, string>
}
export type ColorsMap = Record<string, string>
export type ColorEntry = {
  value: string
  titleSCSS: string
  titleJS: string
  name: string
}
export type CollectionsMap = Record<string, ColorEntry[]>
