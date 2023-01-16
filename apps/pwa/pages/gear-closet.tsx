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
} from '@getpackup-group/components'
import { usePersonalGear } from '@getpackup-group/hooks'
import { AppState } from '@getpackup-group/redux'
import { lightGray, halfSpacer, inputPaddingY } from '@getpackup-group/styles'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaFolderOpen, FaInfoCircle, FaPencilAlt, FaPlusCircle, FaTrash } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { isLoaded, useFirebase, useFirestoreConnect } from 'react-redux-firebase'
import Select from 'react-select'
import ReactTooltip from 'react-tooltip'
import Head from 'next/head'
import { createColumnHelper } from '@tanstack/react-table'

type SelectGearListCategoryOption = {
  readonly value: keyof ActivityTypes
  readonly label: string
}

export type GroupedChannelOption = {
  readonly label: string
  readonly options: readonly SelectGearListCategoryOption[]
}

export default function GearCloset() {
  const size = useWindowSize()
  const firebase = useFirebase()
  const router = useRouter()
  const personalGear = usePersonalGear()
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

  // const personalGearIsLoading = personalGear === 'loading'
  const columnHelper = createColumnHelper<GearItemType>()

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
    columnHelper.display({
      id: 'actions',
      header: '',
      enableSorting: false,
      // cell: (props) => <div>{console.log(props)}</div>,
    }),
  ]

  const sortedGearList = () =>
    auth?.uid && personalGear?.length > 0
      ? [...(personalGear as Array<GearItemType>)].sort((a: GearItemType, b: GearItemType) =>
          a.name.localeCompare(b.name)
        )
      : []

  const data = sortedGearList().map((item: GearItemType) => ({
    ...item,
    actions: [
      {
        label: <FaPencilAlt />,
        to: `/gear-closet/${item.id}`,
        color: 'primaryOutline',
      },
      {
        label: <FaTrash />,
        color: 'dangerOutline',
        onClick: () => {
          setModalIsOpen(true)
          setItemToBeDeleted(item)
        },
      },
    ],
  }))

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

  if (!auth || !auth.isLoaded) {
    return <LoadingPage />
  }

  return (
    <PageContainer>
      <Head>
        <title>Gear Closet | Packup</title>
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
          <div>
            <Heading altStyle style={{ display: 'inline' }}>
              Gear Closet
            </Heading>
            <FaInfoCircle
              color={lightGray}
              style={{ marginLeft: halfSpacer }}
              data-tip="An at-a-glance look at all of your gear, categorized and tagged to generate packing
    lists on future trips. Keep track of item weight, quanities, and notes for
    each item."
              data-for="info"
            />
            <ReactTooltip
              id="info"
              place="top"
              type="dark"
              effect="solid"
              className="tooltip customTooltip customTooltip200"
            />
          </div>
          <div>
            <DropdownMenu width={290}>
              <Link href="/gear-closet/new">
                <FaPlusCircle /> Add New Item
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

      {isLoaded(fetchedGearCloset) && fetchedGearCloset.length !== 0 && (
        <Table
          columns={columns}
          data={data || []}
          hasPagination
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
          applies to gear you own!
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
        {categoriesToAdd?.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'end', paddingTop: inputPaddingY }}>
            <Button type="button" iconLeft={<FaPlusCircle />} onClick={() => saveAddedCategories()}>
              Save
            </Button>
          </div>
        )}
      </Modal>
    </PageContainer>
  )
}
