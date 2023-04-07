import '../webfonts.css'
import 'react-loading-skeleton/dist/skeleton.css'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import '../../../libs/components/src/trip/calendarStyles.css'

import { ErrorBoundary, FeedbackModal, Footer, Navbar } from '@packup/components'
import { ReduxWrapper } from '@packup/redux'
import {
  borderRadius,
  brandDanger,
  brandInfo,
  brandSecondary,
  brandSuccess,
  quadrupleSpacer,
  quarterSpacer,
  threeQuarterSpacer,
  tripleSpacer,
  UploadTheme,
  white,
} from '@packup/styles'
import { ThemeProvider, trackEvent } from '@packup/utils'
import { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import Script from 'next/script'
import { useMemo } from 'react'
import CookieConsent from 'react-cookie-consent'
import { Toaster } from 'react-hot-toast'
import { IconContext } from 'react-icons'
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa'
import { SkeletonTheme } from 'react-loading-skeleton'
import Modal from 'react-modal'
import styled, { CSSProperties } from 'styled-components'

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
`

const PageBody = styled.main`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: calc(${tripleSpacer} + env(safe-area-inset-top));
  padding-bottom: calc(${tripleSpacer} + env(safe-area-inset-bottom));
`

const AppContainer = styled.div`
  margin-right: auto;
  margin-left: auto;
  background-color: var(--color-background);
  min-height: 100vh;
`

Modal.setAppElement('#__next')

function App({ Component, pageProps }: AppProps) {
  const iconStyle = useMemo(() => ({ style: { position: 'relative' } }), [])

  return (
    <>
      <Head>
        <title>Packup</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>
      <Script id="googleMapsLoaded">{`window.googleMapsLoaded = function() {}`}</Script>
      <Script
        strategy="lazyOnload"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NX_GOOGLE_MAPS_API_KEY}&libraries=places&callback=googleMapsLoaded`}
      />
      <ReduxWrapper>
        <ThemeProvider>
          <UploadTheme />
          <IconContext.Provider value={iconStyle as CSSProperties}>
            <SkeletonTheme
              baseColor="var(--color-loading)"
              highlightColor="var(--color-loadingHighlight)"
            >
              <LayoutWrapper>
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
            </SkeletonTheme>
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
              onAccept={() => {
                trackEvent('GDPR', { action: 'accept' })
              }}
              onDecline={() => {
                trackEvent('GDPR', { action: 'decline' })
              }}
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
