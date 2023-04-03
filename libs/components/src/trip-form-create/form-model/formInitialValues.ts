import { TripFormType } from '@packup/common'

/*
 * This function is used to initialize the form values
 */
const getInitValues = (ownerId: string): TripFormType => {
  return {
    owner: ownerId,
    tripId: '',
    name: '',
    description: '',
    startingPoint: '',
    season: undefined,
    startDate: undefined,
    endDate: undefined,
    timezoneOffset: new Date().getTimezoneOffset(),
    lat: 0,
    lng: 0,
    // created: undefined,
    // updated: undefined,
    // tripMembers: {},
    // tags: [],
    tripLength: 1,
    headerImage: '',
    archived: false,
    // collapsedCategories: {},
  };
};

export default getInitValues;
