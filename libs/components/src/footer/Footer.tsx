import { TripMemberStatus, TripType } from '@getpackup-group/common'
import { Avatar, NotificationDot, GearClosetIcon } from '..'
import { AppState } from '@getpackup-group/redux'
import {
  brandPrimary,
  textColor,
  white,
  zIndexSmallScreenFooter,
  baseBorderStyle,
  halfSpacer,
  quadrupleSpacer,
  fontSizeH3,
} from '@getpackup-group/styles'
import { useWindowSize } from '@getpackup-group/utils'
import Link from 'next/link'
import { FaCalendar, FaUserLock } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import styled from 'styled-components'

const BottomNav = styled.footer`
  // grid-area: footer;
  // position: fixed;
  z-index: ${zIndexSmallScreenFooter};
  bottom: 0;
  min-height: calc(${quadrupleSpacer} + 1px); /* min height plus 1px border top */
  left: 0;
  right: 0;
  display: block;
  background-color: ${white};
  border-top: ${baseBorderStyle};
  padding-bottom: env(safe-area-inset-bottom);

  & nav {
    display: flex;
  }

  & a {
    border-top: 2px solid transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    height: ${quadrupleSpacer};
    color: ${textColor};
    // color: var(--color-text);
    transition: all 0.2s ease-in-out;
    position: relative;
    font-size: ${fontSizeH3};
  }

  & a:focus {
    outline: none;
  }

  & a.active {
    border-top-color: ${brandPrimary};
    color: ${brandPrimary};
  }
`

export const Footer = () => {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const profile = useSelector((state: AppState) => state.firebase.profile)
  const trips: Array<TripType> = useSelector((state: AppState) => state.firestore.ordered['trips'])
  const loggedInUser = auth && auth.isLoaded && !auth.isEmpty
  const size = useWindowSize()
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'

  const nonArchivedTrips: TripType[] =
    isLoaded(trips) && Array.isArray(trips) && trips && trips.length > 0
      ? trips.filter((trip: TripType) => trip.archived !== true)
      : []

  const pendingTrips = nonArchivedTrips.filter(
    (trip) =>
      trip.tripMembers &&
      trip.tripMembers[auth.uid] &&
      trip.tripMembers[auth.uid].status === TripMemberStatus.Pending
  )

  const isInOnboardingFlow = pathname.includes('onboarding')

  if (!auth.isLoaded || !size.isSmallScreen) {
    return null
  }

  return (
    <>
      {loggedInUser && !isInOnboardingFlow && (
        <BottomNav>
          <nav>
            <Link href="/" legacyBehavior passHref>
              <a className={pathname === '/' || pathname.includes('trips') ? 'active' : undefined}>
                <FaCalendar />
                {pendingTrips.length > 0 && <NotificationDot top={`-${halfSpacer}`} right="0" />}
              </a>
            </Link>
            <Link href="/gear-closet" legacyBehavior passHref>
              <a className={pathname.includes('gear-closet') ? 'active' : undefined}>
                <GearClosetIcon size={15} />
              </a>
            </Link>
            {/* TODO: when shopping list is ready <Link
            href="/app/shopping-list"
            getProps={isPartiallyActive}
            onClick={() =>
              trackEvent('Logged In Small Screen Footer Link Click', { link: 'Shopping List' })
            }
          >
            <FaShoppingCart />
          </Link> */}
            {profile.isAdmin && (
              <Link href="/admin/gear-list" legacyBehavior passHref>
                <a className={pathname.includes('admin') ? 'active' : undefined}>
                  <FaUserLock />
                </a>
              </Link>
            )}
            <Link href="/profile" legacyBehavior passHref>
              <a className={pathname.includes('profile') ? 'active' : undefined}>
                <Avatar src={profile.photoURL} size="xs" gravatarEmail={profile.email} />
              </a>
            </Link>
          </nav>
        </BottomNav>
      )}
    </>
  )
}

export default Footer
