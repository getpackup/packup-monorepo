import { COLOR_MODE_KEY, COLORS, INITIAL_COLOR_MODE_CSS_PROP } from '@packup/styles'
import React, { createContext, useEffect, useMemo, useState } from 'react'

type ContextType = {
  colorMode: string | undefined
  setColorMode: (newValue: string) => void
}

export const ThemeContext = createContext({
  colorMode: undefined,
  setColorMode: () => null,
} as ContextType)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorMode, rawSetColorMode] = useState<string | undefined>(undefined)

  useEffect(() => {
    const root = document.documentElement

    const initialColorValue = root.style.getPropertyValue(INITIAL_COLOR_MODE_CSS_PROP)

    rawSetColorMode(initialColorValue)
  }, [])

  const contextValue = useMemo(() => {
    function setColorMode(newValue: string) {
      const root = document.documentElement

      localStorage.setItem(COLOR_MODE_KEY, newValue)

      Object.entries(COLORS).forEach(([name, colorByTheme]) => {
        const cssVarName = `--color-${name}`
        root.style.setProperty(cssVarName, colorByTheme[newValue as keyof typeof colorByTheme])
      })

      rawSetColorMode(newValue)
    }

    return {
      colorMode,
      setColorMode,
    }
  }, [colorMode, rawSetColorMode])

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>
}
