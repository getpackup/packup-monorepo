import React from 'react'
import firebase from 'firebase/app'
import 'firebase/firestore'
import { Provider } from 'react-redux'
import { FirebaseReducer, FirestoreReducer, ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { PersistGate } from 'redux-persist/integration/react'
import {
  showWorkerUpdateModal,
  initialState as workerUpdateInitialState,
} from './ducks/workerUpdateReady'
import { initialState as globalAlertsInitialState } from './ducks/globalAlerts'
import { initialState as clientInitialState } from './ducks/client'
import configureStore from './configureStore'

export const initialState = process.env.BROWSER // eslint-disable-next-line no-underscore-dangle
  ? window.__INITIAL_STATE__
  : {
      firestore: {} as typeof FirestoreReducer,
      firebase: {} as FirebaseReducer.Reducer<any, any>,
      client: clientInitialState,
      globalAlerts: globalAlertsInitialState,
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
    process.env.GATSBY_SITE_URL === 'https://getpackup.com'
      ? process.env.GATSBY_FIREBASE_API_KEY
      : process.env.GATSBY_FIREBASE_TEST_API_KEY,
  authDomain:
    process.env.GATSBY_SITE_URL === 'https://getpackup.com'
      ? process.env.GATSBY_FIREBASE_AUTH_DOMAIN
      : process.env.GATSBY_FIREBASE_TEST_AUTH_DOMAIN,
  databaseURL:
    process.env.GATSBY_SITE_URL === 'https://getpackup.com'
      ? process.env.GATSBY_FIREBASE_DATABASE_URL
      : process.env.GATSBY_FIREBASE_TEST_DATABASE_URL,
  projectId:
    process.env.GATSBY_SITE_URL === 'https://getpackup.com'
      ? process.env.GATSBY_FIREBASE_PROJECT_ID
      : process.env.GATSBY_FIREBASE_TEST_PROJECT_ID,
  storageBucket:
    process.env.GATSBY_SITE_URL === 'https://getpackup.com'
      ? process.env.GATSBY_FIREBASE_STORAGE_BUCKET
      : process.env.GATSBY_FIREBASE_TEST_STORAGE_BUCKET,
  messagingSenderId:
    process.env.GATSBY_SITE_URL === 'https://getpackup.com'
      ? process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID
      : process.env.GATSBY_FIREBASE_TEST_MESSAGING_SENDER_ID,
  appId:
    process.env.GATSBY_SITE_URL === 'https://getpackup.com'
      ? process.env.GATSBY_FIREBASE_APP_ID
      : process.env.GATSBY_FIREBASE_TEST_APP_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

if (process.env.GATSBY_ENVIRONMENT === 'DEVELOP') {
  // eslint-disable-next-line no-console
  // console.log(`Development Env: Using Firestore Emulator`);
  // firebase.firestore().useEmulator('localhost', 8083);
} else {
  firebase.firestore()
}

export const onWorkerUpdateReady = () => store.dispatch(showWorkerUpdateModal())

export function ReduxWrapper(props) {
  return (
    <Provider store={store}>
      {typeof window !== 'undefined' ? (
        <ReactReduxFirebaseProvider {...rrfProps}>
          <PersistGate loading={null} persistor={persistor}>
            {props.children}
          </PersistGate>
        </ReactReduxFirebaseProvider>
      ) : (
        props.children
      )}
    </Provider>
  )
}

export default ReduxWrapper