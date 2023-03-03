// offline page for Next PWA package
// https://github.com/shadowwalker/next-pwa
import { Box, Column, Heading, PageContainer, Row } from '@packup/components'
import { trackEvent } from '@packup/utils'
import Head from 'next/head'
import React, { useEffect } from 'react'

export default function NotFound() {
  useEffect(() => {
    trackEvent('Offline Page Viewed')
  }, [])
  return (
    <PageContainer withVerticalPadding>
      <Head>
        <title>Offline | Packup</title>
      </Head>
      <Row>
        <Column md={8} mdOffset={2}>
          <Box>
            <Heading>Looks like you are offline</Heading>
            <p>
              Hopefully you are out doing some epic adventure, but until you get back to service,
              there&apos;s not much we can do here unfortunately.
            </p>
          </Box>
        </Column>
      </Row>
    </PageContainer>
  )
}
