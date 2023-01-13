import React, { useMemo } from 'react'
import { minify } from 'terser'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@getpackup-group/utils'
import { ReduxWrapper } from '@getpackup-group/redux'
import { HelmetProvider } from 'react-helmet-async'
import 'firebase/app'
import 'firebase/auth'
import styled, { CSSProperties } from 'styled-components'
import CookieConsent from 'react-cookie-consent'
import { IconContext } from 'react-icons'
import {
  baseSpacer,
  borderRadius,
  brandSecondary,
  brandSuccess,
  breakpoints,
  COLORS,
  COLOR_MODE_KEY,
  CssReset,
  INITIAL_COLOR_MODE_CSS_PROP,
  offWhite,
  quadrupleSpacer,
  quarterSpacer,
  threeQuarterSpacer,
  UploadTheme,
  white,
  z1Shadow,
} from '@getpackup-group/styles'
import { AddToHomeScreenBanner, GlobalAlerts, Navbar, Footer } from '@getpackup-group/components'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Modal from 'react-modal'
import '../webfonts.css'

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

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
`

const PageBody = styled.main`
  flex: 1;
  padding-top: calc(${quadrupleSpacer} + env(safe-area-inset-top));
  padding-bottom: calc(${quadrupleSpacer} + env(safe-area-inset-bottom));
`

const AppContainer = styled.div`
  padding: ${baseSpacer} 0;
  margin-right: auto;
  margin-left: auto;
  max-width: ${breakpoints.xl};
  background-color: ${offWhite};
  // background-color: var(--color-background);
  min-height: 100vh;
  box-shadow: ${z1Shadow};
`

Modal.setAppElement('#__next')

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  const { pathname } = router

  const iconStyle = useMemo(() => ({ style: { position: 'relative' } }), [])

  return (
    <>
      <Head>
        <title>Expert packing lists for camping and outdoor adventure | Packup</title>
        <FallbackStyles />
        <MagicScriptTag />
      </Head>
      <ReduxWrapper>
        <HelmetProvider>
          <ThemeProvider>
            <CssReset />
            <UploadTheme />
            <IconContext.Provider value={iconStyle as CSSProperties}>
              <LayoutWrapper>
                <AddToHomeScreenBanner />
                <Navbar />
                <PageBody>
                  <AppContainer>
                    <Component {...pageProps} />
                  </AppContainer>
                </PageBody>
                <GlobalAlerts />
                {pathname !== '/' && <Footer />}
              </LayoutWrapper>

              <CookieConsent
                location="bottom"
                buttonText="Accept"
                cookieName="packup-gdpr-google-analytics"
                style={{
                  backgroundColor: brandSecondary,
                }}
                buttonStyle={{
                  backgroundColor: brandSuccess,
                  color: white,
                  fontSize: '80%',
                  borderRadius,
                  fontWeight: 'bold',
                  padding: `${quarterSpacer} ${threeQuarterSpacer}`,
                }}
              >
                <small>
                  This site uses cookies to enhance the user experience. Visit our{' '}
                  <Link href="/privacy" style={{ color: white, textDecoration: 'underline' }}>
                    Privacy page
                  </Link>{' '}
                  to learn more.
                </small>
              </CookieConsent>
            </IconContext.Provider>
          </ThemeProvider>
        </HelmetProvider>
      </ReduxWrapper>
    </>
  )
}

export default App
