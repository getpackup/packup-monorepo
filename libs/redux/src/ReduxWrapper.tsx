/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable no-underscore-dangle */
/* eslint-disable dot-notation */
// eslint-disable-next-line import/no-duplicates
import 'firebase/compat/auth'
// eslint-disable-next-line import/no-duplicates
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

import { UserType } from '@packup/common'
import { LoadingPage } from '@packup/components'
import firebase from 'firebase/compat/app'
import * as React from 'react'
import { Provider, useSelector } from 'react-redux'
import {
  FirebaseReducer,
  FirestoreReducer,
  isLoaded,
  ReactReduxFirebaseProvider,
} from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { PersistGate } from 'redux-persist/integration/react'

import { AppState } from '.'
import configureStore from './configureStore'
import { clientInitialState } from './ducks/client'
import { showWorkerUpdateModal, workerUpdateInitialState } from './ducks/workerUpdateReady'

const initialState = process.env['BROWSER']
  ? window.__INITIAL_STATE__
  : {
      firestore: {} as typeof FirestoreReducer,
      firebase: {} as FirebaseReducer.Profile<UserType>,
      client: clientInitialState,
      workerUpdateReady: workerUpdateInitialState,
    }
const { store, persistor } = configureStore(initialState)

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance, // since we are using Firestore
}

const firebaseConfig = {
  apiKey:
    process.env['NODE_ENV'] !== 'development'
      ? process.env['NX_FIREBASE_API_KEY']
      : process.env['NX_FIREBASE_TEST_API_KEY'],
  authDomain:
    process.env['NODE_ENV'] !== 'development'
      ? process.env['NX_FIREBASE_AUTH_DOMAIN']
      : process.env['NX_FIREBASE_TEST_AUTH_DOMAIN'],
  databaseURL:
    process.env['NODE_ENV'] !== 'development'
      ? process.env['NX_FIREBASE_DATABASE_URL']
      : process.env['NX_FIREBASE_TEST_DATABASE_URL'],
  projectId:
    process.env['NODE_ENV'] !== 'development'
      ? process.env['NX_FIREBASE_PROJECT_ID']
      : process.env['NX_FIREBASE_TEST_PROJECT_ID'],
  storageBucket:
    process.env['NODE_ENV'] !== 'development'
      ? process.env['NX_FIREBASE_STORAGE_BUCKET']
      : process.env['NX_FIREBASE_TEST_STORAGE_BUCKET'],
  messagingSenderId:
    process.env['NODE_ENV'] !== 'development'
      ? process.env['NX_FIREBASE_MESSAGING_SENDER_ID']
      : process.env['NX_FIREBASE_TEST_MESSAGING_SENDER_ID'],
  appId:
    process.env['NODE_ENV'] !== 'development'
      ? process.env['NX_FIREBASE_APP_ID']
      : process.env['NX_FIREBASE_TEST_APP_ID'],
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

if (process.env['ENVIRONMENT'] === 'DEVELOP') {
  // eslint-disable-next-line no-console
  // console.log(`Development Env: Using Firestore Emulator`);
  // firebase.firestore().useEmulator('localhost', 8083);
  firebase.firestore()
} else {
  firebase.firestore()
}

export const onWorkerUpdateReady = () => store.dispatch(showWorkerUpdateModal())

function AuthIsLoaded({ children }: { children: React.ReactNode }): JSX.Element {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  if (!isLoaded(auth)) return <LoadingPage />
  return children as JSX.Element
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ReduxWrapper(props: any) {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthIsLoaded>{props.children}</AuthIsLoaded>
        </PersistGate>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

export default ReduxWrapper
