import React from 'react'
import { minify } from 'terser'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Layout } from '@getpackup-group/components'
import { ReduxWrapper } from '@getpackup-group/redux'
import { HelmetProvider } from 'react-helmet-async'
import 'firebase/app'
import 'firebase/auth'
import { COLORS, COLOR_MODE_KEY, INITIAL_COLOR_MODE_CSS_PROP } from '@getpackup-group/styles'

function setColorsByTheme() {
  const colors = '🌈'
  const colorModeKey = '🔑'
  const colorModeCssProp = '⚡️'

  const mql = window.matchMedia('(prefers-color-scheme: dark)')
  const prefersDarkFromMQ = mql.matches
  const persistedPreference = localStorage.getItem(colorModeKey)

  let colorMode = 'light'

  const hasUsedToggle = typeof persistedPreference === 'string'

  if (hasUsedToggle) {
    colorMode = persistedPreference
  } else {
    colorMode = prefersDarkFromMQ ? 'dark' : 'light'
  }

  // eslint-disable-next-line prefer-const
  let root = document.documentElement

  root.style.setProperty(colorModeCssProp, colorMode)

  Object.entries(colors).forEach(([name, colorByTheme]) => {
    const cssVarName = `--color-${name}`

    root.style.setProperty(cssVarName, colorByTheme[colorMode])
  })
}

function MagicScriptTag() {
  const boundFn = String(setColorsByTheme)
    .replace("'🌈'", JSON.stringify(COLORS))
    .replace('🔑', COLOR_MODE_KEY)
    .replace('⚡️', INITIAL_COLOR_MODE_CSS_PROP)

  let calledFunction = `(${boundFn})()`

  minify(calledFunction).then((res) => {
    calledFunction = res.code
  })

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />
}

/**
 * If the user has JS disabled, the injected script will never fire!
 * This means that they won't have any colors set, everything will be default
 * black and white.
 * We can solve for this by injecting a `<style>` tag into the head of the
 * document, which sets default values for all of our colors.
 * Only light mode will be available for users with JS disabled.
 */
function FallbackStyles() {
  // Create a string holding each CSS variable:
  /*
    `--color-text: black;
    --color-background: white;`
  */

  const cssVariableString = Object.entries(COLORS).reduce(
    (acc, [name, colorByTheme]) => `${acc}\n--color-${name}: ${colorByTheme.light};`,
    ''
  )

  const wrappedInSelector = `html { ${cssVariableString} }`

  return <style>{wrappedInSelector}</style>
}

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to pwa!</title>
        <FallbackStyles />
        <MagicScriptTag />
      </Head>
      <ReduxWrapper>
        <HelmetProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </HelmetProvider>
      </ReduxWrapper>
    </>
  )
}

export default App
