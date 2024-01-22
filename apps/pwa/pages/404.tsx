import { trackEvent } from '@packup/utils'
import Head from 'next/head'

import { Box, Button, Column, Heading, PageContainer, Row } from '../components'

export default function NotFound() {
  return (
    <PageContainer withVerticalPadding>
      <Head>
        <title>Page Not Found | Packup</title>
      </Head>
      <Row>
        <Column md={8} mdOffset={2}>
          <Box>
            <Heading>Sorry, something went wrong.</Heading>
            <p>
              We could not find the page you were looking for. Please try again or visit the home
              page.
            </p>
            <Button
              type="link"
              to="/"
              color="primary"
              onClick={() => trackEvent('404 Home Button Clicked')}
            >
              Home
            </Button>
          </Box>
        </Column>
      </Row>
    </PageContainer>
  )
}
