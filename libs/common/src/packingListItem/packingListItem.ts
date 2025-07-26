import { ItemLabel } from '../item-label/item-label';

export type PackedByUserType = {
  uid: string
  quantity: number
  isShared: boolean
}

export type PackingListItemType = {
  category: string
  created: firebase.default.firestore.Timestamp
  description?: string
  id: string
  isEssential: boolean
  isPacked: boolean
  isSponsored?: boolean
  name: string
  packedBy: PackedByUserType[]
  quantity: number
  updated?: firebase.default.firestore.Timestamp
  weight?: string
  weightUnit?: 'g' | 'kg' | 'oz' | 'lb'
  labels?: ItemLabel[]
}
