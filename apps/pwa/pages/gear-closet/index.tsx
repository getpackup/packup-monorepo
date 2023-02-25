/* eslint-disable jsx-a11y/anchor-is-valid */
import toast from 'react-hot-toast'
import { TripType } from '@getpackup-group/common'
import {
  GearListEnumType,
  GearItemType,
  ActivityTypes,
  gearListAccommodations,
  gearListActivities,
  gearListCampKitchen,
  gearListOtherConsiderations,
  trackEvent,
  useWindowSize,
} from '@getpackup-group/utils'
import {
  Alert,
  Button,
  Column,
  DropdownMenu,
  FlexContainer,
  Heading,
  LoadingPage,
  Modal,
  PageContainer,
  Row,
  Table,
  multiSelectStyles,
  Box,
  IconWrapper,
} from '@getpackup-group/components'
import { usePersonalGear } from '@getpackup-group/hooks'
import { AppState } from '@getpackup-group/redux'
import {
  halfSpacer,
  inputPaddingY,
  brandDanger,
  brandPrimary,
  lightestGray,
} from '@getpackup-group/styles'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaFolderOpen, FaPencilAlt, FaPlusCircle, FaTrash } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { isLoaded, useFirebase, useFirestoreConnect } from 'react-redux-firebase'
import Select from 'react-select'
import Head from 'next/head'

type SelectGearListCategoryOption = {
  readonly value: keyof ActivityTypes
  readonly label: string
}

export type GroupedChannelOption = {
  readonly label: string
  readonly options: readonly SelectGearListCategoryOption[]
}

function RowActions(props) {
  return (
    <FlexContainer justifyContent="flex-end" flexWrap="nowrap">
      <Link href={`/gear-closet/${props.row.original.id}`}>
        <IconWrapper hoverColor={brandPrimary} color={lightestGray}>
          <FaPencilAlt />
        </IconWrapper>
      </Link>
      <IconWrapper
        onClick={() => {
          props.setModalIsOpen(true)
          props.setItemToBeDeleted(props.row.original)
        }}
        hoverColor={brandDanger}
        color={lightestGray}
        style={{
          marginLeft: halfSpacer,
        }}
      >
        <FaTrash />
      </IconWrapper>
    </FlexContainer>
  )
}

