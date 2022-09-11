import '@styles/bootstrapCarousel.css'

import { ErrorBoundary, GlobalAlerts, Navbar } from '..'
import dynamic from 'next/dynamic'
import { brandSecondary, brandSuccess, white } from '@getpackup-group/styles'
import { CssReset } from '@getpackup-group/styles'
import {
  borderRadius,
  quadrupleSpacer,
  quarterSpacer,
  threeQuarterSpacer,
} from '@getpackup-group/styles'
import Link from 'next/link'
import React, { FunctionComponent, useEffect } from 'react'
import CookieConsent from 'react-cookie-consent'
import { IconContext } from 'react-icons'
import ReactModal from '../react-modal/ReactModal'
import styled from 'styled-components'
import { UploadTheme } from '@getpackup-group/styles'

const Footer = dynamic(() => import('../footer/Footer'), {
  loading: () => <footer style={{ backgroundColor: brandSecondary, height: '20vh' }} />,
})

const AddToHomeScreenBanner = dynamic(import('./AddToHomeScreenBanner'))

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

interface LayoutProps {
  hideFromCms?: boolean
  children: any // TODO shouldn't be any
}

const Layout: FunctionComponent<LayoutProps> = (props) => {
  useEffect(() => {
    if (!props.hideFromCms) {
      ReactModal.setAppElement('#___gatsby')
    }
  }, [])
  return (
    <>
      <CssReset />
      <UploadTheme />
      <IconContext.Provider value={{ style: { position: 'relative' } }}>
        <LayoutWrapper>
          {!props.hideFromCms && <AddToHomeScreenBanner />}
          {!props.hideFromCms && <Navbar />}
          <PageBody>
            <ErrorBoundary>{props.children}</ErrorBoundary>
          </PageBody>
          {!props.hideFromCms && <GlobalAlerts />}
          {!props.hideFromCms && <Footer />}
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
            <Link href={'/privacy'}>
              <a style={{ color: white, textDecoration: 'underline' }}>Privacy page</a>
            </Link>{' '}
            to learn more.
          </small>
        </CookieConsent>
      </IconContext.Provider>
    </>
  )
}

export default Layout
