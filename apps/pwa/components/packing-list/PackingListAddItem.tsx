import { AppState } from '@packup/redux'
import { baseBorderStyle, brandPrimary, doubleSpacer, halfSpacer } from '@packup/styles'
import { trackEvent } from '@packup/utils'
import { Field, Form, Formik } from 'formik'
import { FunctionComponent } from 'react'
import toast from 'react-hot-toast'
import { FaPlus } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'

import { FlexContainer, Input, InputWrapper } from '../index'

type PackingListItemProps = {
  tripId: string
  categoryName: string
  isOnSharedList?: boolean
}

const PackingListItemWrapper = styled.li`
  border-bottom: ${baseBorderStyle};
  padding: ${halfSpacer};
  &:hover {
    background-color: var(--color-backgroundAlt);
  }

  & ${InputWrapper} {
    margin-bottom: 0;
    flex: 1;
  }
`

const IconWrapper = styled.div`
  cursor: pointer;
  width: ${doubleSpacer};
  height: ${doubleSpacer};
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-text);
  &:hover {
    color: ${brandPrimary};
  }
`

export const PackingListAddItem: FunctionComponent<PackingListItemProps> = ({
  tripId,
  categoryName,
  isOnSharedList,
}) => {
  const firebase = useFirebase()
  const dispatch = useDispatch()
  const auth = useSelector((state: AppState) => state.firebase.auth)

  return (
    <PackingListItemWrapper>
      <Formik
        validateOnMount
        initialValues={{
          [`new-${categoryName}`]: '',
          category: categoryName,
          quantity: 1,
          isPacked: false,
          isEssential: false,
          description: '',
          created: new Date(),
        }}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          resetForm({})
          if ((values[`new-${categoryName}`] as string).length > 1) {
            try {
              await firebase
                .firestore()
                .collection('trips')
                .doc(tripId)
                .collection('packing-list')
                .add({
                  name: values[`new-${categoryName}`],
                  category: categoryName,
                  quantity: 1,
                  isPacked: false,
                  isEssential: false,
                  description: '',
                  created: new Date(),
                  packedBy: [
                    {
                      isShared: isOnSharedList,
                      quantity: 1,
                      uid: auth.uid,
                    },
                  ],
                })
              trackEvent('Packing List Item Added', {
                name: values[`new-${categoryName}`],
                categoryName,
                tripId,
              })
              setSubmitting(false)
            } catch (err) {
              setSubmitting(false)
              trackEvent('Packing List Item Add Failure', {
                name: values[`new-${categoryName}`],
                categoryName,
                tripId,
                error: err,
              })
              toast.error('Failed to add item, please try again')
            }
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <FlexContainer justifyContent="flex-start">
              <Field
                as={Input}
                type="text"
                name={`new-${categoryName}`}
                label="Add Item"
                hiddenLabel
                disabled={isSubmitting}
                maxLength={64}
              />
              <IconWrapper onClick={() => handleSubmit()} data-tip="Add Item" data-for="addItem">
                <FaPlus />
                <ReactTooltip
                  id="addItem"
                  place="top"
                  type="dark"
                  effect="solid"
                  className="tooltip customTooltip"
                />
              </IconWrapper>
            </FlexContainer>
          </Form>
        )}
      </Formik>
    </PackingListItemWrapper>
  )
}

export default PackingListAddItem
