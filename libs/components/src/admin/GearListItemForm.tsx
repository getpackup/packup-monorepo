import { GearItemType } from '@packup/common'
import { Button, Column, Heading, HorizontalRule, Input, Row } from '@packup/components'
import toast from 'react-hot-toast'
import {
  gearListAccommodations,
  gearListActivities,
  gearListCampKitchen,
  gearListCategories,
  gearListOtherConsiderations,
  gearListTripType,
  requiredField,
  requiredSelect,
} from '@packup/utils'
import { Field, Form, Formik } from 'formik'
import router from 'next/router'
import React, { FunctionComponent, useState } from 'react'
import { FaCheckCircle, FaChevronCircleRight } from 'react-icons/fa'
import { useFirebase } from 'react-redux-firebase'

type GearListItemFormProps = {
  initialValues: GearItemType
  type: 'new' | 'edit'
}

export const GearListItemForm: FunctionComponent<GearListItemFormProps> = (props) => {
  const firebase = useFirebase()
  const [isLoading, setIsLoading] = useState(false)

  const addNewGearItem = (values: GearListItemFormProps['initialValues']) => {
    setIsLoading(true)
    firebase
      .firestore()
      .collection('gear')
      .add({
        ...values,
        created: new Date(),
      })
      .then((docRef) => {
        setIsLoading(false)
        docRef.update({
          id: docRef.id,
        })
        router.push('/admin/gear-list')
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  const updateGearItem = (values: GearListItemFormProps['initialValues']) => {
    setIsLoading(true)
    firebase
      .firestore()
      .collection('gear')
      .doc(props.initialValues.id)
      .update({
        ...values,
        updated: new Date(),
      })
      .then(() => {
        setIsLoading(false)
        router.push('/admin/gear-list')
      })
      .catch((err) => {
        toast.error(err.message)
      })
  }

  return (
    <>
      <Formik
        validateOnMount
        initialValues={props.initialValues}
        onSubmit={(values, { setSubmitting }) => {
          if (props.type === 'new') {
            addNewGearItem(values)
          }
          if (props.type === 'edit') {
            updateGearItem(values)
          }
          setSubmitting(false)
          setIsLoading(false)
        }}
      >
        {({ isSubmitting, isValid, setFieldValue, ...rest }) => (
          <Form>
            <Row>
              <Column sm={6}>
                <Field
                  as={Input}
                  type="text"
                  name="name"
                  label="Item Name"
                  validate={requiredField}
                  required
                />
              </Column>
              <Column sm={6}>
                <Field
                  as={Input}
                  type="select"
                  name="category"
                  label="Category"
                  options={gearListCategories}
                  validate={requiredSelect}
                  setFieldValue={setFieldValue}
                  {...rest}
                  required
                />
              </Column>
            </Row>
            <Heading as="h2">Trip Type</Heading>
            <Row>
              {gearListTripType.map((item) => (
                <Column xs={6} sm={4} md={3} key={item.name}>
                  <Field as={Input} type="checkbox" name={item.name} label={item.label} />
                </Column>
              ))}
            </Row>

            <Heading as="h2">Activities</Heading>
            <Row>
              {gearListActivities.map((item) => (
                <Column xs={6} sm={4} md={3} key={item.name}>
                  <Field as={Input} type="checkbox" name={item.name} label={item.label} />
                </Column>
              ))}
            </Row>

            <Heading as="h2">Accommodations</Heading>
            <Row>
              {gearListAccommodations.map((item) => (
                <Column xs={6} sm={4} md={3} key={item.name}>
                  <Field as={Input} type="checkbox" name={item.name} label={item.label} />
                </Column>
              ))}
            </Row>

            <Heading as="h2">Camp Kitchen</Heading>
            <Row>
              {gearListCampKitchen.map((item) => (
                <Column xs={6} sm={4} md={3} key={item.name}>
                  <Field as={Input} type="checkbox" name={item.name} label={item.label} />
                </Column>
              ))}
            </Row>

            <Heading as="h2">Other Considerations</Heading>
            <Row>
              {gearListOtherConsiderations.map((item) => (
                <Column xs={6} sm={4} md={3} key={item.name}>
                  <Field as={Input} type="checkbox" name={item.name} label={item.label} />
                </Column>
              ))}
            </Row>
            <HorizontalRule />
            <p>
              <Button
                rightSpacer
                type="submit"
                disabled={isSubmitting || !isValid}
                isLoading={isLoading}
                iconLeft={props.type === 'new' ? <FaChevronCircleRight /> : <FaCheckCircle />}
              >
                {props.type === 'new' ? 'Save Item' : 'Update Item'}
              </Button>
              <Button type="button" onClick={() => router.push('/admin/gear-list')} color="text">
                Cancel
              </Button>
            </p>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default GearListItemForm
