import { doubleSpacer } from '@packup/styles'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FaArrowRight, FaRedo } from 'react-icons/fa'

import { Box, Button, Column, Heading, PageContainer, Row } from '../index'

export const NoGearCloset = () => {
  const router = useRouter()
  return (
    <PageContainer>
      <Head>
        <title>My Trips | Packup</title>
      </Head>
      <Box>
        <Row>
          <Column md={8} mdOffset={2}>
            <div style={{ textAlign: 'center', margin: doubleSpacer }}>
              <Heading align="center">New here? 🤔</Heading>
              <p>
                Looks like you don&apos;t have any gear in your gear closet, or any trips planned
                yet!
              </p>
              <Button type="link" to="/onboarding" iconRight={<FaArrowRight />} color="success">
                Let&apos;s Get Started!
              </Button>
              <br />
              <br />
              <br />
              <p>
                <small>
                  Already started your gear closet, but still seeing this? Let&apos;s try to load
                  your data again.
                </small>
              </p>
              <Button
                type="button"
                onClick={() => router.reload()}
                color="tertiary"
                iconLeft={<FaRedo />}
              >
                Refresh
              </Button>
            </div>
          </Column>
        </Row>
      </Box>
    </PageContainer>
  )
}
