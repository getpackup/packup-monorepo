import 'react-swipeable-list/dist/styles.css'

import { PackingListItemType, UserType } from '@packup/common'

import {
  Avatar,
  StackedAvatars,
  Button,
  FlexContainer,
  IconWrapper,
  Input,
  Pill,
  EditPackingListItem,
} from '@packup/components'
import { AppState, setActivePackingListItemBeingEdited } from '@packup/redux'
import toast from 'react-hot-toast'

import { brandInfo, brandPrimary, lightestGray, baseBorderStyle, halfSpacer } from '@packup/styles'

import { trackEvent } from '@packup/utils'
import { Field, Formik, FormikHelpers } from 'formik'
import { FunctionComponent, useEffect, useState } from 'react'
import {
  FaChevronDown,
  FaChevronRight,
  FaExclamationTriangle,
  FaPencilAlt,
  FaTrash,
  FaUsers,
} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { ExtendedFirebaseInstance, useFirebase } from 'react-redux-firebase'
import {
  LeadingActions,
  Type as ListType,
  SwipeAction,
  SwipeableListItem,
  TrailingActions,
} from 'react-swipeable-list'
import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import { useWindowSize } from '@packup/hooks'

type PackingListItemProps = {
  tripId: string
  item: PackingListItemType
  isOnSharedList?: boolean
  isSharedTrip?: boolean
  isFirstCategoryAndItem?: boolean
}

const PackingListItemWrapper = styled.li`
  border-bottom: ${baseBorderStyle};
  transition: all 0.35s ease-out;
  max-height: 1000px;
  transform-origin: top;
  overflow: hidden;

  &:hover {
    background-color: var(--color-backgroundAlt);
  }

  &.removing {
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
`

const Form = styled.form`
  padding: ${halfSpacer};

  &:hover svg {
    visibility: visible;
  }
`

const ItemInputWrapper = styled.div`
  /* flex: 1; */
`

const ItemText = styled.div`
  flex: 1;
`

type FormValues = {
  [name: string]: { isPacked: boolean }
}

const firebaseConnection = (firebase: ExtendedFirebaseInstance, tripId: string, itemId: string) => {
  return firebase.firestore().collection('trips').doc(tripId).collection('packing-list').doc(itemId)
}

const callbackDelay = 350

