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
  SignupForm,
  GearClosetIcon,
} from '..'
import { useLocation } from 'react-router-dom'
import { RootState } from '@getpackup-group/redux'
import {
  brandPrimary,
  brandSecondary,
  textColor,
  white,
  zIndexSmallScreenFooter,
  baseBorderStyle,
  visuallyHiddenStyle,
  baseSpacer,
  doubleSpacer,
  halfSpacer,
  quadrupleSpacer,
  fontSizeH3,
  fontSizeSmall,
} from '@getpackup-group/styles'
import { trackEvent, useWindowSize } from '@getpackup-group/utils'
import Link from 'next/link'
import React from 'react'
import { FaCalendar, FaFacebook, FaInstagram, FaTwitter, FaUserLock } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { isLoaded } from 'react-redux-firebase'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  background-color: ${brandSecondary};
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
  padding: ${doubleSpacer} 0;
  background-color: ${brandPrimary};
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
  const auth = useSelector((state: RootState) => state.firebase.auth)
  const profile = useSelector((state: RootState) => state.firebase.profile)
  const trips: Array<TripType> = useSelector((state: RootState) => state.firestore.ordered.trips)
  const loggedInUser = auth && auth.isLoaded && !auth.isEmpty
  const size = useWindowSize()
  const location = useLocation()

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

  const isInOnboardingFlow = location.pathname.includes('onboarding')

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
                Sign up for the newsletter
              </Heading>
              <p style={{ textAlign: 'center', color: white }}>
                <strong>Enter your email to receive periodic updates about Packup</strong>
              </p>
              <Row>
                <Column md={8} mdOffset={2}>
                  <SignupForm location="footer" />
                </Column>
              </Row>
            </PageContainer>
          </SignupFormWrapper>

          <StyledFooter>
            <PageContainer>
              <Row>
                <Column md={3} lg={6}>
                  <Heading>
                    <Link href="/">packup</Link>
                  </Heading>
                  <p>Adventure made easy.</p>
                </Column>
                <Column sm={4} md={3} lg={2}>
                  <p>
                    <Link
                      href="/"
                      onClick={() => trackEvent('Footer Link Click', { link: 'Home' })}
                    >
                      Home
                    </Link>
                  </p>
                  <p>
                    <Link
                      href="/signup"
                      onClick={() => trackEvent('Footer Link Click', { link: 'Sign Up' })}
                    >
                      Sign Up
                    </Link>
                  </p>
                </Column>
                <Column sm={4} md={3} lg={2}>
                  <p>
                    <Link
                      href="/blog"
                      onClick={() => trackEvent('Footer Link Click', { link: 'Blog' })}
                    >
                      Blog
                    </Link>
                  </p>
                  <p>
                    <Link
                      href="/about"
                      onClick={() => trackEvent('Footer Link Click', { link: 'About' })}
                    >
                      About
                    </Link>
                  </p>
                </Column>
                <Column sm={4} md={3} lg={2}>
                  <p>
                    <Link
                      href="/contact"
                      onClick={() => trackEvent('Footer Link Click', { link: 'Send a message' })}
                    >
                      Send a Message
                    </Link>
                  </p>
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
                  <Link
                    href="/privacy"
                    onClick={() => trackEvent('Footer Link Click', { link: 'Privacy' })}
                  >
                    Privacy
                  </Link>{' '}
                  <Link
                    href="/terms"
                    onClick={() => trackEvent('Footer Link Click', { link: 'Terms of Use' })}
                  >
                    Terms of Use
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
            href="/app/trips"
            // getProps={isPartiallyActive}
            onClick={() =>
              trackEvent('Logged In Small Screen Footer Link Click', { link: 'Trips' })
            }
          >
            <FaCalendar />
            {pendingTrips.length > 0 && <NotificationDot top={`-${halfSpacer}`} right="0" />}
          </Link>
          <Link
            href="/app/gear-closet"
            // getProps={isPartiallyActive}
            onClick={() =>
              trackEvent('Logged In Small Screen Footer Link Click', { link: 'Gear Closet' })
            }
          >
            <GearClosetIcon size={15} />
          </Link>
          {/* TODO: when shopping list is ready <Link
            to="/app/shopping-list"
            getProps={isPartiallyActive}
            onClick={() =>
              trackEvent('Logged In Small Screen Footer Link Click', { link: 'Shopping List' })
            }
          >
            <FaShoppingCart />
          </Link> */}
          {profile.isAdmin && (
            <Link
              href="/admin/gear-list"
              // getProps={isPartiallyActive}
            >
              <FaUserLock />
            </Link>
          )}
          <Link
            href="/app/profile"
            // getProps={isPartiallyActive}
            onClick={() =>
              trackEvent('Logged In Small Screen Footer Link Click', { link: 'Profile' })
            }
          >
            <Avatar
              src={profile.photoURL as string}
              size="xs"
              gravatarEmail={profile.email as string}
            />
          </Link>
        </BottomNav>
      )}
    </>
  )
}

export default Footer
