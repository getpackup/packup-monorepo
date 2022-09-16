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
import { RootState } from '@getpackup-group/redux'
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
import { Helmet } from 'react-helmet-async'
import { FaCalendar, FaChevronLeft, FaUserLock } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { isLoaded, useFirestoreConnect } from 'react-redux-firebase'
import styled from 'styled-components'

import { AvatarImageWrapper } from '..'
import Image from 'next/image'

const StyledNavbar = styled.header`
  position: fixed;
  left: 0;
  right: 0;
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

  & sup {
    text-transform: uppercase;
    font-size: 0.5em;
    top: -1em;
    padding: ${quarterSpacer};
    border-radius: ${baseSpacer};
    background-color: ${white};
    color: ${brandSecondary};
  }

  & svg:focus {
    outline: none;
  }
`

const NavLink = styled(Link)`
  padding: 0 ${halfSpacer};
  &:last-child {
    margin-right: -${halfSpacer};
  }
`

const StyledMenuToggle = styled.div`
  cursor: pointer;
  width: ${quadrupleSpacer};
  height: ${quadrupleSpacer};
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const StyledMenu = styled.nav`
  position: absolute;
  transform: translateX(${(props: { menuIsOpen: boolean }) => (props.menuIsOpen ? 0 : '100vw')});
  top: ${quadrupleSpacer};
  right: 0;
  left: 0;
  height: 100vh;
  transition: all 0.2s ease-in-out;
  line-height: initial;

  & a,
  & a:visited {
    padding: 0;
    display: block;
    color: ${brandTertiary};
  }

  & a:hover,
  & a:focus {
    color: ${brandPrimary};
    display: block;
  }
`

const IconLinkWrapper = styled.div`
  display: flex;
  width: ${tripleSpacer};
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
    box-shadow: 0 0 0 2px ${brandSecondary}, 0px 0px 0px 4px ${brandPrimary};
  }
