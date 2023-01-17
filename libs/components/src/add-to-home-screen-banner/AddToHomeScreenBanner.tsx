import { Button, FlexContainer } from '..'
import logo from '../../images/maskable_icon.png'
import { AppState } from '@getpackup-group/redux'
import { white, zIndexModal, doubleSpacer, halfSpacer } from '@getpackup-group/styles'
import differenceInDays from 'date-fns/differenceInDays'
import { FunctionComponent, useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import styled from 'styled-components'

const AddToHomeScreenWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  background-color: ${white};
  z-index: ${zIndexModal};
  padding: ${halfSpacer};
`

export const AddToHomeScreenBanner: FunctionComponent = () => {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const trips = useSelector((state: AppState) => state.firestore.ordered['trips'])
  const isAuthenticated = auth && !auth.isEmpty
  const [isLoaded, setIsLoaded] = useState(false)
  const [isOpen, setOpened] = useState(false)

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

  const LOCAL_STORAGE_KEY = 'packup_pwa_popup_display'
  const NB_DAYS_EXPIRE = 30 // only ask once every 30 days, so we don't annoy

  const checkLastPwaDisplay = () => {
    const lastDisplayTimestamp = window.localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!lastDisplayTimestamp) return true
    return differenceInDays(new Date(lastDisplayTimestamp), new Date()) > NB_DAYS_EXPIRE
  }
  const saveLastPwaDisplay = () => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, String(new Date()))
    setOpened(false)
  }

  useEffect(() => {
    setIsLoaded(true)

    const t = setTimeout(() => {
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('isIOS: ', isIos());
      //   console.log('isInStandaloneMode: ', isInStandaloneMode());
      //   console.log('checkLastPwaDisplay: ', checkLastPwaDisplay());
      // }
      if (
        isAuthenticated &&
        trips &&
        trips.length > 0 &&
        (pathname === '' || pathname === '/') &&
        isIos() &&
        !isInStandaloneMode() &&
        checkLastPwaDisplay() &&
        getPWADisplayMode() === 'browser'
      ) {
        setOpened(true)
      }
    }, 5000)
    return () => {
      if (t) clearTimeout(t)
    }
  }, [])

  if (!isLoaded) return null

  return isOpen ? (
    <AddToHomeScreenWrapper>
      <FlexContainer justifyContent="space-between">
        <FlexContainer>
          <Image
            src={logo}
            alt=""
            width={doubleSpacer}
            height={doubleSpacer}
            style={{
              marginRight: halfSpacer,
              borderRadius: halfSpacer,
            }}
          />
          <span style={{ lineHeight: 1 }}>
            <strong>packup</strong>
            <br />
            <small>Adventure made easy.</small>
          </span>
        </FlexContainer>
        <FlexContainer>
          <Button
            type="link"
            to="/install"
            onClick={() => saveLastPwaDisplay()}
            size="small"
            color="success"
            rightSpacer
          >
            Install
          </Button>
          <FaTimes onClick={() => saveLastPwaDisplay()} />
        </FlexContainer>
      </FlexContainer>
    </AddToHomeScreenWrapper>
  ) : null
}

export default AddToHomeScreenBanner
