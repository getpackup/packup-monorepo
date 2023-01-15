import { RootState, removeAttemptedPrivatePage } from '@getpackup-group/redux'
import {
  brandPrimary,
  baseBorderStyle,
  baseAndAHalfSpacer,
  borderRadius,
  halfSpacer,
  fontFamilySansSerif,
  fontSizeBase,
} from '@getpackup-group/styles'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import styled from 'styled-components'
import { onAuthStateChanged } from 'firebase/auth'
import 'firebaseui/dist/firebaseui.css'
import { auth } from 'firebaseui'
import { getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const StyledFirebaseAuthWrapper = styled.div`
  & .firebaseui-container {
    max-width: 100%;
    font-size: ${fontSizeBase};
  }

  & .firebaseui-card-content {
    padding: 0;
  }

  & .firebaseui-idp-list {
    margin: 0;
  }

  & .firebaseui-idp-button {
    border-radius: ${borderRadius};
    box-shadow: none;
    border: ${baseBorderStyle};
  }

  & .mdl-button {
    font-family: ${fontFamilySansSerif};
    line-height: 1.5;
    padding: ${halfSpacer} ${baseAndAHalfSpacer};
    max-width: 100%;
    font-size: ${fontSizeBase};
    display: flex;
    justify-content: center;
  }

  & .firebaseui-idp-text {
    font-size: ${fontSizeBase};
  }

  & .firebaseui-link {
    color: ${brandPrimary};
  }
`

// see https://github.com/firebase/firebaseui-web-react/pull/173 for more info
interface Props {
  // The Firebase UI Web UI Config object.
  // See: https://github.com/firebase/firebaseui-web#configuration
  // uiConfig: auth.Config
  // Callback that will be passed the FirebaseUi instance before it is
  // started. This allows access to certain configuration options such as
  // disableAutoSignIn().
  uiCallback?(ui: auth.AuthUI): void
  // The Firebase App auth instance to use.
  // firebaseAuth: any // As firebaseui-web
  className?: string
}

export const FirebaseAuthWrapper = ({ className, uiCallback }: Props) => {
  const [firebaseui, setFirebaseui] = useState<typeof import('firebaseui') | null>(null)
  const [userSignedIn, setUserSignedIn] = useState(false)
  const elementRef = useRef(null)
  const app = getApp()
  const auth = getAuth(app)

  const firebase = useFirebase()
  const dispatch = useDispatch()
  const client = useSelector((state: RootState) => state.client)
  const router = useRouter()

  const signInProviders =
    typeof window !== 'undefined'
      ? [
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          firebase.auth.GithubAuthProvider.PROVIDER_ID,
        ]
      : []

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: signInProviders,
    callbacks: {
      signInSuccessWithAuthResult: () => {
        if (client.location) {
          dispatch(removeAttemptedPrivatePage())
          router.push(client.location)
        } else {
          router.push('/')
        }
      },
    },
    tosUrl: 'https://getpackup.com/terms',
    privacyPolicyUrl: 'https://getpackup.com/privacy',
  }

  useEffect(() => {
    // Firebase UI only works on the Client. So we're loading the package only after
    // the component has mounted, so that this works when doing server-side rendering.
    setFirebaseui(require('firebaseui'))
  }, [])

  useEffect(() => {
    if (firebaseui === null) return

    // Get or Create a firebaseUI instance.
    const firebaseUiWidget =
      firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth)
    if (uiConfig.signInFlow === 'popup') firebaseUiWidget.reset()

    // We track the auth state to reset firebaseUi if the user signs out.
    const unregisterAuthObserver = onAuthStateChanged(auth, (user) => {
      if (!user && userSignedIn) firebaseUiWidget.reset()
      setUserSignedIn(!!user)
    })

    // Trigger the callback if any was set.
    if (uiCallback) uiCallback(firebaseUiWidget)

    // Render the firebaseUi Widget.
    // @ts-ignore
    firebaseUiWidget.start(elementRef.current, uiConfig)

    return () => {
      unregisterAuthObserver()
      firebaseUiWidget.reset()
    }
  }, [firebaseui, uiConfig])

  return (
    <StyledFirebaseAuthWrapper>
      <div className={className} ref={elementRef} />
    </StyledFirebaseAuthWrapper>
  )
}

export default FirebaseAuthWrapper
