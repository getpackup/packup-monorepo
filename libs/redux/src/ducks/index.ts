// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { UserType } from '@getpackup-group/common'
import { FirebaseReducer, firebaseReducer, FirestoreReducer } from 'react-redux-firebase'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import clientReducer from './client'
import { ClientStoreType } from './client.d'
import globalAlertsReducer from './globalAlerts'
import { GlobalAlertsStoreType } from './globalAlerts.d'
import workerUpdateReadyReducer from './workerUpdateReady'
import { WorkerUpdateStoreType } from './workerUpdateReady.d'

export type RootState = {
  firebase: FirebaseReducer.Reducer<FirebaseReducer.Profile<UserType>>
  firestore: FirestoreReducer.Reducer
  client: ClientStoreType
  globalAlerts: GlobalAlertsStoreType
  workerUpdateReady: WorkerUpdateStoreType
}

const rootReducer = combineReducers<RootState>({
  client: clientReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  globalAlerts: globalAlertsReducer,
  workerUpdateReady: workerUpdateReadyReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
