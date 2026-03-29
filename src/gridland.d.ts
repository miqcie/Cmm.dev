/* eslint-disable @typescript-eslint/no-empty-object-type */
import type { RGBA } from "@gridland/utils"

type Color = string | RGBA

interface GridlandStyle {
  fg?: Color
  bg?: Color
  attributes?: number
}

interface BoxProps {
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse"
  flexGrow?: number
  flexShrink?: number
  flexWrap?: "no-wrap" | "wrap" | "wrap-reverse"
  alignItems?: "auto" | "flex-start" | "center" | "flex-end" | "stretch" | "baseline"
  justifyContent?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly"
  alignSelf?: "auto" | "flex-start" | "center" | "flex-end" | "stretch" | "baseline"
  gap?: number | string
  width?: number | string
  height?: number | string
  minWidth?: number | string
  minHeight?: number | string
  maxWidth?: number | string
  maxHeight?: number | string
  padding?: number | string
  paddingX?: number | string
  paddingY?: number | string
  margin?: number | string
  marginTop?: number | string
  marginBottom?: number | string
  marginLeft?: number | string
  marginRight?: number | string
  border?: boolean | string[]
  borderStyle?: "single" | "double" | "rounded" | "heavy"
  borderColor?: Color
  backgroundColor?: Color
  shouldFill?: boolean
  title?: string
  titleAlignment?: "left" | "center" | "right"
  position?: "relative" | "absolute"
  overflow?: "visible" | "hidden" | "scroll"
  visible?: boolean
  opacity?: number
  id?: string
  key?: string | number
  children?: React.ReactNode
}

interface GridlandTextProps {
  fg?: Color
  bg?: Color
  content?: string
  textAlign?: "left" | "center" | "right"
  wrapMode?: "none" | "char" | "word"
  truncate?: boolean
  attributes?: number
  marginTop?: number | string
  children?: React.ReactNode
  key?: string | number
}

interface GridlandSpanProps {
  style?: GridlandStyle
  children?: React.ReactNode
  key?: string | number
}

interface GridlandAnchorProps {
  href?: string
  style?: GridlandStyle
  children?: React.ReactNode
  key?: string | number
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      box: BoxProps
      text: GridlandTextProps
      span: GridlandSpanProps
      a: GridlandAnchorProps
      scrollbox: BoxProps
      br: {}
      b: { children?: React.ReactNode }
      i: { children?: React.ReactNode }
      u: { children?: React.ReactNode }
    }
  }
}