`

export const Navbar: FunctionComponent<unknown> = () => {
  const auth = useSelector((state: RootState) => state.firebase.auth)
  const profile = useSelector((state: RootState) => state.firebase.profile)
  const loggedInUser = useSelector((state: RootState) => state.firestore.ordered.loggedInUser)
  const trips: Array<TripType> = useSelector((state: RootState) => state.firestore.ordered.trips)
  const router = useRouter()
  const { activePackingListTab, personalListScrollPosition, sharedListScrollPosition } =
    useSelector((state: RootState) => state.client)

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

  const pathname = typeof window !== 'undefined' ? window?.location.pathname : '/'

  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [pageTitle, setPageTitle] = useState('')

  const onHelmetChange = ({ title }: { title: string }) => {
    if (title !== undefined) {
      setPageTitle(title.replace(' | Packup', ''))
    }
  }

  const menuDropdown = useRef<HTMLDivElement>(null)
  const hamburgerButton = useRef<HTMLDivElement>(null)
  const size = useWindowSize()

  const handleProfileDropdownClick = (e: MouseEvent) => {
    if (menuDropdown && menuDropdown.current && menuDropdown.current.contains(e.target as Node)) {
      return // inside click
    }
    if (
      hamburgerButton &&
      hamburgerButton.current &&
      hamburgerButton.current.contains(e.target as Node)
    ) {
      return // let event bubble to Hamburger toggle method
    }
    setMenuIsOpen(false) // outside click, close the menu
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleProfileDropdownClick)

    return () => {
      document.removeEventListener('mousedown', handleProfileDropdownClick)
    }
  }, [])

  const toggleMenu = () => {
    setMenuIsOpen(false)
  }

  const isAuthenticated = auth && !auth.isEmpty

  const truncatedPageTitle = pageTitle.length > 25 ? `${pageTitle.substring(0, 25)}...` : pageTitle
  const routeHasParent = pathname.split('/').length >= 4

  // TODO: better way to do this?
  // if on a checklist or gear closet item page, we want to be able to do navigate(-1) on the back button below
  const checklistOrGearClosetItemRegex = new RegExp('/checklist|gear-closet|gear-list/*')
  const routeIsChecklistOrGearClosetItem = checklistOrGearClosetItemRegex.test(pathname)

  const tripGenRegex = new RegExp('/add-trip-image|generator')
  const routeIsPartOfTripGenProcess = tripGenRegex.test(pathname)

  const isInOnboardingFlow = pathname.includes('onboarding')

  // TODO: remove when fixing firestore to work with user auth
  // auth.isLoaded = true

  return (
    <StyledNavbar role="navigation" aria-label="main-navigation">
      <Helmet onChangeClientState={onHelmetChange} />
      <PageContainer>
        <FlexContainer justifyContent="space-between" alignItems="center">
          {!size.isSmallScreen && auth.isLoaded && (
            <Heading noMargin>
              <Link
                href={isAuthenticated ? '/app/trips' : '/'}
                onClick={() => trackEvent('Navbar Logo Clicked', { isAuthenticated })}
              >
                <>
                  <Image src={yak} alt="" width={tripleSpacer} height={27} />{' '}
                  {size.isSmallScreen && !isAuthenticated ? '' : <>packup</>}
                </>
              </Link>
            </Heading>
          )}
          {size.isSmallScreen && auth.isLoaded && !isAuthenticated && (
            <Heading noMargin>
              <Link
                href="/"
                onClick={() => trackEvent('Navbar SmallScreen Logo Clicked', { isAuthenticated })}
              >
                <Image src={yak} alt="" width={tripleSpacer} />
                packup
              </Link>
            </Heading>
          )}
          {isAuthenticated && size.isSmallScreen && auth.isLoaded && (
            <IconLinkWrapper>
              {routeHasParent && !routeIsPartOfTripGenProcess && (
                <Link
                  href="../"
                  onClick={() => {
                    trackEvent('Navbar SmallScreen Back Button Clicked')
                    if (routeIsChecklistOrGearClosetItem) {
                      if (personalListScrollPosition || sharedListScrollPosition) {
                        scrollToPosition(
                          activePackingListTab === TabOptions.Personal
                            ? personalListScrollPosition
                            : sharedListScrollPosition
                        )
                      }
                      router.back()
                    }
                  }}
                >
                  <FaChevronLeft />
                </Link>
              )}
            </IconLinkWrapper>
          )}
          {isAuthenticated && size.isSmallScreen && auth.isLoaded && (
            <Heading noMargin altStyle as="h2">
              {truncatedPageTitle}
            </Heading>
          )}
          {isAuthenticated && size.isSmallScreen && auth.isLoaded && <IconLinkWrapper />}
          {size.isSmallScreen && !isAuthenticated && auth.isLoaded && (
            <StyledMenuToggle ref={hamburgerButton}>
              <Hamburger
                color={white}
                toggled={menuIsOpen}
                toggle={() => {
                  trackEvent('Navbar Hamburger Toggled')
                  setMenuIsOpen(!menuIsOpen)
                }}
              />
            </StyledMenuToggle>
          )}

          {size.isSmallScreen && !isAuthenticated && auth.isLoaded && (
            <StyledMenu id="navMenu" menuIsOpen={menuIsOpen} ref={menuDropdown}>
              <Box>
                <NavLink
                  href="/blog"
                  onClick={() => {
                    trackEvent('Navbar SmallScreen Link Clicked', { link: 'Blog' })
                    toggleMenu()
                  }}
                >
                  Blog
                </NavLink>
                <HorizontalRule compact />
                <NavLink
                  href="/about"
                  onClick={() => {
                    trackEvent('Navbar SmallScreen Link Clicked', { link: 'About' })
                    toggleMenu()
                  }}
                >
                  About
                </NavLink>
                <HorizontalRule compact />
                <NavLink
                  href="/contact"
                  onClick={() => {
                    trackEvent('Navbar SmallScreen Link Clicked', { link: 'Contact' })
                    toggleMenu()
                  }}
                >
                  Contact
                </NavLink>
                <HorizontalRule compact />
                <NavLink
                  href="/login"
                  onClick={() => {
                    trackEvent('Navbar SmallScreen Link Clicked', { link: 'Login' })
                    toggleMenu()
                  }}
                >
                  Log In
                </NavLink>
                <HorizontalRule compact />
                <NavLink
                  href="/signup"
                  onClick={() => {
                    trackEvent('Navbar SmallScreen Link Clicked', { link: 'Sign Up' })
                    toggleMenu()
                  }}
                >
                  Sign Up
                </NavLink>
              </Box>
            </StyledMenu>
          )}
          {!size.isSmallScreen && !isAuthenticated && auth.isLoaded && (
            <FlexContainer as="nav">
              {/*<NavLink href="/blog">Blog</NavLink>*/}
              {/*<NavLink href="/about">About</NavLink>*/}
              {/*<NavLink href="/contact">Contact</NavLink>*/}
              <Button type="link" to="/login" color="secondary">
                Log In
              </Button>
              &nbsp;
              <Button type="link" to="/signup">
                Sign Up
              </Button>
            </FlexContainer>
          )}
          {!size.isSmallScreen && isAuthenticated && auth.isLoaded && !isInOnboardingFlow && (
            <TopNavIconWrapper>
              <Link
                href={'/app/trips'}
                // getProps={isPartiallyActive}
                onClick={() => trackEvent('Navbar LoggedInUser Link Clicked', { link: 'Trips' })}
              >
                <FaCalendar style={{ marginRight: halfSpacer }} /> Trips
                {pendingTrips.length > 0 && <NotificationDot top={halfSpacer} right="0" />}
              </Link>
              <Link
                href={'/app/gear-closet'}
                // getProps={isPartiallyActive}
                onClick={() =>
                  trackEvent('Navbar LoggedInUser Link Clicked', { link: 'gear-closet' })
                }
              >
                <GearClosetIcon size={17} style={{ marginRight: halfSpacer }} /> Gear Closet
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
              {profile.isAdmin && (
                <Link
                  href={'/admin/gear-list'}
                  // getProps={isPartiallyActive}
                >
                  <FaUserLock /> Admin
                </Link>
              )}
              {loggedInUser && loggedInUser.length > 0 && (
                <Link
                  href={'/app/profile'}
                  // getProps={isPartiallyActive}
                  onClick={() =>
                    trackEvent('Navbar LoggedInUser Link Clicked', { link: 'Profile' })
                  }
                >
                  <Avatar
                    src={loggedInUser[0].photoURL as string}
                    size="xs"
                    gravatarEmail={loggedInUser[0].email as string}
                    rightMargin
                  />{' '}
                  Profile
                </Link>
              )}
            </TopNavIconWrapper>
          )}
        </FlexContainer>
      </PageContainer>
    </StyledNavbar>
  )
}
