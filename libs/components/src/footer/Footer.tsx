import { TripMemberStatus, TripType } from '@packup/common'
import { Avatar, NotificationDot, GearClosetIcon } from '..'
import { AppState } from '@packup/redux'
import {
  brandPrimary,
  textColor,
  white,
  zIndexSmallScreenFooter,
  baseBorderStyle,
  halfSpacer,
  quadrupleSpacer,
  fontSizeH3,
  sextupleSpacer,
} from '@packup/styles'
import { useLoggedInUser, useWindowSize } from '@packup/hooks'
import Link from 'next/link'
import { FaCalendar } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import styled from 'styled-components'

const BottomNav = styled.footer<{ isPwa: boolean }>`
  position: fixed;
  z-index: ${zIndexSmallScreenFooter};
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  background-color: var(--color-secondary);
  border-top: ${baseBorderStyle};
  // padding-bottom: env(safe-area-inset-bottom);

  & nav {
    display: flex;
    min-height: calc(
      ${({ isPwa }) => (isPwa ? sextupleSpacer : quadrupleSpacer)} + 1px
    ); /* min height plus 1px border top */
  }

  & a {
    border-top: 2px solid transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    color: var(--color-textLight);
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
  const activeLoggedInUser = useLoggedInUser()
  const size = useWindowSize()
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'

  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase()
    return /iphone|ipad|ipod/.test(userAgent)
  }

  let navigator: typeof window.navigator & { standalone?: boolean }

  if (typeof window !== 'undefined' && window.navigator) {
    navigator = window.navigator
  }

  const isInStandaloneMode = () => 'standalone' in navigator && navigator.standalone

  const getPWADisplayMode = () => {
    // https://web.dev/customize-install/#detect-launch-type
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (document.referrer.startsWith('android-app://')) {
      return 'twa'
    }
    if (navigator.standalone || isStandalone) {
      return 'standalone'
    }
    return 'browser'
  }

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
      {activeLoggedInUser && !isInOnboardingFlow && (
        <BottomNav isPwa={Boolean(isInStandaloneMode()) && getPWADisplayMode() === 'standalone'}>
          <nav>
            <Link href="/" legacyBehavior passHref>
              <a className={pathname === '/' || pathname.includes('trips') ? 'active' : undefined}>
                <FaCalendar />
                {pendingTrips.length > 0 && (
                  <NotificationDot top={`-${halfSpacer}`} right="0">
                    {pendingTrips.length > 9 ? '9+' : pendingTrips.length}
                  </NotificationDot>
                )}
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
