import {
  MAX_TRIP_PARTY_SIZE,
  TripMember,
  TripMemberStatus,
  TripType,
  UserType,
} from '@packup/common'
import {
  Box,
  HorizontalRule,
  IconWrapper,
  Modal,
  PageContainer,
  Pill,
  SendInviteForm,
  TripNavigation,
  UserMediaObject,
  UserSearch,
  LeaveTheTripModal,
  ReinviteUserToTripModal,
  RemoveUserFromTripModal,
} from '@packup/components'
import toast from 'react-hot-toast'
import { AppState } from '@packup/redux'
import { brandDanger, baseSpacer, halfSpacer } from '@packup/styles'
import { isUserTripOwner, sendTripInvitationEmail, trackEvent } from '@packup/utils'
import axios from 'axios'
import Head from 'next/head'
import { FunctionComponent, useState } from 'react'
import { FaSignOutAlt, FaUserPlus, FaUserTimes } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import ReactTooltip from 'react-tooltip'

type TripPartyProps = {
  activeTrip?: TripType
}

export const TripParty: FunctionComponent<TripPartyProps> = ({ activeTrip }) => {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const profile = useSelector((state: AppState) => state.firebase.profile)
  const users = useSelector((state: AppState) => state.firestore.data['users'])
  const [isSearchBarDisabled, setIsSearchBarDisabled] = useState(false)
  const [showManualShareModal, setShowManualShareModal] = useState<boolean>(false)
  const [leaveTripModalIsOpen, setLeaveTripModalIsOpen] = useState(false)
  const [removeUserModalIsOpen, setRemoveUserModalIsOpen] = useState(false)
  const [userToRemove, setUserToRemove] = useState('')
  const [reinviteUserModalIsOpen, setReinviteUserModalIsOpen] = useState(false)
  const [userToReinvite, setUserToReinvite] = useState<TripMember | undefined>(undefined)

  const firebase = useFirebase()

  const updateTrip = (memberId: string, memberEmail: string, greetingName: string) => {
    // Object.values(acceptedTripMembersOnly(activeTrip)).length + 1 accounts for async data updates
    if (
      activeTrip?.tripMembers &&
      Object.values(activeTrip?.tripMembers).length + 1 > MAX_TRIP_PARTY_SIZE
    ) {
      setIsSearchBarDisabled(true)
      // send us a slack message so we can follow up
      axios.get(
        process.env.NODE_ENV === 'production'
          ? `https://us-central1-getpackup.cloudfunctions.net/notifyOnTripPartyMaxReached?tripId=${activeTrip.tripId}&owner=${auth.uid}`
          : `https://us-central1-packup-test-fc0c2.cloudfunctions.net/notifyOnTripPartyMaxReached?tripId=${activeTrip.tripId}&owner=${auth.uid}`
      )
      toast.error(`At this time, Trip Parties are limited to ${MAX_TRIP_PARTY_SIZE} people.`)

      trackEvent('Trip Party Max Reached', {
        tripId: activeTrip.tripId,
        owner: auth.uid,
      })
      return
    }
    if (activeTrip) {
      setIsSearchBarDisabled(true)
      firebase
        .firestore()
        .collection('trips')
        .doc(activeTrip.tripId)
        .update({
          [`tripMembers.${memberId}`]: {
            uid: memberId,
            invitedAt: new Date(),
            status: TripMemberStatus.Pending,
            invitedBy: auth.uid,
          },
        })
        .then(() => {
          sendTripInvitationEmail({
            tripId: activeTrip.tripId,
            invitedBy: profile.username,
            email: memberEmail,
            greetingName: greetingName || '',
          })
          setIsSearchBarDisabled(false)
        })
        .catch((err) => {
          trackEvent('Trip Party Member Add Failure', {
            ...activeTrip,
            userAttemptedToAdd: memberId,
            error: err,
          })
          toast.error(err.message)
          setIsSearchBarDisabled(false)
        })
    }
  }

  const removeUserIconButton = (uid: string) => (
    <IconWrapper
      onClick={() => {
        setUserToRemove(uid)
        setRemoveUserModalIsOpen(true)
      }}
      data-tip="Remove User from Trip"
      data-for="removeUser"
    >
      <FaUserTimes color={brandDanger} />
      {!removeUserModalIsOpen && (
        <ReactTooltip
          id="removeUser"
          place="top"
          type="dark"
          effect="solid"
          className="tooltip customTooltip"
          delayShow={500}
        />
      )}
    </IconWrapper>
  )

  const readdUserIconButton = (member: TripMember) => (
    <IconWrapper
      onClick={() => {
        setUserToReinvite(member)
        setReinviteUserModalIsOpen(true)
      }}
      data-tip="Re-invite User to Trip"
      data-for="reinviteUser"
    >
      <FaUserPlus />
      {!reinviteUserModalIsOpen && (
        <ReactTooltip
          id="reinviteUser"
          place="top"
          type="dark"
          effect="solid"
          className="tooltip customTooltip"
          delayShow={500}
        />
      )}
    </IconWrapper>
  )

  const leaveTripButton = () => (
    <IconWrapper
      onClick={() => setLeaveTripModalIsOpen(true)}
      data-tip="Leave Trip"
      data-for="leaveTrip"
    >
      <FaSignOutAlt color={brandDanger} />
      <ReactTooltip
        id="leaveTrip"
        place="top"
        type="dark"
        effect="solid"
        className="tooltip customTooltip"
        delayShow={500}
      />
    </IconWrapper>
  )

  const getStatusPill = (uid: string) => {
    const isOwner = isUserTripOwner(activeTrip, auth.uid)
    const matchingTripMember =
      activeTrip?.tripMembers &&
      Object.values(activeTrip?.tripMembers)?.find((member) => member.uid === uid)
    if (matchingTripMember?.status === TripMemberStatus.Pending) {
      return (
        <>
          {isOwner ? removeUserIconButton(matchingTripMember.uid) : null}
          <Pill text={TripMemberStatus.Pending} color="neutral" />
        </>
      )
    }
    if (matchingTripMember?.status === TripMemberStatus.Owner) {
      return <Pill text="Creator" color="primary" />
    }
    if (matchingTripMember?.status === TripMemberStatus.Accepted) {
      return (
        <>
          {isOwner && removeUserIconButton(matchingTripMember.uid)}
          {!isOwner && uid === auth.uid && leaveTripButton()}
          <Pill text="Member" color="success" />
        </>
      )
    }
    if (matchingTripMember?.status === TripMemberStatus.Declined) {
      return (
        <>
          {isOwner ? readdUserIconButton(matchingTripMember) : null}
          <Pill text={TripMemberStatus.Declined} color="danger" />
        </>
      )
    }
    if (matchingTripMember?.status === TripMemberStatus.Removed) {
      return (
        <>
          {isOwner ? readdUserIconButton(matchingTripMember) : null}
          <Pill text={TripMemberStatus.Removed} color="danger" />
        </>
      )
    }
    return undefined
  }

  return (
    <>
      <Head>
        <title>Trip Party | Packup</title>
      </Head>
      <Modal isOpen={showManualShareModal} toggleModal={() => setShowManualShareModal(false)}>
        <SendInviteForm />
      </Modal>

      <PageContainer>
        {typeof activeTrip !== 'undefined' && (
          <>
            <TripNavigation
              activeTrip={activeTrip}
              userIsTripOwner={isUserTripOwner(activeTrip, auth.uid)}
            />
            <LeaveTheTripModal
              setModalIsOpen={setLeaveTripModalIsOpen}
              modalIsOpen={leaveTripModalIsOpen}
              trip={activeTrip}
            />
            {userToRemove !== '' && (
              <RemoveUserFromTripModal
                setModalIsOpen={() => {
                  setRemoveUserModalIsOpen(false)
                  setUserToRemove('')
                }}
                modalIsOpen={removeUserModalIsOpen}
                trip={activeTrip}
                uid={userToRemove}
              />
            )}
            {userToReinvite !== undefined &&
              reinviteUserModalIsOpen &&
              users[userToReinvite.uid] &&
              users[userToReinvite.uid]?.email &&
              users[userToReinvite.uid]?.displayName &&
              users[userToReinvite.uid].email !== '' && (
                <ReinviteUserToTripModal
                  setModalIsOpen={() => {
                    setReinviteUserModalIsOpen(false)
                    setUserToReinvite(undefined)
                  }}
                  modalIsOpen={reinviteUserModalIsOpen}
                  trip={activeTrip}
                  tripMember={userToReinvite}
                  profile={profile}
                  tripMemberEmail={users[userToReinvite.uid].email}
                  greetingName={users[userToReinvite.uid].displayName}
                />
              )}

            <Box>
              <UserSearch
                activeTrip={activeTrip}
                isSearchBarDisabled={isSearchBarDisabled}
                updateTrip={updateTrip}
              />

              {Object.values(activeTrip.tripMembers).length > 0 ? (
                <>
                  <p>
                    <strong>Trip Party</strong>
                  </p>
                  <div
                    style={{
                      margin: `${halfSpacer} 0 ${baseSpacer}`,
                    }}
                  >
                    {Object.values(activeTrip?.tripMembers)
                      .sort((a, b) => a.invitedAt.seconds - b.invitedAt.seconds)
                      .map((tripMember, index) => {
                        const matchingUser: UserType =
                          users && users[tripMember.uid] ? users[tripMember.uid] : undefined
                        if (!matchingUser) return null
                        return (
                          <div key={matchingUser.uid}>
                            <UserMediaObject
                              user={matchingUser}
                              showSecondaryContent
                              action={getStatusPill(matchingUser.uid)}
                            />
                            {index !== Object.keys(activeTrip?.tripMembers).length - 1 && (
                              <HorizontalRule compact />
                            )}
                          </div>
                        )
                      })}
                  </div>
                </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <p>
                    <strong>No trip party members yet!</strong>
                  </p>
                  <p>
                    While going alone is definitely rad, if you are going with others, find them
                    above and add them to your trip.
                  </p>
                </div>
              )}
            </Box>
          </>
        )}
      </PageContainer>
    </>
  )
}

export default TripParty
