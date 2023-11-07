import { GearItemType } from '@packup/common'
import { AppState } from '@packup/redux'
import { brandDanger, brandPrimary, halfSpacer, lightestGray } from '@packup/styles'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaPencilAlt, FaPlusCircle, FaTrash } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { isEmpty, isLoaded, useFirebase, useFirestoreConnect } from 'react-redux-firebase'

import {
  Box,
  Button,
  Column,
  FlexContainer,
  Heading,
  IconWrapper,
  Modal,
  PageContainer,
  Row,
  Table,
} from '../../../components'

function RowActions(props) {
  return (
    <FlexContainer justifyContent="flex-end" flexWrap="nowrap">
      <Link href={`/admin/gear-list/${props.row.original.id}`}>
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

export function GearList() {
  const firebase = useFirebase()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [itemToBeDeleted, setItemToBeDeleted] = useState<GearItemType | undefined>(undefined)
  const gear = useSelector((state: AppState) => state.firestore.ordered.gear)

  useFirestoreConnect([{ collection: 'gear' }])

  const router = useRouter()

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

  const deleteItem = (item: GearItemType) => {
    firebase
      .firestore()
      .collection('gear')
      .doc(item.id)
      .delete()
      .then()
      .catch((err) => {
        toast.error(err.message)
      })
    setItemToBeDeleted(undefined)
    setModalIsOpen(false)
  }

  const sortedGearList =
    isLoaded(gear) &&
    !isEmpty(gear) &&
    gear &&
    gear.length > 0 &&
    [...gear].sort((a: GearItemType, b: GearItemType) => a.name.localeCompare(b.name))

  return (
    <PageContainer>
      <Box>
        <Head>
          <title>Master Gear List</title>
        </Head>
        <p>
          <Button type="link" to="/admin/gear-list/new" iconLeft={<FaPlusCircle />}>
            Add New Item
          </Button>
        </p>

        <Table columns={columns} data={sortedGearList || []} />

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
              Are you sure you want to delete {itemToBeDeleted.name}{' '}
              <strong>FOR EVERYONE!?!?!?!</strong> This action cannot be undone.
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
      </Box>
    </PageContainer>
  )
}

export default GearList
