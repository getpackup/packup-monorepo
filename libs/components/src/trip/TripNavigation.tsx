import { TripType } from '@packup/common'
import {
  Breadcrumbs,
  DropdownMenu,
  FlexContainer,
  LeaveTheTripModal,
  TripDeleteModal,
} from '@packup/components'
import { baseSpacer } from '@packup/styles'
import { trackEvent } from '@packup/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent, useState } from 'react'
import { FaInfoCircle, FaRegCheckSquare, FaSignOutAlt, FaTrash, FaUsers } from 'react-icons/fa'

type TripNavigationProps = {
  activeTrip: TripType
  userIsTripOwner: boolean | undefined
}

export const TripNavigation: FunctionComponent<TripNavigationProps> = ({
  activeTrip,
  userIsTripOwner,
}) => {
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [leaveTripModalIsOpen, setLeaveTripModalIsOpen] = useState(false)

  const { pathname } = useRouter()
  const detailspageIsActive = pathname.includes('details')
  const partyPageIsActive = pathname.includes('party')

  return (
    <div style={{ marginBottom: baseSpacer }}>
      <FlexContainer justifyContent="space-between" alignItems="center" flexWrap="nowrap">
        <Breadcrumbs trip={activeTrip} pathname={pathname} />
        <DropdownMenu>
          <Link href={`/trips/${activeTrip.tripId}`}>
            <a
              onClick={() => trackEvent('Trip Nav Packing List Dropdown Link Clicked', activeTrip)}
            >
              <FaRegCheckSquare /> Packing List
            </a>
          </Link>
          {partyPageIsActive && (
            <Link href={`/trips/${activeTrip.tripId}/details`}>
              <a onClick={() => trackEvent('Trip Nav Details Dropdown Link Clicked', activeTrip)}>
                <FaInfoCircle /> Details
              </a>
            </Link>
          )}
          {detailspageIsActive && (
            <Link href={`/trips/${activeTrip.tripId}/party`}>
              <a onClick={() => trackEvent('Trip Nav Party Dropdown Link Clicked', activeTrip)}>
                <FaUsers /> Party
              </a>
            </Link>
          )}

          {userIsTripOwner ? (
            <button
              type="button"
              onClick={() => {
                setDeleteModalIsOpen(true)
                trackEvent('Trip Nav Delete Trip Dropdown Link Clicked', activeTrip)
              }}
            >
              <FaTrash /> Delete
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setLeaveTripModalIsOpen(true)
                trackEvent('Trip Nav Leave Trip Dropdown Link Clicked', activeTrip)
              }}
            >
              <FaSignOutAlt /> Leave Trip
            </button>
          )}
        </DropdownMenu>
      </FlexContainer>
      <TripDeleteModal
        setModalIsOpen={setDeleteModalIsOpen}
        modalIsOpen={deleteModalIsOpen}
        trip={activeTrip}
      />
      <LeaveTheTripModal
        setModalIsOpen={setLeaveTripModalIsOpen}
        modalIsOpen={leaveTripModalIsOpen}
        trip={activeTrip}
      />
    </div>
  )
}

export default TripNavigation
