import Head from 'next/head'
import Link from 'next/link'

import { Box, Heading, PageContainer } from '../components'

export default function AdminIndex() {
  return (
    <PageContainer>
      <Box>
        <Head>
          <title>Admin</title>
        </Head>
        <Heading>Admin</Heading>
        <Link href="/admin/gear-list">Gear List</Link>
      </Box>
    </PageContainer>
  )
}