export const PackingListItem: FunctionComponent<PackingListItemProps> = (props) => {
  const users: UserType[] = useSelector((state: AppState) => state.firestore.ordered['users'])
  const { packingListItemBeingEdited } = useSelector((state: AppState) => state.client)
  const firebase = useFirebase()
  const dispatch = useDispatch()
  const size = useWindowSize()
  const [removing, setRemoving] = useState(false)

  const onUpdate = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    firebaseConnection(firebase, props.tripId, props.item.id)
      .update({
        isPacked: values[props.item.id].isPacked,
      })
      .then(() => {
        resetForm({ values })
        trackEvent('Packing List Item isPacked Toggled', {
          tripId: props.tripId,
          item: props.item,
          isPacked: values[props.item.id].isPacked,
        })
      })
      .catch((err) => {
        trackEvent('Packing List Item isPacked Toggle Failure', {
          tripId: props.tripId,
          item: props.item,
          isPacked: values[props.item.id].isPacked,
        })
        toast.error(err.message)
      })
  }

  const onDelete = () => {
    if (props.item.isSponsored) {
      trackEvent('Fernwood Ad Packing List Item Deleted', {
        tripId: props.tripId,
      })
    }
    firebaseConnection(firebase, props.tripId, props.item.id)
      .delete()
      .then(() => {
        trackEvent('Packing List Item Deleted', {
          tripId: props.tripId,
          item: props.item,
        })
      })
      .catch((err) => {
        trackEvent('Packing List Item Deleted Failure', {
          tripId: props.tripId,
          item: props.item,
          error: err,
        })
        toast.error(err.message)
      })
  }

  const onRemove = () => {
    setRemoving(true)
    setTimeout(onDelete, callbackDelay)
  }

  const onShare = () => {
    firebaseConnection(firebase, props.tripId, props.item.id)
      .update({
        // TOOD: can we assume packedBy[0] is ok?
        packedBy: [
          {
            ...props.item.packedBy[0],
            isShared: !props.item.packedBy[0].isShared,
          },
        ],
      })
      .then(() => {
        trackEvent('Packing List Item Shared', {
          tripId: props.tripId,
          item: props.item,
        })
      })
      .catch((err) => {
        trackEvent('Packing List Item Shared Failure', {
          tripId: props.tripId,
          item: props.item,
          error: err,
        })
        toast.error(err.message)
      })
  }

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={onShare}>
        <Button
          type="button"
          color="secondary"
          style={{ borderRadius: 0, height: '100%' }}
          iconLeft={<FaUsers />}
        >
          Group Item
        </Button>
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction destructive onClick={onDelete}>
        <Button
          type="button"
          color="danger"
          style={{ borderRadius: 0, height: '100%' }}
          iconLeft={<FaTrash />}
        >
          Delete
        </Button>
      </SwipeAction>
    </TrailingActions>
  )

  const handleItemSelect = (itemId: string): void => {
    if (packingListItemBeingEdited === itemId) {
      dispatch(setActivePackingListItemBeingEdited(undefined))
    } else {
      dispatch(setActivePackingListItemBeingEdited(itemId))
    }
  }

  const itemIsShared = props.item.packedBy.some((item) => item.isShared)

  useEffect(() => {
    if (props.item.isSponsored) {
      trackEvent('Fernwood Ad Packing List Item Viewed', {
        tripId: props.tripId,
      })
    }
  }, [])

  return (
    <PackingListItemWrapper
      className={removing ? 'removing' : ''}
      id={props.isFirstCategoryAndItem ? 'first-packing-item' : undefined}
    >
      <SwipeableListItem
        listType={ListType.IOS}
        leadingActions={props.isSharedTrip ? leadingActions() : null}
        trailingActions={trailingActions()}
        destructiveCallbackDelay={callbackDelay}
        blockSwipe={!size.isSmallScreen} // only enable swiping for small screens
      >
        <Formik<FormValues>
          validateOnMount
          initialValues={{ [props.item.id]: { isPacked: props.item.isPacked } }}
          onSubmit={onUpdate}
        >
          {({ values, handleSubmit }) => (
            <Form onChange={handleSubmit}>
              <FlexContainer justifyContent="space-between">
                <ItemInputWrapper>
                  <Field
                    as={Input}
                    noMarginOnWrapper
                    name={`${props.item.id}.isPacked`}
                    type="checkbox"
                    checked={values[props.item.id].isPacked}
                    label=""
                  />
                </ItemInputWrapper>
                <ItemText className="packing-list-item">
                  <>
                    {props.item.isSponsored && (
                      <span
                        data-tip="We partner with brands we love to help keep Packup free for you."
                        data-for="sponsoredItem"
                        style={{ display: 'inline-block', maxWidth: '75vw' }}
                      >
                        <Pill text="Ad" color="neutral" style={{ margin: 0 }} />
                        <ReactTooltip
                          id="sponsoredItem"
                          place="top"
                          type="dark"
                          effect="solid"
                          className="tooltip customTooltip customTooltip200"
                        />
                      </span>
                    )}
                    {props.item.isEssential && (
                      <span
                        data-tip="Essential Item"
                        data-for="essentialItem"
                        style={{ display: 'inline-block' }}
                      >
                        <FaExclamationTriangle color="var(--color-danger)" />
                        <ReactTooltip
                          id="essentialItem"
                          place="top"
                          type="dark"
                          effect="solid"
                          className="tooltip customTooltip"
                        />
                      </span>
                    )}{' '}
                    {props.item.isSponsored ? (
                      <a
                        href="https://fernwoodcoffee.com/products/fernwood-instant-coffee?srsltid=AfmBOoquFMLb3yNHBJPa4vqp0ytQqhjLtATXiwJq74I-eeXk27n4rtV_&ref=packup"
                        target="_blank"
                      >
                        {props.item.name}
                      </a>
                    ) : (
                      props.item.name
                    )}{' '}
                    {/* TODO: deprecate quantity and only user packedBy quanities added together? Or get rid of quantity on packedBy and not be able to break down total number by person */}
                    {props.item.quantity && props.item.quantity !== 1 && (
                      // || props.item.packedBy.length > 1) && (
                      // use Math.max to grab the larger of the two values, looking at the item's quantity field, or the quantities of all of the packedBy entries
                      <Pill
                        // text={`x ${Math.max(
                        //   props.item.quantity,
                        //   props.item.packedBy.reduce((partialSum, a) => partialSum + a.quantity, 0)
                        // )}`}
                        text={`x ${props.item.quantity}`}
                        color="neutral"
                        style={{ margin: 0, paddingTop: 2, paddingBottom: 2 }}
                      />
                    )}
                  </>
                </ItemText>

                {props.isOnSharedList && (
                  <StackedAvatars style={{ marginRight: halfSpacer }}>
                    {props.item.packedBy.map((packedByUser) => {
                      const matchingUser =
                        users &&
                        users.length > 0 &&
                        users.find((u: UserType) => u.uid === packedByUser.uid)
                      if (!matchingUser) return null

                      return (
                        <Avatar
                          src={matchingUser.photoURL}
                          gravatarEmail={matchingUser.email}
                          key={matchingUser.uid}
                          size="xs"
                          username={matchingUser?.username.toLocaleLowerCase()}
                        />
                      )
                    })}
                  </StackedAvatars>
                )}

                {!size.isSmallScreen && (
                  <IconWrapper
                    onClick={() => handleItemSelect(props.item.id)}
                    hoverColor={brandPrimary}
                    color={
                      packingListItemBeingEdited === props.item.id
                        ? 'var(--color-primary)'
                        : 'var(--color-lightGray)'
                    }
                    data-tip="Edit Item"
                    data-for="editItemIcon"
                  >
                    <FaPencilAlt />
                    <ReactTooltip
                      id="editItemIcon"
                      place="top"
                      type="dark"
                      effect="solid"
                      className="tooltip customTooltip"
                    />
                  </IconWrapper>
                )}

                {!size.isSmallScreen && (
                  <>
                    {!props.isOnSharedList && props.isSharedTrip && (
                      <IconWrapper
                        onClick={onShare}
                        data-tip={itemIsShared ? 'Shared Group Item' : 'Mark as Shared Group Item'}
                        data-for="sharedItemIcon"
                        hoverColor={brandInfo}
                        color={itemIsShared ? brandInfo : lightestGray}
                        style={{ marginRight: halfSpacer }}
                      >
                        <FaUsers />
                        <ReactTooltip
                          id="sharedItemIcon"
                          place="top"
                          type="dark"
                          effect="solid"
                          className="tooltip customTooltip"
                        />
                      </IconWrapper>
                    )}
                  </>
                )}
                {!size.isSmallScreen && (
                  // TODO: can anyone delete an item from the packing list? or just owners
                  <IconWrapper
                    onClick={onRemove}
                    data-tip="Delete Item"
                    data-for="deleteIcon"
                    hoverColor="var(--color-danger)"
                    color={lightestGray}
                    style={{ marginRight: halfSpacer }}
                  >
                    <FaTrash />
                    <ReactTooltip
                      id="deleteIcon"
                      place="top"
                      type="dark"
                      effect="solid"
                      className="tooltip customTooltip"
                    />
                  </IconWrapper>
                )}

                {size.isSmallScreen && (
                  <>
                    {!props.isOnSharedList && itemIsShared && (
                      <IconWrapper
                        hoverColor={brandInfo}
                        color={brandInfo}
                        style={{ marginRight: halfSpacer }}
                        data-tip="Shared Group Item"
                        data-for="sharedItemIconSmall"
                      >
                        <FaUsers />
                        <ReactTooltip
                          id="sharedItemIconSmall"
                          place="top"
                          type="dark"
                          effect="solid"
                          className="tooltip customTooltip"
                        />
                      </IconWrapper>
                    )}
                    <IconWrapper
                      onClick={() => handleItemSelect(props.item.id)}
                      hoverColor={brandPrimary}
                      color={
                        packingListItemBeingEdited === props.item.id
                          ? 'var(--color-primary)'
                          : 'var(--color-lightGray)'
                      }
                      data-tip="Edit Item"
                      data-for="editItemIconSmall"
                    >
                      {packingListItemBeingEdited === props.item.id ? (
                        <FaChevronDown />
                      ) : (
                        <FaChevronRight />
                      )}

                      <ReactTooltip
                        id="editItemIconSmall"
                        place="top"
                        type="dark"
                        effect="solid"
                        className="tooltip customTooltip"
                      />
                    </IconWrapper>
                  </>
                )}
              </FlexContainer>
            </Form>
          )}
        </Formik>
      </SwipeableListItem>
      {packingListItemBeingEdited === props.item.id && (
        <EditPackingListItem itemId={props.item.id} />
      )}
    </PackingListItemWrapper>
  )
}
