import { TripMemberStatus, TripType } from '@getpackup-group/common'
import {
  Avatar,
  Box,
  Button,
  FlexContainer,
  Heading,
  HorizontalRule,
  NotificationDot,
  PageContainer,
  GearClosetIcon,
} from '..'
import yak from '../../images/yak.svg'
import { AppState } from '@getpackup-group/redux'
import {
  brandPrimary,
  brandSecondary,
  brandTertiary,
  white,
  zIndexNavbar,
  baseSpacer,
  halfSpacer,
  quadrupleSpacer,
  quarterSpacer,
  tripleSpacer,
  fontSizeBase,
  fontSizeSmall,
  headingsFontFamily,
} from '@getpackup-group/styles'
import { TabOptions, scrollToPosition, trackEvent, useWindowSize } from '@getpackup-group/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Spin as Hamburger } from 'hamburger-react'
import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { FaCalendar, FaChevronLeft, FaShoppingCart, FaUserLock } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase'
import styled from 'styled-components'
import { AvatarImageWrapper } from '..'
import Image from 'next/image'

const StyledNavbar = styled.header`
  // grid-area: header;
  // position: fixed;
  // left: 0;
  // right: 0;
  // background: var(--color-secondary);
  background: ${brandSecondary};
  min-height: ${quadrupleSpacer};
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
    color: ${white};
  }

  & a:focus {
    outline: 1px dotted ${brandPrimary};
  }

  & h1 a {
    font-family: ${headingsFontFamily};
    font-size: ${fontSizeSmall};
    font-weight: 700;
  }

  & h2 {
    font-size: ${fontSizeBase};
    color: ${white};
    line-height: ${quadrupleSpacer};
  }

  // & sup {
  //   text-transform: uppercase;
  //   font-size: 0.5em;
  //   top: -1em;
  //   padding: ${quarterSpacer};
  //   border-radius: ${baseSpacer};
  //   background-color: ${white};
  //   color: ${brandSecondary};
  // }

  & svg:focus {
    outline: none;
  }
`

const IconLinkWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  width: ${quadrupleSpacer};
  height: ${quadrupleSpacer};
  & a {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const TopNavIconWrapper = styled.nav`
  display: flex;

  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 ${baseSpacer};
    height: ${quadrupleSpacer};
    color: ${white};
    border-top: ${quarterSpacer} solid transparent;
    border-bottom: ${quarterSpacer} solid transparent;
    position: relative;
    transition: all 0.2s ease-in-out;
  }

  & a > svg {
    flex-shrink: 0;
  }

  & a.active > svg {
    color: ${brandPrimary};
  }

  & a:hover,
  & a:focus,
  & a.active {
    border-bottom-color: ${brandPrimary};
  }

  & a:focus {
    outline: 1px dotted ${brandPrimary};
  }

  /* active avatar border */
  & a.active ${AvatarImageWrapper} {
    box-shadow: 0px 0px 0px 2px ${brandSecondary}, 0px 0px 0px 4px ${brandPrimary};
  }
`

export const Navbar: FunctionComponent<unknown> = () => {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const loggedInUser = useSelector((state: AppState) => state.firestore.ordered['loggedInUser'])
  const trips: Array<TripType> = useSelector((state: AppState) => state.firestore.ordered['trips'])
  const router = useRouter()

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

  const size = useWindowSize()

  const isAuthenticated = auth && !auth.isEmpty

  const pageTitle = document.title.replace(' | Packup', '')
  const truncatedPageTitle = pageTitle.length > 25 ? `${pageTitle.substring(0, 25)}...` : pageTitle
  const routeHasParent = pathname.split('/').length >= 3
  const oneLevelUpUrl = pathname
    .split('/')
    .slice(0, -1)
    .join('/')
    // todo probably need to account for gear closet ids as well?
    .replace('[id]', router.query['id'] as string)

  const parentPageUrl = oneLevelUpUrl === '/trips' ? '/' : oneLevelUpUrl

  // TODO: better way to do this?
  // if on a checklist or gear closet item page, we want to be able to do navigate(-1) on the back button below
  // const checklistOrGearClosetItemRegex = new RegExp('/checklist|gear-closet|gear-list/*')
  // const routeIsChecklistOrGearClosetItem = checklistOrGearClosetItemRegex.test(pathname)

  const tripGenRegex = new RegExp('/add-trip-image|generator')
  const routeIsPartOfTripGenProcess = tripGenRegex.test(pathname)

  const isInOnboardingFlow = pathname.includes('onboarding')

  return (
    <StyledNavbar role="navigation" aria-label="main-navigation">
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
                  <Image src={yak} alt="" width={tripleSpacer} height={27} />{' '}
                  {size.isSmallScreen && !isAuthenticated ? '' : <>packup</>}
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
                  <Image src={yak} alt="" width={tripleSpacer} height={27} /> packup
                </a>
              </Link>
            </Heading>
          )}
          {isAuthenticated && size.isSmallScreen && auth.isLoaded && (
            <>
              {routeHasParent && !routeIsPartOfTripGenProcess && (
                <IconLinkWrapper>
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
            <>
              {truncatedPageTitle === 'Packup' ? (
                <Image src={yak} alt="" width={tripleSpacer} height={27} />
              ) : (
                <Heading noMargin altStyle as="h2">
                  {truncatedPageTitle}
                </Heading>
              )}
            </>
          )}

          {!size.isSmallScreen && isAuthenticated && auth.isLoaded && !isInOnboardingFlow && (
            <TopNavIconWrapper>
              <Link href={'/'}>
                <a
                  className={pathname === '/' || pathname.includes('trips') ? 'active' : undefined}
                  onClick={() => trackEvent('Navbar LoggedInUser Link Clicked', { link: 'Trips' })}
                >
                  <FaCalendar style={{ marginRight: halfSpacer }} /> Trips
                  {pendingTrips.length > 0 && <NotificationDot top={halfSpacer} right="0" />}
                </a>
              </Link>
              <Link href={'/gear-closet'}>
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
              <Link href={'/profile'}>
                <a
                  className={pathname.includes('/profile') ? 'active' : undefined}
                  onClick={() =>
                    trackEvent('Navbar LoggedInUser Link Clicked', { link: 'Profile' })
                  }
                >
                  {!loggedInUser ? (
                    <Avatar staticContent="" size="sm" username={undefined} />
                  ) : (
                    <Avatar
                      src={loggedInUser[0].photoURL}
                      size="xs"
                      gravatarEmail={loggedInUser[0].email}
                      rightMargin
                    />
                  )}{' '}
                  Profile
                </a>
              </Link>
            </TopNavIconWrapper>
          )}
        </FlexContainer>
      </PageContainer>
    </StyledNavbar>
  )
}
