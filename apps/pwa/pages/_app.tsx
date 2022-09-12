import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import './styles.css'
import { Layout } from '@getpackup-group/components'
import { ReduxWrapper } from '@getpackup-group/redux'
import { HelmetProvider } from 'react-helmet-async'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to pwa!</title>
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
