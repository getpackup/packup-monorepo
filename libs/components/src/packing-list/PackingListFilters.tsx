import { Button, ButtonGroup, ItemLabelList } from '@packup/components'
import { baseSpacer } from '@packup/styles'
import { PackingListFilterOptions } from '@packup/utils'
import { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { FirestoreItemLabel, ItemLabel as ItemLabelType } from '@packup/common'
import { AppState } from '@packup/redux'

type PackingListFilterProps = {
  disabled: boolean
  activeFilter: PackingListFilterOptions
  onFilterChange: (filter: PackingListFilterOptions) => any
  onLabelChange: (id: string) => any
}

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${baseSpacer};
`
export const PackingListFilters: FunctionComponent<PackingListFilterProps> = ({
  disabled,
  activeFilter,
  onFilterChange,
  onLabelChange,
}): JSX.Element => {
  const filterSettings = [
    PackingListFilterOptions.All,
    PackingListFilterOptions.Packed,
    PackingListFilterOptions.Unpacked,
  ]

  const dispatch = useDispatch()
  const gearItemLabels: Record<string, FirestoreItemLabel> = useSelector((state: AppState) => state.firestore.data[`gearItemLabels`])

  const handleFilter = (filter: PackingListFilterOptions) => {
    dispatch(onFilterChange(filter))
  }

  const handleLabels = (label: ItemLabelType) => {
    dispatch(onLabelChange(label.id))
  }

  const labels: Array<ItemLabelType> = Object.keys(gearItemLabels ?? {}).map((id) => {
    return {
      id,
      ...gearItemLabels[id]
    }
  })

  console.log('where are my labels at??', labels)

  return (
    <Filters>
      <ButtonGroup>
        <strong>Show: </strong>
        {filterSettings.map((filter) => (
          <Button
            key={filter}
            type="button"
            size="small"
            color={filter === activeFilter ? 'tertiaryAlt' : 'tertiary'}
            onClick={() => handleFilter(filter)}
            disabled={disabled}
          >
            {filter}
          </Button>
        ))}
      </ButtonGroup>
      <ButtonGroup>
        <strong>Labels: </strong>
        {labels.map((label) => (
          <Button
            key={label.id}
            type="button"
            size="small"
            color={'tertiary'}
            onClick={() => handleLabels(label)}
            disabled={disabled}
          >
            {label.text}
          </Button>
        ))}
      </ButtonGroup>
    </Filters>
  )
}

export default PackingListFilters
