import { TripType } from '@packup/common'
import { AppState } from '@packup/redux'
import {
  baseAndAHalfSpacer,
  baseSpacer,
  decupleSpacer,
  doubleSpacer,
  halfSpacer,
} from '@packup/styles'
import { formattedDateRange, trackEvent } from '@packup/utils'
import Link from 'next/link'
import { FunctionComponent, useState } from 'react'
import { FaMapMarkerAlt, FaRegCalendar, FaSignOutAlt, FaTrash } from 'react-icons/fa'
import Skeleton from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
import TextTruncate from 'react-text-truncate'

import {
  Button,
  DropdownMenu,
  FlexContainer,
  Heading,
  HorizontalScroller,
  LeaveTheTripModal,
  Pill,
  TripDeleteModal,
  TripHeaderImage,
  TripMemberAvatars,
} from '../index'

type TripHeaderProps = {
  trip?: TripType
  userIsTripOwner: boolean | undefined
}

export const TripHeader: FunctionComponent<TripHeaderProps> = ({ trip, userIsTripOwner }) => {
  const users = useSelector((state: AppState) => state.firestore.data.users)

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [leaveTripModalIsOpen, setLeaveTripModalIsOpen] = useState(false)

  return (
    <div>
      <TripHeaderImage trip={trip} />

      <FlexContainer justifyContent="space-between" flexWrap="nowrap">
        <Heading as="h3" altStyle noMargin>
          {trip ? trip.name : <Skeleton width={200} />}
        </Heading>
        {trip && (
          <Link href={`/trips/${trip.tripId}/party`}>
            <>
              <TripMemberAvatars trip={trip} users={users} />
            </>
          </Link>
        )}
      </FlexContainer>

      <FlexContainer justifyContent="flex-start">
        <div style={{ marginRight: halfSpacer, minWidth: decupleSpacer }}>
          {trip ? (
            <>
              <FaRegCalendar />{' '}
              {formattedDateRange(trip.startDate.seconds * 1000, trip.endDate.seconds * 1000)}
            </>
          ) : (
            <Skeleton count={1} />
          )}
        </div>
        <div style={{ minWidth: decupleSpacer }}>
          {trip ? (
            <>
              <FaMapMarkerAlt /> {trip.startingPoint}
            </>
          ) : (
            <Skeleton count={1} />
          )}
        </div>
      </FlexContainer>

      <div>
        {trip ? (
          <p style={{ margin: 0 }}>
            {trip.description && (
              <TextTruncate
                line={2}
                element="small"
                truncateText="…"
                text={trip.description || 'No description provided'}
                containerClassName="truncatedText"
                textTruncateChild={<Link href={`/trips/${trip.tripId}/details`}>Read more</Link>}
              />
            )}
          </p>
        ) : (
          <Skeleton count={2} />
        )}
      </div>

      <div
        style={{
          margin: `${halfSpacer} -${baseSpacer}`,
          paddingLeft: halfSpacer,
        }}
      >
        <HorizontalScroller>
          {trip ? (
            <>
              {trip.tags.map((tag: string) => (
                <Pill key={`${tag}tag`} text={tag} color="neutral" />
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
                  // random widths between 48 and 128
                  width={Math.floor(Math.random() * (128 - 48 + 1) + 48)}
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

      <FlexContainer justifyContent="flex-start">
        {trip ? (
          <>
            <Button
              type="link"
              to={`/trips/${trip.tripId}/details`}
              rightSpacer
              size="small"
              color="tertiary"
              onClick={() =>
                trackEvent('Trip Header Details Link Clicked', {
                  trip,
                })
              }
            >
              Details
            </Button>
            <Button
              type="link"
              to={`/trips/${trip.tripId}/party`}
              rightSpacer
              size="small"
              color="tertiary"
              onClick={() =>
                trackEvent('Trip Header Party Link Clicked', {
                  trip,
                })
              }
            >
              Party
            </Button>

            <TripDeleteModal
              setModalIsOpen={setDeleteModalIsOpen}
              modalIsOpen={deleteModalIsOpen}
              trip={trip}
            />
            <LeaveTheTripModal
              setModalIsOpen={setLeaveTripModalIsOpen}
              modalIsOpen={leaveTripModalIsOpen}
              trip={trip}
            />

            <DropdownMenu>
              {userIsTripOwner ? (
                <button
                  onClick={() => {
                    setDeleteModalIsOpen(true)
                    trackEvent('Trip Header Delete Trip Clicked', {
                      trip,
                    })
                  }}
                  type="button"
                >
                  <FaTrash /> Delete
                </button>
              ) : (
                <button
                  onClick={() => {
                    setLeaveTripModalIsOpen(true)
                    trackEvent('Trip Header Leave The Trip Clicked', {
                      trip,
                    })
                  }}
                  type="button"
                >
                  <FaSignOutAlt /> Leave Trip
                </button>
              )}
            </DropdownMenu>
          </>
        ) : (
          <>
            <Skeleton
              width={100}
              height={doubleSpacer}
              style={{
                marginRight: baseSpacer,
              }}
            />
            <Skeleton
              width={80}
              height={doubleSpacer}
              style={{
                marginRight: baseSpacer,
              }}
            />
            <Skeleton width={50} height={doubleSpacer} />
          </>
        )}
      </FlexContainer>
    </div>
  )
}
