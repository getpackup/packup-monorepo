/* eslint-disable @typescript-eslint/no-explicit-any */
// Note: imported 'isomorphic-fetch' this way so that in reducer tests we can mock Fetch/Response
import 'isomorphic-fetch'

// import * as Sentry from '@sentry/nextjs';
/* eslint-disable no-underscore-dangle */
import { applyMiddleware, compose, createStore } from 'redux'
import { apiMiddleware } from 'redux-api-middleware'
import * as Sentry from '@sentry/react'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import requestHeaders from './middleware/requestHeaders'
import oauth from './middleware/oauth'
import logger from './middleware/logger'
import rootReducer from './ducks'
import { clientInitialState } from './ducks/client'

// Can't get it to work from types folder
declare global {
  interface Window {
    __ENVIRONMENT: any
    __REDUX_DEVTOOLS_EXTENSION__: any
  }
}

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  // Optionally pass options
})

export const getMiddlewares = () => [oauth, requestHeaders, apiMiddleware, thunk]

const middlewares = getMiddlewares()
const isBrowser = typeof window !== 'undefined'

if (process.env.ENVIRONMENT !== 'PRODUCTION') {
  middlewares.push(logger)
}

const functionsToCompose = [applyMiddleware(...middlewares), sentryReduxEnhancer]

// eslint-disable-next-line
if (isBrowser) {
  functionsToCompose.push(
    typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f: any) => f
  )
}

const makeConfiguredStore = (reducer: any, initialState: any) => {
  const persistConfig = {
    key: 'packup',
    storage,
  }
  const persistedReducer = persistReducer(persistConfig, reducer)

  return createStore(persistedReducer, initialState, compose(...functionsToCompose))
}

const configureStore = (
  initialState:
    | string
    | {
        client: typeof clientInitialState
      }
) => {
  const store = { ...makeConfiguredStore(rootReducer, initialState) }
  const persistor = persistStore(store)

  return { store, persistor }
}

export default configureStore
