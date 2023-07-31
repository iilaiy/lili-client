// postcss-px-to-viewport.d.ts
declare module 'postcss-px-to-viewport' {
  type Options = {
    unitToConvert: 'px' | 'rem' | 'cm' | 'em'
    viewportWidth: number
    viewportHeight: number // not now used; need for different units and math for different properties
    unitPrecision: number
    viewportUnit: string
    fontViewportUnit: string // vmin is more suitable.
    selectorBlackList: string[]
    propList: string[]
    minPixelValue: number
    mediaQuery: boolean
    replace: boolean
    landscape: boolean
    landscapeUnit: string
    landscapeWidth: number
  }
  // Partial 将参数变为可选
  // @ts-ignore
  export default (options: Partial<Options>) => any
}
