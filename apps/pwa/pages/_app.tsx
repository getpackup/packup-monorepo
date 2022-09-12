import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'
import './styles.css'
import { Layout } from '@getpackup-group/components'
import { ReduxWrapper } from '@getpackup-group/redux'

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to pwa!</title>
      </Head>
      <ReduxWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ReduxWrapper>
    </>
  )
}

export default CustomApp
