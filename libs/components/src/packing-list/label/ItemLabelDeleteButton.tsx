import React, { FunctionComponent } from 'react'
import { FaTrash } from 'react-icons/fa'
import ReactTooltip from 'react-tooltip'
import { IconWrapper } from '@packup/components'
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { AppState } from '@packup/redux'

type ItemLabelDeleteButtonProps = {
  id: string
  setShow: (show: boolean) => void
}

export const ItemLabelDeleteButton: FunctionComponent<ItemLabelDeleteButtonProps> = ({ id, setShow }) => {
  const firebase = useFirebase()
  const auth = useSelector((state: AppState) => state.firebase.auth)

  const handleDelete = () => {
    firebase
      .firestore()
      .collection('users')
      .doc(auth.uid)
      .collection('labels')
      .doc(id)
      .delete()
      .then(() => {
        setShow(false)
      })
      .catch((error) => {
        console.error('Error removing document: ', error)
      })
  }

  return (
    <IconWrapper
      onClick={handleDelete}
      data-tip="Delete Label"
      data-for="deleteIcon"
      hoverColor="var(--color-danger)"
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
  )
}
