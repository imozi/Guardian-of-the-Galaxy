// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Listener<T extends any[] = any[]> = (...args: T) => void

export type PictureProps = {
  url: string
  sw: number
  sh: number
  frameRate: number
  loop?: boolean
  rotation?: number
}
