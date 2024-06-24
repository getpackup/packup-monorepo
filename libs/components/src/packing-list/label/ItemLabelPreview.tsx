import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { baseSpacer } from '@packup/styles'
import { getLabelColor } from '@packup/utils'

type PackingListLabelPreviewProps = {
  color: string
  text: string
}

const LabelPreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  border-radius: 3px;
  margin-bottom: ${baseSpacer};
`

const LabelPreviewText = styled.p`
  font-size: 1.5rem;
  margin: 0;
`

export const ItemLabelPreview: FunctionComponent<PackingListLabelPreviewProps> = ({color, text}) => {
  const mode = localStorage.getItem('color-mode') ?? 'dark'
  const labelColor = getLabelColor(color, mode)

  return (
    <LabelPreviewContainer style={{backgroundColor: labelColor.bgColor}}>
      <LabelPreviewText style={{color: labelColor.color}}>
        {text || 'Label Text'}
      </LabelPreviewText>
    </LabelPreviewContainer>
  )
}
