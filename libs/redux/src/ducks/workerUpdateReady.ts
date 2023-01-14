import {
  HIDE_UPDATE_MODAL,
  SHOW_UPDATE_MODAL,
  WorkerUpdateActions,
  WorkerUpdateStoreType,
} from './workerUpdateReady.d'

export const workerUpdateInitialState: WorkerUpdateStoreType = {
  display: false,
}

export default function workerUpdateReadyReducer(
  // eslint-disable-next-line default-param-last
  state: WorkerUpdateStoreType = workerUpdateInitialState,
  action: WorkerUpdateActions
): WorkerUpdateStoreType {
  if (typeof action === 'undefined') {
    return state
  }

  switch (action.type) {
    case SHOW_UPDATE_MODAL: {
      return {
        display: true,
      }
    }
    case HIDE_UPDATE_MODAL: {
      return {
        display: false,
      }
    }
    default:
      return state
  }
}

export const showWorkerUpdateModal = () => ({
  type: SHOW_UPDATE_MODAL,
})

export const hideWorkerUpdateModal = () => ({
  type: HIDE_UPDATE_MODAL,
})
