import { GearItemType } from '@packup/common'
import {
  Box,
  Button,
  GearListItemForm,
  Heading,
  LoadingPage,
  PageContainer,
} from '@packup/components'
import { AppState } from '@packup/redux'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FaChevronLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase'

export default function EditGearListItem() {
  const gear = useSelector((state: AppState) => state.firestore.ordered.gear)
  useFirestoreConnect([{ collection: 'gear' }])

  const router = useRouter()

  const id = router.query.id as string

  const activeItem: GearItemType = gear && gear.find((item: GearItemType) => item.id === id)

  const initialValues: GearItemType = activeItem

  return (
    <PageContainer>
      <Box>
        <Head>
          <title>Edit Gear Item</title>
        </Head>
        <Button
          type="button"
          onClick={() => router.back()}
          color="text"
          iconLeft={<FaChevronLeft />}
        >
          Back
        </Button>

        {activeItem && (
          <>
            <Heading>Edit Item</Heading>
            <GearListItemForm initialValues={initialValues} type="edit" />
          </>
        )}
        {(!activeItem || !isLoaded) && <LoadingPage />}
      </Box>
    </PageContainer>
  )
}