export default function GearCloset() {
  const size = useWindowSize()
  const firebase = useFirebase()
  const router = useRouter()
  const personalGear: string | Array<GearItemType> = usePersonalGear()
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const fetchedGearCloset = useSelector((state: AppState) => state.firestore.ordered.gearCloset)
  const trips: Array<TripType> = useSelector((state: AppState) => state.firestore.ordered.trips)

  const gearClosetCategories: Array<keyof ActivityTypes> = fetchedGearCloset?.[0]?.categories ?? []

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [itemToBeDeleted, setItemToBeDeleted] = useState<GearItemType | undefined>(undefined)
  const [categoriesToAdd, setCategoriesToAdd] = useState<SelectGearListCategoryOption[]>([])

  const [addNewCategoryModalIsOpen, setAddNewCategoryModalIsOpen] = useState(false)

  // the categories that the user DOES NOT have in the gear closet
  // also remove "essential" because that will always exist for users
  const getOtherCategories = (array: GearListEnumType) =>
    array.filter((item) => !gearClosetCategories.includes(item.name) && item.name !== 'essential')

  useEffect(() => {
    if (isLoaded(fetchedGearCloset) && fetchedGearCloset.length === 0) {
      router.push('/gear-closet/setup')
    }
  }, [fetchedGearCloset, router])

  const gearListCategoryOptions = [
    {
      label: 'Activities',
      options: getOtherCategories(gearListActivities).map((item) => ({
        value: item.name,
        label: item.label,
      })),
    },
    {
      label: 'Accommodations',
      options: getOtherCategories(gearListAccommodations).map((item) => ({
        value: item.name,
        label: item.label,
      })),
    },
    {
      label: 'Camp Kitchen',
      options: getOtherCategories(gearListCampKitchen).map((item) => ({
        value: item.name,
        label: item.label,
      })),
    },
    {
      label: 'Other Considerations',
      options: getOtherCategories(gearListOtherConsiderations).map((item) => ({
        value: item.name,
        label: item.label,
      })),
    },
  ]

  useFirestoreConnect([
    {
      collection: 'gear-closet',
      storeAs: 'gearCloset',
      doc: auth.uid,
    },
    {
      collection: 'trips',
      where: ['owner', '==', auth?.uid || ''],
    },
  ])

  const saveAddedCategories = () => {
    trackEvent('Save Gear Category Button clicked')
    setAddNewCategoryModalIsOpen(false)
    firebase
      .firestore()
      .collection('gear-closet')
      .doc(auth.uid)
      .update({
        categories: firebase.firestore.FieldValue.arrayUnion(
          ...categoriesToAdd.map((cat) => cat?.value)
        ),
      })
      .then()
      .catch((err) => {
        toast.error(err.message)
      })
    setCategoriesToAdd([])
  }

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
      enableSorting: true,
    },
    {
      accessorKey: 'category',
      header: 'Category',
      enableSorting: true,
    },
    {
      id: 'actions',
      // eslint-disable-next-line react/no-unstable-nested-components
      cell: (props) => (
        <RowActions
          row={props.row}
          router={router}
          setModalIsOpen={setModalIsOpen}
          setItemToBeDeleted={setItemToBeDeleted}
        />
      ),
    },
  ]

  const data =
    auth?.uid && typeof personalGear !== 'string' && personalGear?.length > 0
      ? [...(personalGear as Array<GearItemType>)].sort((a: GearItemType, b: GearItemType) =>
          a.name?.localeCompare(b.name)
        )
      : []

  // const data = sortedGearList()

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
        trackEvent('Gear Closet Item Deleted', { ...item })
      })
      .catch((err) => {
        trackEvent('Gear Closet Item Delete Failure', { ...item, err })
        toast.error(err.message)
      })
    setItemToBeDeleted(undefined)
    setModalIsOpen(false)
  }

  return (
    <PageContainer>
      <Box>
        <Head>
          <title>Gear | Packup</title>
        </Head>

        {isLoaded(trips) && trips.length === 0 && (
          <Alert
            type="info"
            message="Looks like you have some gear now, start customizing it by adding or removing items, or go create your first trip!"
            callToActionLink="/trips/new"
            callToActionLinkText="Create a trip"
          />
        )}

        {isLoaded(fetchedGearCloset) && fetchedGearCloset.length !== 0 && (
          <FlexContainer justifyContent="space-between" alignItems="flex-start" flexWrap="nowrap">
            <p>
              <Button
                type="link"
                to="/gear-closet/new"
                iconLeft={<FaPlusCircle />}
                size="small"
                onClick={() => trackEvent('New Gear Closet Item Button clicked')}
              >
                Add New Item
              </Button>
            </p>
            <div>
              <DropdownMenu width={290}>
                <Link href="/gear-closet/new" legacyBehavior passHref>
                  <a>
                    <FaPlusCircle /> Add New Item
                  </a>
                </Link>
                <button
                  onClick={() => {
                    setAddNewCategoryModalIsOpen(true)
                    trackEvent('Add New Tag to Gear Closet Clicked')
                  }}
                  type="button"
                >
                  <FaFolderOpen /> Add New Category
                </button>
              </DropdownMenu>
            </div>
          </FlexContainer>
        )}

        {isLoaded(fetchedGearCloset) && fetchedGearCloset.length !== 0 && (
          <Table
            columns={columns}
            data={data || []}
            // hasPagination
            // hasSorting
            // hasFiltering
            // rowsPerPage={25}
            // isLoading={personalGearIsLoading}
          />
        )}

        {!isLoaded(fetchedGearCloset) && <LoadingPage />}

        {itemToBeDeleted && (
          <Modal
            toggleModal={() => {
              setItemToBeDeleted(undefined)
              setModalIsOpen(false)
            }}
            isOpen={modalIsOpen}
          >
            <Heading>Are you sure?</Heading>
            <p>
              Are you sure you want to delete <strong>{itemToBeDeleted.name}</strong>? This action
              cannot be undone.
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

        <Modal
          toggleModal={() => {
            setAddNewCategoryModalIsOpen(false)
          }}
          isOpen={addNewCategoryModalIsOpen}
          overflow="inherit"
        >
          <Heading>Add New Category</Heading>

          <p>
            Getting into a new sport or activity, or upgrading your gear? Select any category that
            applies to gear you own.
          </p>
          <Select<SelectGearListCategoryOption, true, GroupedChannelOption>
            className="react-select"
            styles={multiSelectStyles}
            isMulti
            menuPlacement="auto"
            isSearchable={!size.isExtraSmallScreen}
            options={gearListCategoryOptions}
            onChange={(options) =>
              setCategoriesToAdd(options as React.SetStateAction<SelectGearListCategoryOption[]>)
            }
          />
          <div style={{ display: 'flex', justifyContent: 'end', paddingTop: inputPaddingY }}>
            <Button
              type="button"
              iconLeft={<FaPlusCircle />}
              disabled={categoriesToAdd.length === 0}
              onClick={() => saveAddedCategories()}
            >
              Save
            </Button>
          </div>
        </Modal>
      </Box>
    </PageContainer>
  )
}
