import { TripMemberStatus, TripType } from '@getpackup-group/common'
import {
  Avatar,
  Column,
  FlexContainer,
  Heading,
  HorizontalRule,
  NotificationDot,
  PageContainer,
  Row,
  GearClosetIcon,
  Button,
} from '..'
import { AppState } from '@getpackup-group/redux'
import {
  brandPrimary,
  brandSecondary,
  textColor,
  white,
  zIndexSmallScreenFooter,
  baseBorderStyle,
  visuallyHiddenStyle,
  baseSpacer,
  halfSpacer,
  quadrupleSpacer,
  fontSizeH3,
  fontSizeSmall,
  brandSecondaryHover,
} from '@getpackup-group/styles'
import { ThemeContext, trackEvent, useWindowSize } from '@getpackup-group/utils'
import Link from 'next/link'
import React from 'react'
import { FaCalendar, FaFacebook, FaInstagram, FaTwitter, FaUserLock } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  background-color: ${brandSecondary};
  // background-color: var(--color-secondary);
  color: ${white};
  padding: ${quadrupleSpacer} 0;
  font-size: ${fontSizeSmall};
  & a {
    color: ${white};
    opacity: 0.8;

    &:hover,
    &:focus {
      color: ${white};
      opacity: 1;
    }
  }
`

const Social = styled.a`
  margin-right: ${baseSpacer};
`

const HiddenText = styled.span`
  ${visuallyHiddenStyle};
`

const SignupFormWrapper = styled.div`
  padding: ${quadrupleSpacer} 0;
  background-color: ${brandSecondaryHover};
  text-align: center;
