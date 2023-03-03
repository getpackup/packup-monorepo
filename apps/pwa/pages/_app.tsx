import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa'
import React, { useMemo } from 'react'
import { minify } from 'terser'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@packup/utils'
import { ReduxWrapper } from '@packup/redux'
import styled, { CSSProperties } from 'styled-components'
import CookieConsent from 'react-cookie-consent'
import { IconContext } from 'react-icons'
import {
  borderRadius,
  brandDanger,
  brandInfo,
  brandSecondary,
  brandSuccess,
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
} from '@packup/styles'
import {
  AddToHomeScreenBanner,
  Navbar,
  FeedbackModal,
  Footer,
  ErrorBoundary,
} from '@packup/components'
import Link from 'next/link'
import Modal from 'react-modal'
import '../webfonts.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'

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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`

const PageBody = styled.main`
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: calc(${quadrupleSpacer} + env(safe-area-inset-top));
  padding-bottom: calc(${quadrupleSpacer} + env(safe-area-inset-bottom));
`

const AppContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  background-color: ${offWhite};
  // background-color: var(--color-background);
  min-height: 100vh;
`

Modal.setAppElement('#__next')

function App({ Component, pageProps }: AppProps) {
  const iconStyle = useMemo(() => ({ style: { position: 'relative' } }), [])

  return (
    <>
      <Head>
        <title>Packup</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <FallbackStyles />
        <MagicScriptTag />
      </Head>
      <Script id="googleMapsLoaded">{`window.googleMapsLoaded = function() {}`}</Script>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NX_GOOGLE_MAPS_API_KEY}&libraries=places&callback=googleMapsLoaded`}
      />
      <ReduxWrapper>
        <ThemeProvider>
          <CssReset />
          <UploadTheme />
          <IconContext.Provider value={iconStyle as CSSProperties}>
            <LayoutWrapper>
              <AddToHomeScreenBanner />
              <Navbar />
              <PageBody>
                <AppContainer>
                  <ErrorBoundary>
                    <Component {...pageProps} />
                    <FeedbackModal />
                  </ErrorBoundary>
                </AppContainer>
              </PageBody>
              <Footer />
            </LayoutWrapper>
            <Toaster
              position="bottom-right"
              toastOptions={{
                success: {
                  style: {
                    backgroundColor: brandSuccess,
                    color: white,
                  },
                  icon: <FaCheckCircle size={quadrupleSpacer} />,
                },
                error: {
                  style: {
                    backgroundColor: brandDanger,
                    color: white,
                  },
                  icon: <FaExclamationCircle size={quadrupleSpacer} />,
                },
                blank: {
                  style: {
                    backgroundColor: brandInfo,
                    color: white,
                  },
                  icon: <FaInfoCircle size={quadrupleSpacer} />,
                },
              }}
            />
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
      </ReduxWrapper>
    </>
  )
}

export default App
