import {
  AnimatedContainer,
  Box,
  Button,
  Column,
  FirebaseAuthWrapper,
  FlexContainer,
  Heading,
  LoginForm,
  PageContainer,
  Row,
  SignupForm,
} from '@packup/components'
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
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaChevronLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Tabs = styled.div`
  display: flex;
  justify-content: space-evenly;
  cursor: pointer;
  margin-top: ${baseSpacer};
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
  padding: ${halfSpacer} 0;
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

export default function Login() {
  const auth = useSelector((state: AppState) => state.firebase.auth)

  const router = useRouter()

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const [loginState, setLoginState] = useState<'start' | 'signingInWithEmail'>('start')

  useEffect(() => {
    if (!!auth && auth.isLoaded && !auth.isEmpty) {
      router.push('/')
    }
  }, [auth, router])

  return (
    <PageContainer>
      <Head>
        <title>Log In | Packup</title>
      </Head>
      <Row>
        <Column sm={8} smOffset={2} md={6} mdOffset={3}>
          <Tabs>
            <Tab active={activeTab === 'login'} onClick={() => setActiveTab('login')}>
              Login
            </Tab>
            <Tab active={activeTab === 'signup'} onClick={() => setActiveTab('signup')}>
              Signup
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
                    : 'Login to access your digital gear inventory and custom packing lists for your adventures'}
                </p>
                {activeTab === 'signup' ? (
                  <SignupForm />
                ) : (
                  <LoginForm setLoginState={setLoginState} />
                )}
                <Divider>
                  <span>OR</span>
                </Divider>
                <FirebaseAuthWrapper />
              </div>
              <div aria-hidden={loginState !== 'signingInWithEmail'}>
                <FlexContainer justifyContent="center" alignItems="center" flexDirection="column">
                  <FaCheckCircle
                    size={tripleSpacer}
                    style={{ margin: tripleSpacer }}
                    color={brandSuccess}
                  />
                  <Heading as="h2">Check your email!</Heading>
                  <p>
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
