// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AppState } from '@packup/redux'
import { COLOR_MODE_KEY, COLORS, INITIAL_COLOR_MODE_CSS_PROP } from '@packup/styles'
import { createContext, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

type ContextType = {
  colorMode: string | undefined
  setColorMode: (newValue: string) => void
}

export const ThemeContext = createContext({
  colorMode: undefined,
  setColorMode: () => null,
} as ContextType)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const profile = useSelector((state: AppState) => state.firebase.profile)
  const [colorMode, rawSetColorMode] = useState<string | undefined>(
    profile?.preferences?.theme || undefined
  )

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const body = <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>

  // prevents ssr flash for mismatched dark mode
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>
  }

  return body
}
