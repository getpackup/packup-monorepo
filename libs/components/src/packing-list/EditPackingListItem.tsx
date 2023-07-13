import { PackedByUserType, PackingListItemType, TripType, UserType } from '@packup/common'
import {
  Alert,
  AutoSave,
  Button,
  Column,
  FlexContainer,
  Heading,
  Input,
  LoadingSpinner,
  Modal,
  Row,
} from '@packup/components'
import toast from 'react-hot-toast'
import { AppState, setActivePackingListItemBeingEdited } from '@packup/redux'
import {
  gearListCategories,
  acceptedTripMembersOnly,
  requiredField,
  requiredSelect,
  trackEvent,
} from '@packup/utils'
import { Field, Form, Formik } from 'formik'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { FaCheckCircle, FaTrash } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { useRouter } from 'next/router'
import { useActiveTrip, useWindowSize } from '@packup/hooks'
import styled from 'styled-components'
import { baseSpacer, borderRadius } from '@packup/styles'

type EditPackingListItemProps = {
  itemId?: string
}

const StyledDiv = styled.div`
  background-color: var(--color-background);
  padding: ${baseSpacer};
  border-radius: ${borderRadius};
  margin-bottom: ${baseSpacer};
`

export const EditPackingListItem: FunctionComponent<EditPackingListItemProps> = (props) => {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const users = useSelector((state: AppState) => state.firestore.data['users'])
  const activeTrip = useActiveTrip()
  const packingList: PackingListItemType[] = useSelector(
    (state: AppState) => state.firestore.ordered['packingList']
  )

  const firebase = useFirebase()
  const router = useRouter()
  const dispatch = useDispatch()

  if (!activeTrip?.tripId) {
    trackEvent('Trip By Id Had No Id')
    return null
  }

  if (!props.itemId) {
    trackEvent('Trip Edit Packing List Item By Id Had No checklistId')
    // TODO: return a better failure state UI here
    return null
  }

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const size = useWindowSize()

  const mounted = useRef(false)

  useEffect(() => {
    mounted.current = true // Will set it to true on mount ...
    return () => {
      mounted.current = false // ... and to false on unmount
    }
  }, [])

  const activeItem: PackingListItemType =
    packingList && packingList.find((item: PackingListItemType) => item.id === props.itemId)!

  const removeItem = (isSharedItem: boolean) => {
    if (isSharedItem) {
      return setModalIsOpen(true)
    }
    if (activeItem && !isSharedItem && activeTrip) {
      return firebase
        .firestore()
        .collection('trips')
        .doc(activeTrip?.tripId)
        .collection('packing-list')
        .doc(activeItem?.id)
        .delete()
        .then(() => {
          trackEvent('Packing List Item Removed', { ...activeItem })
          router.back()
        })
        .catch((err) => {
          toast.error(err.message)
        })
    }
    return null
  }

  if (!activeItem) {
    return <LoadingSpinner />
  }
  return (
    <StyledDiv>
      {activeItem && (
        <Formik
          validateOnMount
          initialValues={
            {
              ...activeItem,
              packedBy: activeItem.packedBy.map((member) => member.uid),
              isSharedItem: activeItem.packedBy.some((item) => item.isShared),
            } as Omit<PackingListItemType, 'packedBy'> & {
              isSharedItem?: boolean
              packedBy: string[]
            }
          }
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const updateValues = {
              ...values,
              quantity: Number(values.quantity),
              // if it is a sharedItem, map over all the users. If not shared, assign to just one user
              packedBy: values.isSharedItem
                ? values.packedBy.map((user) => {
                    // initialize obj shape and just set quantity to 1 for now, since not sure if we are
                    // going to use it per user or just the quantity field on the line above
                    const obj: PackedByUserType = { uid: '', quantity: 1, isShared: false }
                    // add in the user uid from values
                    obj.uid = user
                    // if values.isSharedItem is true, then set all to true in the map
                    obj.isShared = true
                    return obj
                  })
                : [
                    {
                      // TODO: defaulting logged in user, but could also do first person in list of values.packedBy[0]?
                      uid: auth.uid,
                      isShared: false,
                      quantity: 1,
                    },
                  ],
            }

            // dont need to send this value along, its just for use on this page to handle the Toggle
            delete updateValues.isSharedItem

            if (activeItem) {
              firebase
                .firestore()
                .collection('trips')
                .doc(router.query['id']! as string)
                .collection('packing-list')
                .doc(activeItem.id)
                .update(updateValues)
                .then(() => {
                  resetForm({
                    values: {
                      ...updateValues,
                      packedBy: updateValues.packedBy.map((member) => member.uid),
                      isSharedItem: updateValues.packedBy.some((item) => item.isShared),
                    },
                  })
                  trackEvent('Packing List Item Edited', {
                    ...activeItem,
                    ...values,
                  })
                  dispatch(setActivePackingListItemBeingEdited(undefined))
                })
                .catch((err) => {
                  toast.error(err.message)
                  trackEvent('Packing List Item Edited Failure', {
                    ...activeItem,
                    ...values,
                    error: err,
                  })
                })
              if (mounted.current) {
                setSubmitting(false)
              }
            }
          }}
        >
          {({ setFieldValue, values, isSubmitting, dirty, ...rest }) => (
            <Form>
              <Row>
                <Column sm={4}>
                  <Field
                    as={Input}
                    type="text"
                    name="name"
                    label="Name"
                    validate={requiredField}
                    required
                  />
                </Column>
                <Column sm={4}>
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
                <Column sm={4}>
                  <Field
                    as={Input}
                    type="number"
                    name="quantity"
                    label="Quantity"
                    setFieldValue={setFieldValue}
                  />
                </Column>
              </Row>

              <Row>
                <Column sm={5}>
                  <Field as={Input} type="text" name="description" label="Description" />
                </Column>
                <Column sm={3}>
                  <Field
                    as={Input}
                    type="toggle"
                    name="isSharedItem"
                    label="Shared Group Item"
                    checked={values.isSharedItem}
                  />
                </Column>
                {values.isSharedItem && activeTrip && Object.keys(users).length > 0 && (
                  <Column sm={4}>
                    <Field
                      as={Input}
                      type="select"
                      name="packedBy"
                      label="Packed By"
                      isMulti
                      required
                      validate={requiredSelect}
                      options={Object.values(acceptedTripMembersOnly(activeTrip)).map((member) => {
                        const matchingUser: UserType = users && users[member.uid]
                        const obj = {
                          value: '',
                          label: '',
                        }
                        obj.value = member.uid
                        obj.label = matchingUser?.username.toLocaleLowerCase()
                        return obj
                      })}
                      setFieldValue={setFieldValue}
                      {...rest}
                    />
                  </Column>
                )}
              </Row>

              <FlexContainer justifyContent="space-between">
                <Button
                  type="submit"
                  disabled={!dirty || isSubmitting}
                  color="success"
                  iconLeft={<FaCheckCircle />}
                >
                  Save
                </Button>

                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => removeItem(values.packedBy.length > 1)}
                  color="danger"
                  iconLeft={<FaTrash />}
                >
                  Remove
                </Button>
              </FlexContainer>
            </Form>
          )}
        </Formik>
      )}

      <Modal
        toggleModal={() => {
          setModalIsOpen(false)
        }}
        isOpen={modalIsOpen}
      >
        <Heading as="h3">Cannot remove item</Heading>
        <p>
          Sorry, you cannot remove an item if multiple people are sharing it. Switch the{' '}
          <strong>Shared Group Item</strong> toggle to{' '}
          <em>
            <strong>No</strong>
          </em>{' '}
          and then try again.
        </p>
        <Button type="button" onClick={() => setModalIsOpen(false)} color="secondary">
          Got it 👍
        </Button>
      </Modal>
    </StyledDiv>
  )
}

export default EditPackingListItem
