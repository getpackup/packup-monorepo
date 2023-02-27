import { TripMember, TripMemberStatus, TripType } from '@packup/common'
import { Button, Column, Heading, Modal, Row } from '@packup/components'
import toast from 'react-hot-toast'
import { sendTripInvitationEmail, trackEvent } from '@packup/utils'
import { FunctionComponent } from 'react'
import { FaCheck } from 'react-icons/fa'
import { useFirebase } from 'react-redux-firebase'

type ReinviteUserToTripModalProps = {
  modalIsOpen: boolean
  setModalIsOpen: (val: boolean) => void
  trip: TripType
  tripMember: TripMember
  profile: any
  tripMemberEmail: string
  greetingName: string
}

export const ReinviteUserToTripModal: FunctionComponent<ReinviteUserToTripModalProps> = ({
  modalIsOpen,
  trip,
  setModalIsOpen,
  tripMember,
  profile,
  tripMemberEmail,
  greetingName,
}) => {
  const firebase = useFirebase()

  const reinviteToTrip = () => {
    if (trip.tripId && tripMember) {
      firebase
        .firestore()
        .collection('trips')
        .doc(trip.tripId)
        .update({
          [`tripMembers.${tripMember.uid}`]: {
            uid: tripMember.uid,
            invitedAt: trip?.tripMembers[`${tripMember.uid}`].invitedAt,
            removedAt: new Date(),
            status: TripMemberStatus.Pending,
          },
        })
        .then(() => {
          trackEvent('Reinvited User to Trip Successfully', {
            tripId: trip.tripId,
            uid: tripMember.uid,
          })

          sendTripInvitationEmail({
            tripId: trip.tripId,
            invitedBy: profile.username,
            email: tripMemberEmail,
            greetingName,
          })

          setModalIsOpen(false)
        })
        .catch((err) => {
          setModalIsOpen(false)
          trackEvent('Reinvited User to Trip Failure', {
            tripId: trip.tripId,
            uid: tripMember.uid,
            error: err,
          })
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
      <Heading>Are you sure?</Heading>
      <p>Are you sure you want to re-invite this user?</p>
      <Row>
        <Column xs={6}>
          <Button
            type="button"
            onClick={() => {
              trackEvent('Reinvite User to Trip Modal Canceled', {
                tripId: trip.tripId,
                uid: tripMember.uid,
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
            onClick={() => reinviteToTrip()}
            block
            color="success"
            iconLeft={<FaCheck />}
          >
            Re-invite
          </Button>
        </Column>
      </Row>
    </Modal>
  )
}

export default ReinviteUserToTripModal
