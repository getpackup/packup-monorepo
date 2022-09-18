import firebase from 'firebase/app'
// eslint-disable-next-line import/no-duplicates
import 'firebase/auth'
// eslint-disable-next-line import/no-duplicates
import 'firebase/firestore'
import React from 'react'
import { Provider } from 'react-redux'
import { FirebaseReducer, FirestoreReducer, ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import { PersistGate } from 'redux-persist/integration/react'
import {
  showWorkerUpdateModal,
  initialState as workerUpdateInitialState,
} from './ducks/workerUpdateReady'
import { initialState as clientInitialState } from './ducks/client'
import configureStore from './configureStore'
import { initialState as globalAlertsInitialState } from './ducks/globalAlerts'

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
    process.env.SITE_URL === 'https://getpackup.com'
      ? process.env.FIREBASE_API_KEY
      : process.env.FIREBASE_TEST_API_KEY,
  authDomain:
    process.env.SITE_URL === 'https://getpackup.com'
      ? process.env.FIREBASE_AUTH_DOMAIN
      : process.env.FIREBASE_TEST_AUTH_DOMAIN,
  databaseURL:
    process.env.SITE_URL === 'https://getpackup.com'
      ? process.env.FIREBASE_DATABASE_URL
      : process.env.FIREBASE_TEST_DATABASE_URL,
  projectId:
    process.env.SITE_URL === 'https://getpackup.com'
      ? process.env.FIREBASE_PROJECT_ID
      : process.env.FIREBASE_TEST_PROJECT_ID,
  storageBucket:
    process.env.SITE_URL === 'https://getpackup.com'
      ? process.env.FIREBASE_STORAGE_BUCKET
      : process.env.FIREBASE_TEST_STORAGE_BUCKET,
  messagingSenderId:
    process.env.SITE_URL === 'https://getpackup.com'
      ? process.env.FIREBASE_MESSAGING_SENDER_ID
      : process.env.FIREBASE_TEST_MESSAGING_SENDER_ID,
  appId:
    process.env.SITE_URL === 'https://getpackup.com'
      ? process.env.FIREBASE_APP_ID
      : process.env.FIREBASE_TEST_APP_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

if (process.env.ENVIRONMENT === 'DEVELOP') {
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
