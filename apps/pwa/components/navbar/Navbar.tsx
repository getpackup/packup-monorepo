import { TripMemberStatus, TripType } from '@packup/common'
import { useLoggedInUser, useWindowSize } from '@packup/hooks'
import { AppState } from '@packup/redux'
import {
  baseSpacer,
  fontSizeBase,
  fontSizeSmall,
  halfSpacer,
  headingsFontFamily,
  quadrupleSpacer,
  quarterSpacer,
  tripleSpacer,
  zIndexNavbar,
} from '@packup/styles'
import { trackEvent } from '@packup/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent, useEffect, useState } from 'react'
import { FaCalendar, FaChevronLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase'
import styled from 'styled-components'

import {
  Avatar,
  AvatarImageWrapper,
  DarkModeToggle,
  FlexContainer,
  GearClosetIcon,
  Heading,
  Logo,
  NotificationDot,
  PageContainer,
} from '..'

const StyledNavbar = styled.header<{ isMobile: boolean }>`
  position: fixed;
  left: 0;
  right: 0;
  background: var(--color-secondary);
  min-height: ${(props) =>
    `calc(${props.isMobile ? tripleSpacer : quadrupleSpacer} + env(safe-area-inset-top))`};
  padding-top: env(safe-area-inset-top);
  z-index: ${zIndexNavbar};
  display: flex;
  align-items: center;

  & a,
  & a:hover,
  & a:focus,
  & a:active {
    font-family: ${headingsFontFamily};
    font-weight: 700;
    color: var(--color-textLight);
  }

  & a:focus {
    outline: 1px dotted var(--color-primary);
  }

  & h1 a {
    font-family: ${headingsFontFamily};
    font-size: ${fontSizeSmall};
    font-weight: 700;
  }

  & h2 {
    font-size: ${fontSizeBase};
    color: var(--color-textLight);
    line-height: ${(props) => (props.isMobile ? tripleSpacer : quadrupleSpacer)};
  }

  & svg:focus {
    outline: none;
  }
`

const IconLinkWrapper = styled.div<{ isMobile: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: ${(props) => (props.isMobile ? tripleSpacer : quadrupleSpacer)};
  height: ${(props) => (props.isMobile ? tripleSpacer : quadrupleSpacer)};
  & a {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const TopNavIconWrapper = styled.nav<{ isMobile: boolean }>`
  display: flex;

  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 ${baseSpacer};
    height: ${(props) => (props.isMobile ? tripleSpacer : quadrupleSpacer)};
    color: var(--color-textLight);
    border-top: ${quarterSpacer} solid transparent;
    border-bottom: ${quarterSpacer} solid transparent;
    position: relative;
    transition: all 0.2s ease-in-out;
  }

  & a > svg {
    flex-shrink: 0;
  }

  & a.active > svg {
    color: var(--color-primary);
  }

  & a:hover,
  & a:focus,
  & a.active {
    border-bottom-color: var(--color-primary);
  }

  & a:focus {
    outline: 1px dotted var(--color-primary);
  }

  /* active avatar border */
  & a.active ${AvatarImageWrapper} {
    box-shadow: 0px 0px 0px 2px var(--color-secondary), 0px 0px 0px 4px var(--color-primary);
  }
`

export const Navbar: FunctionComponent<unknown> = () => {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const profile = useSelector((state: AppState) => state.firebase.profile)
  const trips: Array<TripType> = useSelector((state: AppState) => state.firestore.ordered.trips)
  const router = useRouter()
  const [truncatedPageTitle, setTruncatedPageTitle] = useState('')

  useFirestoreConnect([
    { collection: 'users', where: ['uid', '==', auth.uid || ''], storeAs: 'loggedInUser' },
  ])

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

  const pathname = typeof window !== 'undefined' ? router.pathname : '/'

  const activeLoggedInUser = useLoggedInUser()
  const size = useWindowSize()

  const isAuthenticated = auth && !auth.isEmpty && profile && !profile.isEmpty

  useEffect(() => {
    const pageTitle = document.title.replace(' | Packup', '')
    setTruncatedPageTitle(pageTitle.length > 25 ? `${pageTitle.substring(0, 25)}...` : pageTitle)
  }, [router.pathname])

  const routeHasParent = pathname.split('/').length >= 3
  const oneLevelUpUrl = pathname
    .split('/')
    .slice(0, -1)
    .join('/')
    // todo probably need to account for gear closet ids as well?
    .replace('[id]', router.query.id as string)

  const parentPageUrl = oneLevelUpUrl === '/trips' ? '/' : oneLevelUpUrl

  // TODO: better way to do this?
  // if on a checklist or gear closet item page, we want to be able to do navigate(-1) on the back button below
  // const checklistOrGearClosetItemRegex = new RegExp('/checklist|gear-closet|gear-list/*')
  // const routeIsChecklistOrGearClosetItem = checklistOrGearClosetItemRegex.test(pathname)

  const tripGenRegex = new RegExp('/add-trip-image|generator')
  const routeIsPartOfTripGenProcess = tripGenRegex.test(pathname)

  const isInOnboardingFlow = pathname.includes('onboarding')

  const isMobile = Boolean(size.isSmallScreen)

  return (
    <StyledNavbar role="navigation" aria-label="main-navigation" isMobile={isMobile}>
      <PageContainer>
        <FlexContainer
          justifyContent={size.isSmallScreen ? 'center' : 'space-between'}
          alignItems="center"
        >
          {!size.isSmallScreen && auth.isLoaded && (
            <Heading
              noMargin
              inverse
              onClick={() => trackEvent('Navbar Logo Clicked', { isAuthenticated })}
            >
              <Link href={isAuthenticated ? '/' : '/login'}>
                <a>
                  <Logo fill="var(--color-textLight)" width={tripleSpacer} height={27} />{' '}
                  {size.isSmallScreen && !isAuthenticated ? (
                    ''
                  ) : (
                    <span style={{ position: 'relative', top: '-4px' }}>packup</span>
                  )}
                </a>
              </Link>
            </Heading>
          )}
          {size.isSmallScreen && auth.isLoaded && !isAuthenticated && (
            <Heading
              noMargin
              onClick={() => trackEvent('Navbar SmallScreen Logo Clicked', { isAuthenticated })}
            >
              <Link href="/" legacyBehavior>
                <a>
                  <Logo fill="var(--color-textLight)" width={tripleSpacer} height={27} /> packup
                </a>
              </Link>
            </Heading>
          )}
          {isAuthenticated && size.isSmallScreen && auth.isLoaded && (
            <>
              {routeHasParent && !routeIsPartOfTripGenProcess && (
                <IconLinkWrapper isMobile={isMobile}>
                  <Link href={parentPageUrl} legacyBehavior passHref>
                    <a>
                      <FaChevronLeft />
                    </a>
                  </Link>
                </IconLinkWrapper>
              )}
            </>
          )}

          {isAuthenticated && size.isSmallScreen && auth.isLoaded && (
            <Heading noMargin altStyle as="h2">
              {truncatedPageTitle}
            </Heading>
          )}

          {!size.isSmallScreen && isAuthenticated && auth.isLoaded && !isInOnboardingFlow && (
            <TopNavIconWrapper isMobile={isMobile}>
              <Link href="/">
                <a
                  className={pathname === '/' || pathname.includes('trips') ? 'active' : undefined}
                  onClick={() => trackEvent('Navbar LoggedInUser Link Clicked', { link: 'Trips' })}
                >
                  <FaCalendar style={{ marginRight: halfSpacer }} /> Trips
                  {pendingTrips.length > 0 && <NotificationDot top={halfSpacer} right="0" />}
                </a>
              </Link>
              <Link href="/gear-closet">
                <a
                  className={pathname.includes('/gear-closet') ? 'active' : undefined}
                  onClick={() =>
                    trackEvent('Navbar LoggedInUser Link Clicked', { link: 'gear-closet' })
                  }
                >
                  <GearClosetIcon size={17} style={{ marginRight: halfSpacer }} /> Gear
                </a>
              </Link>
              {/* TODO: when shopping list is ready
              <Link
                to="/app/shopping-list"
                getProps={isPartiallyActive}
                onClick={() =>
                  trackEvent('Navbar LoggedInUser Link Clicked', { link: 'Shopping List' })
                }
              >
                <FaShoppingCart data-tip="Shopping list" data-for="shoppingList" />
                <ReactTooltip
                  id="shoppingList"
                  place="bottom"
                  type="dark"
                  effect="solid"
                  className="tooltip customTooltip"
                  delayShow={500}
                  offset={{
                    bottom: 8,
                  }}
                />
              </Link> */}
              <Link href="/profile">
                <a
                  className={pathname.includes('/profile') ? 'active' : undefined}
                  onClick={() =>
                    trackEvent('Navbar LoggedInUser Link Clicked', { link: 'Profile' })
                  }
                >
                  {!activeLoggedInUser ? (
                    <Avatar staticContent="" size="sm" username={undefined} />
                  ) : (
                    <Avatar
                      src={activeLoggedInUser?.photoURL}
                      size="xs"
                      gravatarEmail={activeLoggedInUser?.email}
                      rightMargin
                    />
                  )}{' '}
                  Profile
                </a>
              </Link>
              <FlexContainer flexDirection="column">
                <DarkModeToggle />
              </FlexContainer>
            </TopNavIconWrapper>
          )}
        </FlexContainer>
      </PageContainer>
    </StyledNavbar>
  )
}
