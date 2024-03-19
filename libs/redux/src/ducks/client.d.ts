/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { PackingListFilterOptions, TabOptions } from '@packup/utils'

import {
  ADD_ATTEMPTED_PRIVATE_PAGE,
  REMOVE_ATTEMPTED_PRIVATE_PAGE,
  SET_ACTIVE_PACKING_LIST_FILTER,
  SET_ACTIVE_PACKING_LIST_ITEM_BEING_EDITED,
  SET_ACTIVE_PACKING_LIST_TAB,
  SET_PACKING_LIST_SEARCH_VALUE,
  SET_PERSONAL_LIST_SCROLL_POSITION,
  SET_SHARED_LIST_SCROLL_POSITION,
  SET_TRIPS_DEFAULT_VIEW,
  SET_GEAR_ITEM_LABELS,
} from './client'

export type ClientStoreType = {
  location?: string
  activePackingListFilter: PackingListFilterOptions
  activePackingListTab: TabOptions
  packingListSearchValue: string
  personalListScrollPosition: number
  sharedListScrollPosition: number
  tripsDefaultView: 'list' | 'calendar'
  packingListItemBeingEdited: undefined | string
  gearItemLabels: LabelItem[]
}

export type AddAttemptedPrivatePageAction = {
  type: typeof ADD_ATTEMPTED_PRIVATE_PAGE
  payload: string
}

export type RemoveAttemptedPrivatePageAction = {
  type: typeof REMOVE_ATTEMPTED_PRIVATE_PAGE
}

export type SetActivePackingListFilterAction = {
  type: typeof SET_ACTIVE_PACKING_LIST_FILTER
  payload: PackingListFilterOptions
}

export type SetActivePackingListTabAction = {
  type: typeof SET_ACTIVE_PACKING_LIST_TAB
  payload: TabOptions
}

export type SetPersonalListScrollPosition = {
  type: typeof SET_PERSONAL_LIST_SCROLL_POSITION
  payload: number
}

export type SetSharedListScrollPosition = {
  type: typeof SET_SHARED_LIST_SCROLL_POSITION
  payload: number
}

export type SetTripsDefaultView = {
  type: typeof SET_TRIPS_DEFAULT_VIEW
  payload: 'list' | 'calendar'
}

export type SetPackingListSearchValue = {
  type: typeof SET_PACKING_LIST_SEARCH_VALUE
  payload: string
}

export type SetActivePackingListItemBeingEdited = {
  type: typeof SET_ACTIVE_PACKING_LIST_ITEM_BEING_EDITED
  payload: item
}

export type SetGearItemLabels = {
  type: typeof SET_GEAR_ITEM_LABELS
  payload: LabelItem[]
}

export type ClientActions =
  | AddAttemptedPrivatePageAction
  | RemoveAttemptedPrivatePageAction
  | SetActivePackingListFilterAction
  | SetActivePackingListTabAction
  | SetPersonalListScrollPosition
  | SetSharedListScrollPosition
  | SetTripsDefaultView
  | SetPackingListSearchValue
  | SetActivePackingListItemBeingEdited
  | SetGearItemLabels
