import { AppState } from '@packup/redux'
import {
  baseBorderStyle,
  baseSpacer,
  brandSuccess,
  doubleSpacer,
  fontSizeSmall,
  halfSpacer,
  tripleSpacer,
} from '@packup/styles'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie-consent'
import { FaCheckCircle, FaChevronLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import {
  AnimatedContainer,
  Box,
  Button,
  Column,
  // FirebaseAuthWrapper,
  FlexContainer,
  Heading,
  LoginForm,
  PageContainer,
  Row,
  SignupForm,
} from '..'

const Tabs = styled.div`
  display: flex;
  justify-content: space-evenly;
  cursor: pointer;
  margin-top: ${doubleSpacer};
  margin-bottom: ${baseSpacer};
`

const Tab = styled.div`
  transition: all 0.2s ease-in-out;
  text-align: center;
  border-bottom: 4px solid;
  border-bottom-color: ${(props: { active: boolean }) =>
    props.active ? 'var(--color-primary)' : 'transparent'};
  cursor: pointer;
  color: ${(props) => (props.active ? 'var(--color-primary)' : 'var(--color-text)')};
  padding: ${halfSpacer};
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
`

const Divider = styled.div`
  border-bottom: ${baseBorderStyle};
  line-height: 0;
  margin: ${doubleSpacer} 0;
  width: 100%;
  text-align: center;

  & span {
    background: var(--color-backgroundAlt);
    color: var(--color-text);
    padding: 0 ${baseSpacer};
    font-size: ${fontSizeSmall};
    font-weight: bold;
  }
`

export const Auth = () => {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const profile = useSelector((state: AppState) => state.firebase.profile)
  const router = useRouter()

  const hasAccount = !!Cookies.get('hasAccount')

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(hasAccount ? 'login' : 'signup')
  const [loginState, setLoginState] = useState<'start' | 'signingInWithEmail'>('start')

  useEffect(() => {
    if (
      !!auth &&
      auth.isLoaded &&
      !auth.isEmpty &&
      !!profile &&
      profile.isLoaded &&
      !profile.isEmpty
    ) {
      if (!hasAccount) {
        // set a cookie so we know they've created an account, and default to the login form next time
        Cookies.set('hasAccount', 'true')
      }
    }
  }, [auth, profile, router, hasAccount])

  return (
    <PageContainer>
      <Head>
        <title>Log In | Packup</title>
      </Head>
      <Row>
        <Column sm={8} smOffset={2} md={6} mdOffset={3}>
          <Tabs>
            <Tab active={activeTab === 'signup'} onClick={() => setActiveTab('signup')}>
              Signup
            </Tab>
            <Tab active={activeTab === 'login'} onClick={() => setActiveTab('login')}>
              Login
            </Tab>
          </Tabs>
          <Box>
            <AnimatedContainer>
              <div aria-hidden={loginState !== 'start'}>
                <Heading align="center" as="h2">
                  {activeTab === 'signup' ? 'Hello there! ' : 'Welcome Back'}
                </Heading>
                <p style={{ textAlign: 'center' }}>
                  {activeTab === 'signup'
                    ? 'Create an account to keep track of your gear and start planning your first trip today.'
                    : 'Log in to access your digital gear inventory and custom packing lists for your adventures'}
                </p>
                {activeTab === 'signup' ? (
                  <>
                    <SignupForm email={router.query.email as string} />
                    <p style={{ marginTop: doubleSpacer }}>
                      Already have an account?{' '}
                      <Button type="button" onClick={() => setActiveTab('login')} color="text">
                        Log in here! &rarr;
                      </Button>
                    </p>
                  </>
                ) : (
                  <>
                    <LoginForm setLoginState={setLoginState} setActiveTab={setActiveTab} />
                    <p style={{}}>
                      <small>
                        What is passwordless login?{' '}
                        <Link href="/passwordless">Learn more here</Link>
                      </small>
                    </p>
                    <p style={{ marginTop: doubleSpacer }}>
                      Don&apos;t have an account yet?{' '}
                      <Button type="button" onClick={() => setActiveTab('signup')} color="text">
                        Sign up here! &rarr;
                      </Button>
                    </p>
                    <Divider>
                      <span>OR</span>
                    </Divider>
                    <p style={{ marginTop: doubleSpacer }}>
                      <Link href="/login-with-password">Sign in with an email and password</Link>
                    </p>
                  </>
                )}
                {/* <FirebaseAuthWrapper /> */}
              </div>
              <div aria-hidden={loginState !== 'signingInWithEmail'}>
                <FlexContainer justifyContent="center" alignItems="center" flexDirection="column">
                  <FlexContainer alignItems="center" justifyContent="center">
                    <FaCheckCircle
                      size={tripleSpacer}
                      style={{ marginRight: baseSpacer }}
                      color={brandSuccess}
                    />
                    <Heading as="h2" noMargin>
                      Check your email!
                    </Heading>
                  </FlexContainer>
                  <p style={{ marginTop: baseSpacer }}>
                    A &ldquo;magic link&rdquo; has been emailed to you, containing a link you can
                    click to log in. It should show up in your inbox within 30 seconds or so.
                  </p>
                  <p>
                    <small>
                      If you don&apos;t see an email, it might be hiding in the
                      &ldquo;promotions&rdquo; tab or your spam folder.
                    </small>
                  </p>
                  <Button
                    color="tertiary"
                    type="button"
                    onClick={() => setLoginState('start')}
                    size="small"
                    iconLeft={<FaChevronLeft />}
                  >
                    Start Over
                  </Button>
                </FlexContainer>
              </div>
            </AnimatedContainer>
          </Box>
        </Column>
      </Row>
    </PageContainer>
  )
}
