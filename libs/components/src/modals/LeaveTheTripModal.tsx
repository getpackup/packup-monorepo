import { PackingListItemType, TripMemberStatus, TripType } from '@packup/common'
import { Button, Column, Heading, Modal, Row } from '@packup/components'
import { AppState } from '@packup/redux'
import toast from 'react-hot-toast'
import { brandInfo } from '@packup/styles'
import { pluralize, trackEvent } from '@packup/utils'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { FaSignOutAlt, FaUsers } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'

type LeaveTheTripModalProps = {
  modalIsOpen: boolean
  setModalIsOpen: (val: boolean) => void
  trip: TripType
}

export const LeaveTheTripModal: FunctionComponent<LeaveTheTripModalProps> = ({
  modalIsOpen,
  trip,
  setModalIsOpen,
}) => {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const packingList: PackingListItemType[] = useSelector(
    (state: AppState) => state.firestore.ordered['packingList']
  )
  const firebase = useFirebase()
  const dispatch = useDispatch()

  const router = useRouter()

  const numberOfUsersSharedItems =
    packingList && packingList.length > 0
      ? packingList.filter(
          (packingListItem: PackingListItemType) =>
            packingListItem &&
            packingListItem.packedBy &&
            packingListItem.packedBy.length > 0 &&
            packingListItem.packedBy.some((item) => item.uid === auth.uid && item.isShared)
        ).length
      : 0

  const leaveTrip = () => {
    if (trip.tripId) {
      firebase
        .firestore()
        .collection('trips')
        .doc(trip.tripId)
        .update({
          [`tripMembers.${auth.uid}`]: {
            uid: auth.uid,
            invitedAt: trip?.tripMembers[`${auth.uid}`].invitedAt,
            declinedAt: new Date(),
            status: TripMemberStatus.Declined,
          },
        })
        .then(() => {
          trackEvent('User Left Trip Successfully', { tripId: trip.tripId, uid: auth.uid })
          router.push('/')
        })
        .catch((err) => {
          trackEvent('User Left Trip Failure', { tripId: trip.tripId, uid: auth.uid, error: err })
          toast.error(err.message)
        })
    }
  }

  return (
    <Modal
      toggleModal={() => {
        setModalIsOpen(false)
      }}
      isOpen={modalIsOpen}
    >
      {numberOfUsersSharedItems > 0 ? (
        <>
          <Heading>You can't go quite yet! 🛑</Heading>
          <p>
            You have <strong>{pluralize('item', numberOfUsersSharedItems)}</strong> that{' '}
            {numberOfUsersSharedItems === 1 ? 'is' : 'are'} marked as{' '}
            {numberOfUsersSharedItems === 1 ? 'a ' : ''}
            <FaUsers color={brandInfo} /> shared group{' '}
            {numberOfUsersSharedItems === 1 ? 'item' : 'items'}. You must reassign or delete{' '}
            {numberOfUsersSharedItems === 1 ? 'that item' : 'those items'} before you can leave the
            trip.
          </p>
          <Row>
            <Column xs={6}>
              <Button
                type="button"
                onClick={() => {
                  trackEvent('Leave The Trip, Has Shared Items Modal Closed', {
                    tripId: trip.tripId,
                    uid: auth.uid,
                    numberOfUsersSharedItems,
                  })
                  setModalIsOpen(false)
                }}
                color="primaryOutline"
                block
              >
                Go Back
              </Button>
            </Column>
          </Row>
        </>
      ) : (
        <>
          <Heading>Are you sure?</Heading>
          <p>Are you sure you want to leave this trip? This action cannot be undone.</p>
          <Row>
            <Column xs={6}>
              <Button
                type="button"
                onClick={() => {
                  trackEvent('Leave The Trip Modal Canceled', {
                    tripId: trip.tripId,
                    uid: auth.uid,
                  })
                  setModalIsOpen(false)
                }}
                color="primaryOutline"
                block
              >
                Cancel
              </Button>
            </Column>
            <Column xs={6}>
              <Button
                type="button"
                onClick={() => leaveTrip()}
                block
                color="danger"
                iconLeft={<FaSignOutAlt />}
              >
                Leave Trip
              </Button>
            </Column>
          </Row>
        </>
      )}
    </Modal>
  )
}

export default LeaveTheTripModal
