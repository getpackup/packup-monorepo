import React, { FunctionComponent } from 'react'
import { FaTrash } from 'react-icons/fa'
import ReactTooltip from 'react-tooltip'
import { IconWrapper } from '@packup/components'

type ItemLabelDeleteButtonProps = {
  onClick: (e: any) => void
}

export const ItemLabelDeleteButton: FunctionComponent<ItemLabelDeleteButtonProps> = ({ onClick }) => {
  return (
    <IconWrapper
      onClick={onClick}
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
