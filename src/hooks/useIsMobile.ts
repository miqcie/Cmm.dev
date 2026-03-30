import { useTerminalDimensions } from "@gridland/utils"

const MOBILE_COLS = 60

export function useIsMobile() {
  const { width } = useTerminalDimensions()
  return width < MOBILE_COLS
}
