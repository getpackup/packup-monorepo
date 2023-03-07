import * as React from 'react'

import { COLORS } from './color'

export function FallbackStyles() {
  const cssVariableString = (colorMode: 'light' | 'dark') =>
    Object.entries(COLORS).reduce(
      (acc, [name, colorByTheme]) => `${acc}\n--color-${name}: ${colorByTheme[colorMode]};`,
      ''
    )

  const wrappedInSelector = `
  [data-theme=dark] { ${cssVariableString('dark')} } 
  [data-theme=light] { ${cssVariableString('light')} }]`

  return <style>{wrappedInSelector}</style>
}

function setInitialColorMode() {
  function getInitialColorMode() {
    const persistedColorPreference = localStorage.getItem('color-mode')
    const hasPersistedPreference = typeof persistedColorPreference === 'string'

    /**
     * If the user has explicitly chosen light or dark,
     * use it. Otherwise, this value will be null.
     */
    if (hasPersistedPreference) {
      return persistedColorPreference
    }

    // If there is no saved preference, use a media query
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const hasMediaQueryPreference = typeof mql.matches === 'boolean'

    if (hasMediaQueryPreference) {
      return mql.matches ? 'dark' : 'light'
    }

    // default to 'light'.
    return 'light'
  }

  const colorMode = getInitialColorMode()
  const root = document.documentElement
  // dont have access to INITIAL_COLOR_MODE_CSS_PROP yet, so use the same string
  root.style.setProperty('--initial-color-mode', colorMode)

  document.documentElement.setAttribute('data-theme', colorMode)
}

// our function needs to be a string
export function MagicScriptTag() {
  const blockingSetInitialColorMode = `(function() {
	  ${setInitialColorMode.toString()}
	  setInitialColorMode();
  })()`

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: blockingSetInitialColorMode }} />
}
