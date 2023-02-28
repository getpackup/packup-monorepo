import { TripMemberStatus, TripType } from '@packup/common'
import {
  Button,
  Column,
  FlexContainer,
  Heading,
  HorizontalScroller,
  Pill,
  Row,
  TripHeaderImage,
  TripMemberAvatars,
} from '@packup/components'
import toast from 'react-hot-toast'
import { AppState } from '@packup/redux'
import {
  white,
  baseBorderStyle,
  baseAndAHalfSpacer,
  baseSpacer,
  halfSpacer,
  quarterSpacer,
  boxShadow,
  z1Shadow,
  boxShadowHover,
  doubleSpacer,
} from '@packup/styles'
import { trackEvent, formattedDate, formattedDateRange } from '@packup/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent, useMemo } from 'react'
import { FaCheck, FaMapMarkerAlt, FaRegCalendar, FaTimes } from 'react-icons/fa'
import Skeleton from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase'
import styled from 'styled-components'

type TripCardProps = {
  trip?: TripType
  isPending?: boolean
  onClick?: () => void
}

const StyledTripWrapper = styled.div<{ isPending?: boolean }>`
  padding: ${baseSpacer};
  border-radius: ${doubleSpacer};
  // fix for safari not clipping with border-radius
  -webkit-transform: translateZ(0);
  overflow: hidden;
  margin-bottom: ${doubleSpacer};
  // border: ${baseBorderStyle};
  cursor: ${(props) => (props.isPending ? 'initial' : 'pointer')};
  background-color: ${white};
  box-shadow: ${boxShadow};
  // background-color: var(--color-backgroundAlt);

  &:hover {
    box-shadow: ${boxShadowHover};
  }
`

const StyledLineItem = styled.div`
  margin-bottom: ${halfSpacer};
`

