export interface LazyImageTypes {
  className?: string
  lazy?: boolean
  src: string
  alt?: string
  height?: number
  width?: number
  draggable?: boolean
  style?: { [key: string]: string | number }
}

export interface useLazyImageTypes {
  lazy: boolean
  src: string
}
