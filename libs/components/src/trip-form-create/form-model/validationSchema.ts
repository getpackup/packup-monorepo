import * as Yup from 'yup';

import newTripFormModel from './newTripFormModel';

const {
  formField: { name, startingPoint, startDate, endDate, lat, lng },
} = newTripFormModel;

export default [
  Yup.object().shape({
    [startingPoint.name]: Yup.string().required(startingPoint.requiredErrorMsg),
  }),
  Yup.object().shape({
    [lat.name]: Yup.string().required(lat.requiredErrorMsg),
    [lng.name]: Yup.string().required(lng.requiredErrorMsg),
  }),
  Yup.object().shape({}), // This won't work though since it validates fields and DatePicker doesn't that
  Yup.object().shape({}), // Third step is to add trip members which is not required
  Yup.object().shape({
    [name.name]: Yup.string().required(name.requiredErrorMsg),
  }),
  Yup.object().shape({}), // Fifth step is to add header image which is not required
];
