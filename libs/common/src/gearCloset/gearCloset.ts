/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { ActivityTypes } from '@getpackup-group/utils'
import firebase from 'firebase/compat'

export type GearClosetType = {
  id: string
  owner: string
  removals: string[]
  categories: string[]
}

export type GearItemType = {
  id: string
  name: string
  category: string
  created?: firebase.firestore.Timestamp
  updated?: firebase.firestore.Timestamp
  essential: boolean
  isCustomGearItem?: boolean
  weight?: string
  weightUnit?: 'g' | 'kg' | 'oz' | 'lb'
  description?: string
  quantity?: number
} & ActivityTypes