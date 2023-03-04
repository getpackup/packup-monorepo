import { PackingListItemType } from '@packup/common'
import { Box, EditPackingListItem, PageContainer } from '@packup/components'
import { useActiveTrip } from '@packup/hooks'
import { AppState } from '@packup/redux'
import { trackEvent } from '@packup/utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

export default function ChecklistId() {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const users = useSelector((state: AppState) => state.firestore.data.users)
  const activeTrip = useActiveTrip()
  const packingList: PackingListItemType[] = useSelector(
    (state: AppState) => state.firestore.ordered.packingList
  )

  const router = useRouter()
  // the trip ID
  const id = router.query.id as string
  const checklistId = router.query.checklistId as string

  useFirestoreConnect([
    {
      collection: 'trips',
      doc: id,
      storeAs: 'activeTripById',
    },
    {
      collection: 'users',
      where: [
        'uid',
        'in',
        activeTrip && activeTrip.tripMembers && Object.keys(activeTrip.tripMembers).length > 0
          ? Object.keys(activeTrip.tripMembers)
          : [auth?.uid || ''],
      ],
    },
    {
      collection: 'trips',
      doc: id,
      subcollections: [{ collection: 'packing-list' }],
      storeAs: 'packingList',
      orderBy: ['category', 'asc'],
    },
  ])

  if (!id) {
    trackEvent('Trip By Id Had No Id')
    return null
  }

  if (!checklistId) {
    trackEvent('Trip Edit Packing List Item By Id Had No checklistId')
    // TODO: return a better failure state UI here
    return null
  }

  return (
    <>
      <Head>
        <title>Edit Packing List Item | Packup</title>
      </Head>

      <PageContainer>
        <Box>
          <EditPackingListItem
            users={users}
            packingList={packingList || []}
            loggedInUserUid={auth.uid}
            activeTrip={activeTrip}
            checklistId={checklistId}
          />
        </Box>
      </PageContainer>
    </>
  )
}
