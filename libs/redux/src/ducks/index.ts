// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserType } from '@packup/common'
import { FirebaseReducer, firebaseReducer, FirestoreReducer } from 'react-redux-firebase'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'

import clientReducer from './client'
import { ClientStoreType } from './client.d'
import workerUpdateReadyReducer from './workerUpdateReady'
import { WorkerUpdateStoreType } from './workerUpdateReady.d'

export type RootState = {
  firebase: FirebaseReducer.Reducer<FirebaseReducer.Profile<UserType>>
  firestore: FirestoreReducer.Reducer
  client: ClientStoreType
  workerUpdateReady: WorkerUpdateStoreType
}

const rootReducer = combineReducers<RootState>({
  client: clientReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  workerUpdateReady: workerUpdateReadyReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
