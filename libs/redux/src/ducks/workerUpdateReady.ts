import {
  HIDE_UPDATE_MODAL,
  SHOW_UPDATE_MODAL,
  WorkerUpdateActions,
  WorkerUpdateStoreType,
} from './workerUpdateReady.d'

const initialState: WorkerUpdateStoreType = {
  display: false,
}

export default (
  action: WorkerUpdateActions,
  state: WorkerUpdateStoreType = initialState
): WorkerUpdateStoreType => {
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
