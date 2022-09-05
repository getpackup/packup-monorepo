import { FirebaseReducer, firebaseReducer } from 'react-redux-firebase'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import client from './client'
import { ClientStoreType } from './client.d'
import globalAlerts from './globalAlerts'
import { GlobalAlertsStoreType } from './globalAlerts.d'
import workerUpdateReady from './workerUpdateReady'
import { WorkerUpdateStoreType } from './workerUpdateReady.d'

export type RootState = {
  firebase: FirebaseReducer.Reducer<any, any>
  firestore: any
  client: ClientStoreType
  globalAlerts: GlobalAlertsStoreType
  workerUpdateReady: WorkerUpdateStoreType
}

export const rootReducer = combineReducers<RootState>({
  client,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  globalAlerts,
  workerUpdateReady,
})
