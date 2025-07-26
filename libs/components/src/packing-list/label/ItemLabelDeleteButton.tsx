import React, { FunctionComponent } from 'react'
import { FaTrash } from 'react-icons/fa'
import ReactTooltip from 'react-tooltip'
import { IconWrapper } from '@packup/components'
import { useFirebase } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { AppState } from '@packup/redux'
import toast from 'react-hot-toast'
import { trackEvent } from '@packup/utils'

type ItemLabelDeleteButtonProps = {
  id: string
  setShow: (show: boolean) => void
}

export const ItemLabelDeleteButton: FunctionComponent<ItemLabelDeleteButtonProps> = ({ id, setShow }) => {
  const firebase = useFirebase()
  const auth = useSelector((state: AppState) => state.firebase.auth)

  const handleDelete = async () => {
    firebase
      .firestore()
      .collection('users')
      .doc(auth.uid)
      .collection('labels')
      .doc(id)
      .delete()
      .then(() => {
        setShow(false)
        toast.success('Label deleted!')
      })
      .catch((error) => {
        toast.error('Failed to delete label.')
        trackEvent('User Label Create Failure', {
          error,
        })
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
