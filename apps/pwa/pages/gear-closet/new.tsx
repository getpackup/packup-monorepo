// import { GearItemType } from '@packup/common'
import { useWindowSize } from '@packup/hooks'
import { AppState } from '@packup/redux'
import {
  ActivityTypes,
  activityTypesList,
  gearListAccommodations,
  gearListActivities,
  gearListCampKitchen,
  gearListCategories,
  GearListEnumType,
  gearListOtherConsiderations,
  requiredField,
  requiredSelect,
  trackEvent,
} from '@packup/utils'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaCheckCircle, FaChevronLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useFirebase, useFirestoreConnect } from 'react-redux-firebase'

import {
  Box,
  Button,
  CollapsibleBox,
  Column,
  FormErrors,
  Heading,
  Input,
  PageContainer,
  Row,
  StyledLabel,
} from '../../components'

export default function GearClosetAddItem() {
  const firebase = useFirebase()
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const fetchedGearCloset = useSelector((state: AppState) => state.firestore.ordered.gearCloset)
  const gearClosetCategories: Array<keyof ActivityTypes> = fetchedGearCloset?.[0]?.categories ?? []
  const [isLoading, setIsLoading] = useState(false)

  const size = useWindowSize()

  useFirestoreConnect([
    {
      collection: 'gear-closet',
      storeAs: 'gearCloset',
      doc: auth.uid,
    },
  ])

  const router = useRouter()

  const initialValues = {
    id: '',
    name: '',
    category: '',
    isCustomGearItem: true,
    weight: '',
    weightUnit: 'g',
    description: '',
    quantity: 1,
    essential: false,
  }

  activityTypesList.forEach((item) => {
    initialValues[item] = false
  })

  const save = (values: typeof initialValues) =>
    firebase
      .firestore()
      .collection('gear-closet')
      .doc(auth.uid)
      .collection('additions')
      .add({
        ...values,
        isCustomGearItem: true,
        created: new Date(),
      })
      .then((docRef) => {
        docRef.update({
          id: docRef.id,
        })
      })

  const onSubmit = (
    values: typeof initialValues,
    { resetForm, setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    setIsLoading(true)

    save(values)
      .then(() => {
        resetForm()
        trackEvent('Gear Closet Add Item Submitted', { values })
      })
      .catch((error: Error) => {
        trackEvent('Gear Closet Add Item Submit Failure', {
          values,
          error,
        })
        toast.error(`Failed to add ${values.name}, please try again.`)
      })
      .finally(() => {
        setSubmitting(false)
        router.push('/gear-closet')
      })
  }

  // the categories that the user DOES have in their gear closet, so we can only show those
  const getFilteredCategories = (array: GearListEnumType) =>
    array.filter((item) => gearClosetCategories.includes(item.name))

  const getSelectedCount = (arr: GearListEnumType, values: typeof initialValues) => {
    const count = getFilteredCategories(arr).filter((item) => values[item.name] === true).length
    return `${count} ${count === 1 ? 'tag' : 'tags'} selected`
  }

  return (
    <PageContainer>
      <Head>
        <title>Add Gear Closet Item</title>
      </Head>
      <Box>
        {!size.isSmallScreen && (
          <Button
            type="button"
            onClick={() => {
              router.push('/gear-closet')
              trackEvent('Add Gear Closet Item Back to All Gear Click')
            }}
            color="text"
            iconLeft={<FaChevronLeft />}
          >
            Back to All Gear
          </Button>
        )}

        <Heading altStyle as="h2">
          Add Gear Item
        </Heading>

        <Formik
          validateOnMount
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={(values) => {
            const activityTypeCheckedValuesLength = Object.keys(values)
              .filter((valueKey) => activityTypesList.includes(valueKey as keyof ActivityTypes))
              .filter((item) => values[item] === true).length
            return activityTypeCheckedValuesLength === 0
              ? {
                  selectOne: 'You must tag an item with at least one tag option',
                }
              : {}
          }}
        >
          {({ values, isSubmitting, isValid, setFieldValue, dirty, errors, ...rest }) => (
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
                <Column sm={6}>
                  <Field
                    as={Input}
                    type="number"
                    name="quantity"
                    label="Quantity"
                    setFieldValue={setFieldValue}
                  />
                </Column>
                <Column sm={6}>
                  <Row>
                    <Column xs={8}>
                      <Field as={Input} type="text" name="weight" label="Weight" />
                    </Column>
                    <Column xs={4}>
                      <Field
                        as={Input}
                        type="select"
                        name="weightUnit"
                        label="Unit"
                        options={[
                          {
                            value: 'g',
                            label: 'g',
                          },
                          {
                            value: 'kg',
                            label: 'kg',
                          },
                          {
                            value: 'oz',
                            label: 'oz',
                          },
                          {
                            value: 'lb',
                            label: 'lb',
                          },
                        ]}
                        setFieldValue={setFieldValue}
                        {...rest}
                      />
                    </Column>
                  </Row>
                </Column>
              </Row>
              <Field as={Input} type="textarea" name="description" label="Description" />
              <StyledLabel required>Tag your Item</StyledLabel>
              <p>
                Select all tags that apply to your item, so that this item will get included
                whenever you create a trip that has any of the matching tags.
              </p>
              {getFilteredCategories(gearListActivities).length > 0 && (
                <CollapsibleBox
                  title="Activities"
                  subtitle={getSelectedCount(gearListActivities, values)}
                  defaultClosed={false}
                >
                  <Row>
                    {getFilteredCategories(gearListActivities).map((item) => (
                      <Column xs={6} md={4} lg={3} key={item.name}>
                        <Field as={Input} type="checkbox" name={item.name} label={item.label} />
                      </Column>
                    ))}
                  </Row>
                </CollapsibleBox>
              )}
              {getFilteredCategories(gearListAccommodations).length > 0 && (
                <CollapsibleBox
                  title="Accommodations"
                  subtitle={getSelectedCount(gearListAccommodations, values)}
                  defaultClosed
                >
                  <Row>
                    {getFilteredCategories(gearListAccommodations).map((item) => (
                      <Column xs={6} md={4} lg={3} key={item.name}>
                        <Field as={Input} type="checkbox" name={item.name} label={item.label} />
                      </Column>
                    ))}
                  </Row>
                </CollapsibleBox>
              )}
              {getFilteredCategories(gearListCampKitchen).length > 0 && (
                <CollapsibleBox
                  title="Camp Kitchen"
                  subtitle={getSelectedCount(gearListCampKitchen, values)}
                  defaultClosed
                >
                  <Row>
                    {getFilteredCategories(gearListCampKitchen).map((item) => (
                      <Column xs={6} md={4} lg={3} key={item.name}>
                        <Field as={Input} type="checkbox" name={item.name} label={item.label} />
                      </Column>
                    ))}
                  </Row>
                </CollapsibleBox>
              )}
              {getFilteredCategories(gearListOtherConsiderations).length > 0 && (
                <CollapsibleBox
                  title="Other Considerations"
                  subtitle={getSelectedCount(gearListOtherConsiderations, values)}
                  defaultClosed
                >
                  <Row>
                    {getFilteredCategories(gearListOtherConsiderations).map((item) => (
                      <Column xs={6} md={4} lg={3} key={item.name}>
                        <Field as={Input} type="checkbox" name={item.name} label={item.label} />
                      </Column>
                    ))}
                  </Row>
                </CollapsibleBox>
              )}
              <FormErrors dirty={dirty} errors={errors} />
              <p>
                <Button
                  rightSpacer
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  isLoading={isLoading}
                  iconLeft={<FaCheckCircle />}
                >
                  Add Item
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    router.push('/gear-closet')
                    trackEvent('Add Gear Closet Item Cancel Click')
                  }}
                  color="text"
                >
                  Cancel
                </Button>
              </p>
            </Form>
          )}
        </Formik>
      </Box>
    </PageContainer>
  )
}
