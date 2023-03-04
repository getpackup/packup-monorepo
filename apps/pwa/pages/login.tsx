import {
  Box,
  Column,
  FirebaseAuthWrapper,
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
  brandPrimary,
  doubleSpacer,
  fontSizeH5,
  fontSizeSmall,
  halfSpacer,
  textColor,
  textColorLight,
  white,
} from '@packup/styles'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Tabs = styled.div`
  display: flex;
  justify-content: space-evenly;
  cursor: pointer;
  margin-bottom: ${baseSpacer};
`

const Tab = styled.div`
  transition: all 0.2s ease-in-out;
  text-align: center;
  border-bottom: 4px solid;
  border-bottom-color: ${(props: { active: boolean }) =>
    props.active ? brandPrimary : 'transparent'};
  cursor: pointer;
  // font-size: ${fontSizeH5};
  color: ${(props) => (props.active ? brandPrimary : textColor)};
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
    background: ${white};
    color: ${textColorLight};
    padding: 0 ${baseSpacer};
    font-size: ${fontSizeSmall};
    font-weight: bold;
  }
`

export default function Login() {
  const auth = useSelector((state: AppState) => state.firebase.auth)

  const router = useRouter()

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')

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
            <Heading align="center" as="h2">
              {activeTab === 'signup' ? 'Hello there! ' : 'Welcome Back'}
            </Heading>
            <p style={{ textAlign: 'center' }}>
              {activeTab === 'signup'
                ? 'Create an account to keep track of your gear and start planning your first trip today.'
                : 'Login to access your digital gear inventory and custom packing lists for your adventures'}
            </p>
            {activeTab === 'signup' ? <SignupForm /> : <LoginForm />}
            <Divider>
              <span>OR</span>
            </Divider>
            <FirebaseAuthWrapper />
          </Box>
        </Column>
      </Row>
    </PageContainer>
  )
}
