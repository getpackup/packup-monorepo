import { TripType } from '@packup/common'
import { Button, Column, Heading, Modal, Row } from '@packup/components'
import toast from 'react-hot-toast'
import { trackEvent } from '@packup/utils'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'
import { FaTrash } from 'react-icons/fa'
import { useFirebase } from 'react-redux-firebase'

type TripDeleteModalProps = {
  modalIsOpen: boolean
  setModalIsOpen: (val: boolean) => void
  trip: TripType
}

export const TripDeleteModal: FunctionComponent<TripDeleteModalProps> = ({
  modalIsOpen,
  trip,
  setModalIsOpen,
}) => {
  const firebase = useFirebase()

  const router = useRouter()

  const deleteTrip = () => {
    if (trip.tripId) {
      firebase
        .firestore()
        .collection('trips')
        .doc(trip.tripId)
        .update({
          archived: true,
        })
        .then(() => {
          trackEvent('Trip Archived Successfully', { tripId: trip.tripId })
          router.push('/')
        })
        .catch((err) => {
          trackEvent('Trip Archive Failure', { tripId: trip.tripId, error: err })
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
      largePadding
    >
      <Heading>Are you sure?</Heading>
      <p>
        Are you sure you want to delete this trip?{' '}
        {Object.keys(trip.tripMembers).length > 1 &&
          'This will delete the trip for everyone in the trip party. '}
        This action cannot be undone.
      </p>
      <Row>
        <Column xs={6}>
          <Button
            type="button"
            onClick={() => {
              trackEvent('Trip Delete Modal Canceled', { tripId: trip.tripId })
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
            onClick={() => deleteTrip()}
            block
            color="danger"
            iconLeft={<FaTrash />}
          >
            Delete
          </Button>
        </Column>
      </Row>
    </Modal>
  )
}

export default TripDeleteModal
