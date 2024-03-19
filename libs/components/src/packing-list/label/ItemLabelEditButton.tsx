import React, { FunctionComponent } from 'react'
import { brandPrimary } from '@packup/styles'
import { FaPencilAlt } from 'react-icons/fa'
import ReactTooltip from 'react-tooltip'
import { IconWrapper } from '@packup/components'

type ItemLabelEditButtonProps = {
  onClick: (e: any) => void
}

export const ItemLabelEditButton: FunctionComponent<ItemLabelEditButtonProps> = ({ onClick }) => {
  return (
    <IconWrapper
      onClick={onClick}
      hoverColor={brandPrimary}
      data-tip="Edit Label"
      data-for="editLabelIcon"
    >
      <FaPencilAlt />
      <ReactTooltip
        id="editLabelIcon"
        place="top"
        type="dark"
        effect="solid"
        className="tooltip customTooltip"
      />
    </IconWrapper>
  )
}
