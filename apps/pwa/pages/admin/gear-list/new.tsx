import { GearItemType } from '@packup/common'
import { Box, GearListItemForm, Heading, PageContainer } from '@packup/components'
import { gearListKeys } from '@packup/utils'
import Head from 'next/head'
import React from 'react'

export default function NewGearListItem() {
  const initialValues = {
    id: '',
    name: '',
    category: '',
    essential: false,
  }

  gearListKeys.forEach((item) => {
    initialValues[item] = false
  })

  return (
    <PageContainer>
      <Box>
        <Head>
          <title>New Gear Item</title>
        </Head>
        <Heading>New Item</Heading>
        <GearListItemForm initialValues={initialValues as GearItemType} type="new" />
      </Box>
    </PageContainer>
  )
}