export const TripCard: FunctionComponent<TripCardProps> = ({ trip, isPending, onClick }) => {
  const users = useSelector((state: AppState) => state.firestore.data['users'])
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const firebase = useFirebase()
  const dispatch = useDispatch()
  const router = useRouter()

  useFirestoreConnect([
    {
      collection: 'users',
      where: [
        'uid',
        'in',
        trip && trip.tripMembers && Object.keys(trip.tripMembers)
          ? Object.keys(trip.tripMembers)
          : [auth?.uid || ''],
      ],
    },
  ])

  const acceptInvitation = () => {
    if (trip) {
      firebase
        .firestore()
        .collection('trips')
        .doc(trip.tripId)
        .update({
          [`tripMembers.${auth.uid}`]: {
            uid: auth.uid,
            invitedAt: trip?.tripMembers[`${auth.uid}`].invitedAt,
            acceptedAt: new Date(),
            status: TripMemberStatus.Accepted,
          },
        })
        .then(() => {
          trackEvent('Trip Party Member Accepted', {
            ...trip,
            acceptedMember: auth.uid,
          })
          toast.success(`Excellent! Let's start thinking about what you'll need to bring next 🤙`)
          router.push(`/trips/${trip.tripId}/generator`)
        })
        .catch((err) => {
          trackEvent('Trip Party Member Accept Failure', {
            ...trip,
            acceptedMember: auth.uid,
            error: err,
          })
          toast.error(err.message)
        })
    }
  }

  const declineInvitation = () => {
    if (trip) {
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
          trackEvent('Trip Party Member Declined', {
            ...trip,
            declinedMember: auth.uid,
          })
          toast.success(`Bummer... You have successfully declined to go on the trip 😔`)
        })
        .catch((err) => {
          trackEvent('Trip Party Member Decline Failure', {
            ...trip,
            declinedMember: auth.uid,
            error: err,
          })
          toast.error(err.message)
        })
    }
  }

  const getInvitedByName = useMemo(() => {
    let inviter: string | undefined

    // need to wait for trip users to be loaded in redux, not just logged in user
    if (users && Object.keys(users).length > 1 && trip) {
      if (trip && trip.tripMembers && Object.keys(trip.tripMembers).length > 0) {
        if (
          auth.uid &&
          trip.tripMembers[auth.uid].invitedBy &&
          typeof trip.tripMembers[auth.uid].invitedBy === 'string'
        ) {
          inviter = users[`${trip.tripMembers[auth.uid].invitedBy}`]?.displayName || undefined
        } else {
          const owner =
            trip.owner ||
            Object.values(trip.tripMembers).find(
              (member) => member.status === TripMemberStatus.Owner
            )?.uid
          inviter = owner ? users[owner]?.displayName : undefined
        }
      }
    }

    return inviter ? `You've been invited by ${inviter}` : null
  }, [trip, users])

  return (
    <StyledTripWrapper isPending={isPending} onClick={onClick}>
      <TripHeaderImage trip={trip} />

      <FlexContainer justifyContent="space-between" flexWrap="nowrap">
        <Heading as="h3" altStyle>
          {trip && trip.name ? (
            <>
              {isPending ? (
                trip.name
              ) : (
                <Link href={`/trips/${trip.tripId}/`}>
                  <a onClick={() => trackEvent('Trip Card Heading Link Clicked', { trip })}>
                    {trip.name}
                  </a>
                </Link>
              )}
            </>
          ) : (
            <Skeleton width={200} />
          )}
        </Heading>

        {trip && <TripMemberAvatars trip={trip} users={users} />}
      </FlexContainer>

      <StyledLineItem>
        <FlexContainer flexWrap="nowrap" alignItems="flex-start" justifyContent="flex-start">
          <FaRegCalendar style={{ marginRight: halfSpacer, top: quarterSpacer, flexShrink: 0 }} />
          {trip && trip.startDate ? (
            <>{formattedDateRange(trip.startDate.seconds * 1000, trip.endDate.seconds * 1000)}</>
          ) : (
            <div style={{ flex: 1 }}>
              <Skeleton count={1} width={`${Math.random() * (70 - 20) + 20}%`} />
            </div>
          )}
        </FlexContainer>
      </StyledLineItem>

      <StyledLineItem>
        <FlexContainer flexWrap="nowrap" alignItems="flex-start" justifyContent="flex-start">
          <FaMapMarkerAlt style={{ marginRight: halfSpacer, top: quarterSpacer, flexShrink: 0 }} />
          {trip && trip.startingPoint ? (
            trip.startingPoint
          ) : (
            <div style={{ flex: 1 }}>
              <Skeleton count={1} width={`${Math.random() * (90 - 30) + 30}%`} />
            </div>
          )}
        </FlexContainer>
      </StyledLineItem>

      <div
        style={{
          margin: `${halfSpacer} -${baseSpacer}`,
          paddingLeft: halfSpacer,
        }}
      >
        <HorizontalScroller>
          {trip && trip.tags && trip.tags.length > 0 ? (
            <>
              {trip.tags.map((tag: string) => (
                <li key={`${tag}tag`}>
                  <Pill text={tag} color="neutral" />
                </li>
              ))}
            </>
          ) : (
            <>
              {/* Generate some tag placeholders and make widths dynamic with Math */}
              {Array.from({
                length: 7,
              }).map((_, i) => (
                <Skeleton
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  // random widths between 48 and 128px
                  width={Math.floor(Math.random() * (128 - 48) + 48)}
                  height={baseAndAHalfSpacer}
                  style={{
                    marginRight: halfSpacer,
                    borderRadius: baseAndAHalfSpacer,
                  }}
                />
              ))}
            </>
          )}
        </HorizontalScroller>
      </div>

      {isPending && trip && (
        <>
          {getInvitedByName && (
            <p>
              <strong>{getInvitedByName}</strong>
            </p>
          )}
          <Row>
            <Column xs={6}>
              <Button
                type="button"
                block
                color="success"
                iconLeft={<FaCheck />}
                onClick={acceptInvitation}
              >
                Accept
              </Button>
            </Column>
            <Column xs={6}>
              <Button
                type="button"
                block
                color="danger"
                iconLeft={<FaTimes />}
                onClick={declineInvitation}
              >
                Decline
              </Button>
            </Column>
          </Row>
        </>
      )}
    </StyledTripWrapper>
  )
}
