// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { PackingListFilterOptions, TabOptions } from '@packup/utils'

import { ClientActions, ClientStoreType } from './client.d'

export const ADD_ATTEMPTED_PRIVATE_PAGE = 'ADD_ATTEMPTED_PRIVATE_PAGE'
export const REMOVE_ATTEMPTED_PRIVATE_PAGE = 'REMOVE_ATTEMPTED_PRIVATE_PAGE'

export const SET_LABEL_LIST_FILTER = 'SET_LABEL_LIST_FILTER'
export const SET_ACTIVE_PACKING_LIST_FILTER = 'SET_ACTIVE_PACKING_LIST_FILTER'
export const SET_ACTIVE_PACKING_LIST_TAB = 'SET_ACTIVE_PACKING_LIST_TAB'

export const SET_PERSONAL_LIST_SCROLL_POSITION = 'SET_PERSONAL_LIST_SCROLL_POSITION'
export const SET_SHARED_LIST_SCROLL_POSITION = 'SET_SHARED_LIST_SCROLL_POSITION'

export const SET_TRIPS_DEFAULT_VIEW = 'SET_TRIPS_DEFAULT_VIEW'

export const SET_PACKING_LIST_SEARCH_VALUE = 'SET_PACKING_LIST_SEARCH_VALUE'

export const SET_ACTIVE_PACKING_LIST_ITEM_BEING_EDITED = 'SET_ACTIVE_PACKING_LIST_ITEM_BEING_EDITED'

export const clientInitialState: ClientStoreType = {
  location: undefined,
  activePackingListFilter: PackingListFilterOptions.All,
  activePackingListTab: TabOptions.Personal,
  personalListScrollPosition: 0,
  sharedListScrollPosition: 0,
  tripsDefaultView: 'list',
  packingListSearchValue: '',
  packingListItemBeingEdited: undefined,
  gearItemLabels: [],
  activeLabelFilters: [],
}

export default function clientReducer(
  // eslint-disable-next-line default-param-last
  state: ClientStoreType = clientInitialState,
  action: ClientActions
): ClientStoreType {
  if (typeof action === 'undefined') {
    return state
  }

  switch (action.type) {
    case ADD_ATTEMPTED_PRIVATE_PAGE: {
      return {
        ...state,
        location: action.payload,
      }
    }
    case REMOVE_ATTEMPTED_PRIVATE_PAGE: {
      return {
        ...state,
        location: undefined,
      }
    }
    case SET_LABEL_LIST_FILTER: {
      return {
        ...state,
        activeLabelFilters: action.ids,
      }
    }
    case SET_ACTIVE_PACKING_LIST_FILTER: {
      return {
        ...state,
        activePackingListFilter: action.payload,
      }
    }
    case SET_ACTIVE_PACKING_LIST_TAB: {
      return {
        ...state,
        activePackingListTab: action.payload,
      }
    }
    case SET_PERSONAL_LIST_SCROLL_POSITION: {
      return {
        ...state,
        personalListScrollPosition: action.payload,
      }
    }
    case SET_SHARED_LIST_SCROLL_POSITION: {
      return {
        ...state,
        sharedListScrollPosition: action.payload,
      }
    }
    case SET_TRIPS_DEFAULT_VIEW: {
      return {
        ...state,
        tripsDefaultView: action.payload,
      }
    }
    case SET_PACKING_LIST_SEARCH_VALUE: {
      return {
        ...state,
        packingListSearchValue: action.payload,
      }
    }
    case SET_ACTIVE_PACKING_LIST_ITEM_BEING_EDITED: {
      return {
        ...state,
        packingListItemBeingEdited: action.payload,
      }
    }
    default:
      return state
  }
}

export const addAttemptedPrivatePage = (payload: string) => ({
  type: ADD_ATTEMPTED_PRIVATE_PAGE,
  payload,
})

export const removeAttemptedPrivatePage = () => ({
  type: REMOVE_ATTEMPTED_PRIVATE_PAGE,
})

export const setActivePackingListFilter = (payload: PackingListFilterOptions) => ({
  type: SET_ACTIVE_PACKING_LIST_FILTER,
  payload,
})

export const setLabelListFilter = (ids: Array<string>) => ({
  type: SET_LABEL_LIST_FILTER,
  ids,
})

export const setActivePackingListTab = (payload: TabOptions) => ({
  type: SET_ACTIVE_PACKING_LIST_TAB,
  payload,
})

export const setPersonalListScrollPosition = (payload: number) => ({
  type: SET_PERSONAL_LIST_SCROLL_POSITION,
  payload,
})

export const setSharedListScrollPosition = (payload: number) => ({
  type: SET_SHARED_LIST_SCROLL_POSITION,
  payload,
})

export const setTripsDefaultView = (payload: 'list' | 'calendar') => ({
  type: SET_TRIPS_DEFAULT_VIEW,
  payload,
})

export const setPackingListSearchValue = (payload: string) => ({
  type: SET_PACKING_LIST_SEARCH_VALUE,
  payload,
})

export const setActivePackingListItemBeingEdited = (payload: string | undefined) => ({
  type: SET_ACTIVE_PACKING_LIST_ITEM_BEING_EDITED,
  payload,
})
