/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { GearItemType } from '@packup/common'
import {
  Alert,
  Box,
  Button,
  CollapsibleBox,
  Column,
  FlexContainer,
  Heading,
  HorizontalRule,
  Input,
  LoadingPage,
  Modal,
  PageContainer,
  Row,
} from '@packup/components'
import { usePersonalGear, useWindowSize } from '@packup/hooks'
import { AppState } from '@packup/redux'
import {
  ActivityTypes,
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
import omit from 'lodash/omit'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaCheckCircle, FaChevronLeft, FaTrash } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { isLoaded, useFirebase } from 'react-redux-firebase'

export default function GearClosetEditItem() {
  const firebase = useFirebase()
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const personalGear = usePersonalGear()
  const fetchedGearCloset = useSelector((state: AppState) => state.firestore.ordered.gearCloset)
  const gearClosetCategories: Array<keyof ActivityTypes> = fetchedGearCloset?.[0]?.categories ?? []
  const customCategories: Array<string> = fetchedGearCloset?.[0]?.customCategories ?? []

  const router = useRouter()
  // the gear closet item ID
  const id = router.query.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [itemToBeDeleted, setItemToBeDeleted] = useState<GearItemType | undefined>(undefined)

  const size = useWindowSize()

  const activeItem: boolean | GearItemType | undefined =
    personalGear &&
    personalGear.length > 0 &&
    personalGear !== 'loading' &&
    personalGear.find((item: GearItemType) => item.id === id)

  const initialValues: GearItemType = {
    quantity: 1,
    weight: 0,
    weightUnit: 'g',
    description: '',
    // above are defaults since Master Gear List Items won't have them,
    // and spreading activeItem below will overwrite them if they are available
    ...(activeItem as GearItemType),
  }

  const save = (values: typeof initialValues) => {
    // update a custom gear item that already exists
    if (values.isCustomGearItem) {
      return firebase
        .firestore()
        .collection('gear-closet')
        .doc(auth.uid)
        .collection('additions')
        .doc(id)
        .update({
          ...values,
          isCustomGearItem: true,
          updated: new Date(),
        })
    }
    // add the id of the original master gear list item to the removals array
    // then create a new custom gear item
    return firebase
      .firestore()
      .collection('gear-closet')
      .doc(auth.uid)
      .update({
        removals: firebase.firestore.FieldValue.arrayUnion(values.id),
      })
      .then(() => {
        firebase
          .firestore()
          .collection('gear-closet')
          .doc(auth.uid)
          .collection('additions')
          .add({
            ...omit(values, 'id'),
            isCustomGearItem: true,
            created: new Date(),
          })
          .then((docRef) => {
            docRef.update({
              id: docRef.id,
            })
          })
      })
  }

  const onSubmit = (
    values: typeof initialValues,
    { resetForm, setSubmitting }: FormikHelpers<typeof initialValues>
  ) => {
    setIsLoading(true)

    save(values)
      .then(() => {
        resetForm()
        trackEvent('Gear Closet Edit Item Submitted', {
          values,
        })
      })
      .catch((error: Error) => {
        trackEvent('Gear Closet Edit Item Submit Failure', {
          values,
          error,
        })
        toast.error(`Failed to update ${values.name}, please try again.`)
      })
      .finally(() => {
        setSubmitting(false)
        router.back()
      })
  }

  const deleteItem = (item: GearItemType) => {
    const deleteType = () => {
      if (item.isCustomGearItem) {
        // Custom item, so delete it from the user's Additions collection
        return firebase
          .firestore()
          .collection('gear-closet')
          .doc(auth.uid)
          .collection('additions')
          .doc(item.id)
          .delete()
      }
      // Not a custom gear item, so add to Removals list
      return firebase
        .firestore()
        .collection('gear-closet')
        .doc(auth.uid)
        .update({
          removals: firebase.firestore.FieldValue.arrayUnion(item.id),
        })
    }

    deleteType()
      .then(() => {
        trackEvent('Edit Gear Closet Item Deleted', {
          ...activeItem,
        })
      })
      .catch((err) => {
        toast.error(err.message)
        trackEvent('Edit Gear Closet Item Delete Failure', {
          ...activeItem,
        })
      })
    setItemToBeDeleted(undefined)
    setModalIsOpen(false)
    router.back()
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
        <title>Edit Gear Closet Item</title>
      </Head>
      <Box>
        {!size.isSmallScreen && (
          <Button
            type="button"
            onClick={() => {
              router.back()
              trackEvent('Edit Gear Closet Item Back to All Gear Click', {
                ...activeItem,
              })
            }}
            color="text"
            iconLeft={<FaChevronLeft />}
          >
            Back to All Gear
          </Button>
        )}

        {activeItem && (
          <>
            <Heading>Edit Gear Item</Heading>
            {activeItem.essential && (
              <Alert
                type="info"
                message="This item is considered one of the 10 Essential items."
                callToActionLink="https://getpackup.com/blog/2021-03-29-the-ten-essentials/"
                callToActionLinkText="Learn more"
              />
            )}
            <Formik validateOnMount initialValues={initialValues} onSubmit={onSubmit}>
              {({ values, isSubmitting, isValid, setFieldValue, dirty, ...rest }) => (
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
                        label="Main Category"
                        options={[
                          ...gearListCategories,
                          ...customCategories.map((category) => ({
                            value: category,
                            label: category,
                          })),
                        ]}
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
                  <Heading as="h3" style={{ marginBottom: 0 }}>
                    Sub Categories
                  </Heading>
                  <p>Tag any other categories that this item may be relevant for.</p>
                  {getFilteredCategories(gearListActivities).length > 0 && (
                    <CollapsibleBox
                      title="Activities"
                      defaultClosed
                      subtitle={getSelectedCount(gearListActivities, values)}
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
                      defaultClosed
                      subtitle={getSelectedCount(gearListAccommodations, values)}
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
                      defaultClosed
                      subtitle={getSelectedCount(gearListCampKitchen, values)}
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
                  {getFilteredCategories(gearListCampKitchen).length > 0 && (
                    <CollapsibleBox
                      title="Other Considerations"
                      defaultClosed
                      subtitle={getSelectedCount(gearListOtherConsiderations, values)}
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
                  {customCategories?.length > 0 && (
                    <CollapsibleBox
                      title="Custom Categories"
                      defaultClosed={false}
                      subtitle="&nbsp;"
                    >
                      <Row>
                        {customCategories.map((item) => (
                          <Column xs={6} md={4} lg={3} key={item}>
                            <Field as={Input} type="checkbox" name={item} label={item} />
                          </Column>
                        ))}
                      </Row>
                    </CollapsibleBox>
                  )}
                  <HorizontalRule />
                  <FlexContainer justifyContent="space-between">
                    <p>
                      <Button
                        color="success"
                        rightSpacer
                        type="submit"
                        disabled={isSubmitting || !isValid || !dirty || values === initialValues}
                        isLoading={isLoading}
                        iconLeft={<FaCheckCircle />}
                      >
                        Update Item
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          router.back()
                          trackEvent('Edit Gear Closet Item Cancel Click', {
                            ...activeItem,
                          })
                        }}
                        color="text"
                      >
                        Cancel
                      </Button>
                    </p>
                    <p>
                      <Button
                        type="button"
                        onClick={() => {
                          setModalIsOpen(true)
                          setItemToBeDeleted(activeItem)
                        }}
                        color="danger"
                      >
                        Delete
                      </Button>
                    </p>
                  </FlexContainer>
                </Form>
              )}
            </Formik>

            {itemToBeDeleted && (
              <Modal
                toggleModal={() => {
                  setItemToBeDeleted(undefined)
                  setModalIsOpen(false)
                }}
                isOpen={modalIsOpen}
                largePadding
              >
                <Heading>Are you sure?</Heading>
                <p>
                  Are you sure you want to delete <strong>{itemToBeDeleted.name}</strong>? This
                  action cannot be undone.
                </p>
                <Row>
                  <Column xs={6}>
                    <Button
                      type="button"
                      onClick={() => {
                        setItemToBeDeleted(undefined)
                        setModalIsOpen(false)
                      }}
                      color="primaryOutline"
                      block
                    >
                      Cancel
                    </Button>
                  </Column>
                  <Column xs={6}>
                    <Button
                      type="button"
                      onClick={() => deleteItem(itemToBeDeleted)}
                      block
                      color="danger"
                      iconLeft={<FaTrash />}
                    >
                      Delete
                    </Button>
                  </Column>
                </Row>
              </Modal>
            )}
          </>
        )}
        {(!activeItem || !isLoaded) && <LoadingPage />}
      </Box>
    </PageContainer>
  )
}
