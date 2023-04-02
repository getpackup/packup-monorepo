import { Form, Formik } from 'formik'
import { TripFormType, TripMemberFormType, TripMemberStatus } from '@packup/common'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_GLOBAL_ALERT, addAlert, AppState, RootState } from '@packup/redux'
import getInitValues from './form-model/formInitialValues'
import newTripFormModel from './form-model/newTripFormModel'
import React, { useState } from 'react'
import { getSeason, sendTripInvitationEmail, trackEvent } from '@packup/utils'
import { endOfDay, startOfDay } from 'date-fns'
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase'
import validationSchema from './form-model/validationSchema'
import { Row } from '../row/Row'
import { Column } from '../column/Column'
import { Button } from '../button/Button'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import LocationStep from './steps/LocationStep'
import DateStep from './steps/DateStep'
import GroupStep from './steps/GroupStep'
import TitleStep from './steps/TitleStep'
import ImageStep from './steps/ImageStep'
import { useRouter } from 'next/router'

type MembersToInviteType = { uid: string; email: string; greetingName: string }[];

const { formId, formField } = newTripFormModel;
const steps = ['Location', 'Date', 'Members', 'Name', 'Image'];

/**
 * TODO: add type to parameters or refactor forms to eliminate the need for this
 * @param step
 * @param parameters
 */
const renderStepContent = (step: number, parameters: any) => {
  switch (step) {
    case 0:
      return (
        <LocationStep
          formField={formField}
          setFieldTouched={parameters.setFieldTouched}
          setFieldValue={parameters.setFieldValue}
        />
      );
    case 1:
      return (
        <DateStep
          formField={formField}
          formValues={parameters.formValues}
          setFieldValue={parameters.setFieldValue}
          setFieldTouched={parameters.setFieldTouched}
        />
      );
    case 2:
      return (
        <GroupStep
          activeLoggedInUser={parameters.activeLoggedInUser}
          membersToInvite={parameters.membersToInvite}
          auth={parameters.auth}
          setMembersToInvite={parameters.setMembersToInvite}
        />
      );
    case 3:
      return <TitleStep
        formField={formField}
        setFieldValue={parameters.setFieldValue}
        setFieldTouched={parameters.setFieldTouched}
      />
    case 4:
      return <ImageStep formField={formField} setFieldValue={parameters.setFieldValue} />;
    default:
      return <div>Form Not Found</div>;
  }
};

export function TripFormCreate() {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const profile = useSelector((state: RootState) => state.firebase.profile);
  const loggedInUser = useSelector((state: RootState) => state.firestore.ordered['loggedInUser']);
  const activeLoggedInUser = loggedInUser && loggedInUser.length > 0 ? loggedInUser[0] : undefined;
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [membersToInvite, setMembersToInvite] = useState<MembersToInviteType>([]);

  const isLastStep = activeStep === steps.length - 1;

  const initialValues: TripFormType = getInitValues(auth.uid);
  const currentValidationSchema = validationSchema[activeStep];

  useFirestoreConnect([
    {
      collection: 'users',
      where: [
        'uid',
        'in',
        membersToInvite && membersToInvite.length > 0
          ? membersToInvite.map((m) => m.uid)
          : [auth.uid || ''],
      ],
    },
  ])

  const submitForm = (values: TripFormType) => {
    setIsLoading(true);
    // setIsSearchBarDisabled(true)
    const tripMembers: Record<string, TripMemberFormType> = {};
    tripMembers[`${auth.uid}`] = {
      uid: auth.uid,
      status: TripMemberStatus.Owner,
      invitedAt: new Date(),
      acceptedAt: new Date(),
    };

    membersToInvite.forEach((member) => {
      tripMembers[`${member.uid}`] = {
        uid: member.uid,
        status: TripMemberStatus.Pending,
        invitedAt: new Date(),
        invitedBy: auth.uid,
      };
    });

    firebase
      .firestore()
      .collection('trips')
      .add({
        ...values,
        startDate: startOfDay(new Date(values.startDate as string)),
        endDate: endOfDay(new Date(values.endDate as string)),
        tags: [],
        created: new Date(),
        tripMembers,
      })
      .then((docRef) => {
        docRef.update({
          tripId: docRef.id,
        });
        membersToInvite.forEach((member) => {
          sendTripInvitationEmail({
            tripId: docRef.id,
            invitedBy: profile.username,
            email: member.email,
            greetingName: member.greetingName,
          });
        });
        trackEvent('New Trip Submit Successful', { values: { ...values } });
        router.push(`/app/trips/${docRef.id}/add-trip-image`)
      })
      .catch((err) => {
        trackEvent('New Trip Submit Unsuccessful', { values: { ...values }, error: err });
        dispatch(
          addAlert({
            type: 'danger',
            message: err.message,
          })
        );
      });
  };

  const handleSubmit = (values: TripFormType, actions: any) => {
    console.log('values', values)
    if (isLastStep) {
      const valuesWithSeason = {
        ...values,
        season: getSeason(values.lat, values.lng, values.startDate as string),
      };
      trackEvent('New Trip Submit Button Clicked', valuesWithSeason);

      submitForm(valuesWithSeason);

      actions.setSubmitting(false);
    } else {
      setActiveStep(activeStep + 1);
      actions.setSubmitting(false);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Formik
      validationSchema={currentValidationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, values, setFieldValue, setFieldTouched }) => (
        <Form autoComplete="off" id={formId}>
          {renderStepContent(activeStep, {
            formValues: values,
            setFieldValue,
            setFieldTouched,
            activeLoggedInUser,
            membersToInvite,
            setMembersToInvite,
            auth,
          })}

          <Row>
            <Column xs={4} xsOffset={2} xsSpacer xsOrder={1}>
              {activeStep !== 0 && (
                <Button
                  type="button"
                  color="text"
                  block
                  disabled={isSubmitting || !isValid || isLoading}
                  onClick={handleBack}
                  iconLeft={<FaChevronLeft />}
                >
                  Back
                </Button>
              )}
            </Column>
            <Column xs={4} xsOrder={2}>
              {isLastStep ? (
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid || isLoading}
                  isLoading={isLoading}
                  color="success"
                  iconRight={<FaChevronRight />}
                >
                  Create
                </Button>
              ) : (
                <Button
                  disabled={isSubmitting || !isValid || isLoading}
                  type="submit"
                  block
                  iconRight={<FaChevronRight />}
                >
                  Next
                </Button>
              )}
            </Column>
          </Row>
        </Form>
      )}
    </Formik>
  )
}

export default TripFormCreate