`

const BottomNav = styled.nav`
  position: fixed;
  z-index: ${zIndexSmallScreenFooter};
  bottom: 0;
  min-height: calc(${quadrupleSpacer} + 1px); /* min height plus 1px border top */
  left: 0;
  right: 0;
  display: flex;
  background-color: ${white};
  border-top: ${baseBorderStyle};
  padding-bottom: env(safe-area-inset-bottom);

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

  const { colorMode, setColorMode } = React.useContext(ThemeContext)

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

  const isPartiallyActive = ({ isPartiallyCurrent }: { isPartiallyCurrent: boolean }) => {
    return isPartiallyCurrent ? { className: 'active' } : {}
  }

  if (!auth.isLoaded) {
    return null
  }

  return (
    <>
      {!loggedInUser && (
        <>
          <SignupFormWrapper id="signup">
            <PageContainer>
              <Heading as="h1" inverse align="center">
                Plan your first trip today
              </Heading>

              <Button type="link" to="/signup">
                Get Started
              </Button>
            </PageContainer>
          </SignupFormWrapper>

          <StyledFooter>
            <PageContainer>
              <Row>
                <Column md={3} lg={6}>
                  <Heading>
                    <Link href="/">packup</Link>
                  </Heading>
                  <p>Get outside faster and safer.</p>
                </Column>
                <Column sm={4} md={3} lg={2}>
                  <p>
                    <Link href="/">
                      <span onClick={() => trackEvent('Footer Link Click', { link: 'Home' })}>
                        Home
                      </span>
                    </Link>
                  </p>
                  <p>
                    <Link href={'/signup'}>
                      <span onClick={() => trackEvent('Footer Link Click', { link: 'Sign Up' })}>
                        Sign Up
                      </span>
                    </Link>
                  </p>
                </Column>
                <Column sm={4} md={3} lg={2}>
                  <p>
                    <Link href={'/blog'}>
                      <span onClick={() => trackEvent('Footer Link Click', { link: 'Blog' })}>
                        Blog
                      </span>
                    </Link>
                  </p>
                  <p>
                    <Link href={'/about'}>
                      <span onClick={() => trackEvent('Footer Link Click', { link: 'About' })}>
                        About
                      </span>
                    </Link>
                  </p>
                </Column>
                <Column sm={4} md={3} lg={2}>
                  <p>
                    <Link href={'/contact'}>
                      <span
                        onClick={() => trackEvent('Footer Link Click', { link: 'Send a message' })}
                      >
                        Send a Message
                      </span>
                    </Link>
                  </p>
                  <p>
                    <a
                      href="https://reddit.com/r/packup"
                      onClick={() => trackEvent('Footer Link Click', { link: 'Send a message' })}
                    >
                      Community
                    </a>
                  </p>
                  {/* <p>
                    {colorMode ? (
                      // eslint-disable-next-line jsx-a11y/label-has-associated-control
                      <label>
                        <input
                          type="checkbox"
                          checked={colorMode === 'dark'}
                          onChange={(ev) => {
                            setColorMode(ev.target.checked ? 'dark' : 'light');
                          }}
                        />{' '}
                        {colorMode === 'dark' ? `🌝` : `🌞`}
                      </label>
                    ) : null}
                  </p> */}
                </Column>
              </Row>
              <HorizontalRule />
              <FlexContainer justifyContent="space-between">
                <nav>
                  <Social
                    href="https://www.instagram.com/getpackup/"
                    target="_blank"
                    rel="noopener"
                    onClick={() => trackEvent('Footer Link Click', { link: 'Instagram' })}
                  >
                    <FaInstagram />
                    <HiddenText>Instagram</HiddenText>
                  </Social>
                  <Social
                    href="https://www.facebook.com/getpackup"
                    target="_blank"
                    rel="noopener"
                    onClick={() => trackEvent('Footer Link Click', { link: 'Facebook' })}
                  >
                    <FaFacebook />
                    <HiddenText>Facebook</HiddenText>
                  </Social>
                  <Social
                    href="https://twitter.com/getpackup"
                    target="_blank"
                    rel="noopener"
                    onClick={() => trackEvent('Footer Link Click', { link: 'Twitter' })}
                  >
                    <FaTwitter />
                    <HiddenText>Twitter</HiddenText>
                  </Social>
                </nav>
                <small>
                  <Link href={'/privacy'}>
                    <span onClick={() => trackEvent('Footer Link Click', { link: 'Privacy' })}>
                      Privacy
                    </span>
                  </Link>{' '}
                  <Link href={'/terms'}>
                    <span onClick={() => trackEvent('Footer Link Click', { link: 'Terms of Use' })}>
                      Terms of Use
                    </span>
                  </Link>{' '}
                  {`Copyright © Packup Technologies, Ltd. ${new Date().getFullYear()}`}
                </small>
              </FlexContainer>
            </PageContainer>
          </StyledFooter>
        </>
      )}
      {size.isSmallScreen && loggedInUser && !isInOnboardingFlow && (
        <BottomNav>
          <Link
            href={'/'}
            // getProps={isPartiallyActive}
            onClick={() =>
              trackEvent('Logged In Small Screen Footer Link Click', { link: 'Trips' })
            }
          >
            <FaCalendar />
            {pendingTrips.length > 0 && <NotificationDot top={`-${halfSpacer}`} right="0" />}
          </Link>
          <Link
            href={'/gear-closet'}
            // getProps={isPartiallyActive}
            onClick={() =>
              trackEvent('Logged In Small Screen Footer Link Click', { link: 'Gear Closet' })
            }
          >
            <GearClosetIcon size={15} />
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
            <Link
              href={'/admin/gear-list'}
              // getProps={isPartiallyActive}
            >
              <FaUserLock />
            </Link>
          )}
          <Link
            href={'/profile'}
            // getProps={isPartiallyActive}
            onClick={() =>
              trackEvent('Logged In Small Screen Footer Link Click', { link: 'Profile' })
            }
          >
            <Avatar src={profile.photoURL} size="xs" gravatarEmail={profile.email} />
          </Link>
        </BottomNav>
      )}
    </>
  )
}

export default Footer
