import firebase from 'firebase/compat'

export enum TripMemberStatus {
  /** User is the one who created the trip */
  Owner = 'Owner',
  /** User has been invited, but not yet accepted */
  Pending = 'Pending',
  /** User has accepted  */
  Accepted = 'Accepted',
  /** User declined the invitation */
  Declined = 'Declined',
  /** Removed by trip owner */
  Removed = 'Removed',
}

export type TripMember = {
  invitedAt: firebase.firestore.Timestamp
  declinedAt?: firebase.firestore.Timestamp
  acceptedAt?: firebase.firestore.Timestamp
  removedAt?: firebase.firestore.Timestamp
  status: TripMemberStatus
  uid: string
  invitedBy?: string
}

export type TripType = {
  owner: string
  tripId: string
  name: string
  description: string
  startingPoint: string
  season?: 'spring' | 'summer' | 'autumn' | 'winter'
  startDate: firebase.firestore.Timestamp
  endDate: firebase.firestore.Timestamp
  timezoneOffset: number
  lat: number
  lng: number
  created?: firebase.firestore.Timestamp
  updated?: firebase.firestore.Timestamp
  tripMembers: { [key: string]: TripMember } // note keys are UIDs, but uid is also in object. Use Object.(keys/values) everywhere to get what you need
  tags: Array<string>
  tripLength: number
  headerImage?: string
  archived?: boolean
  collapsedCategories?: { [key: string]: string[] }
}

export type TripFormType = Omit<TripType, 'startDate' | 'endDate'> & {
  startDate: string | Date | undefined
  endDate: string | Date | undefined
}
