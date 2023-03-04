import { Box, Heading, PageContainer } from '@packup/components'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

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
