import { Button, ButtonGroup } from '@packup/components'
import { baseSpacer } from '@packup/styles'
import { PackingListFilterOptions, trackEvent } from '@packup/utils'
import { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'

type PackingListFilterProps = {
  disabled: boolean
  activeFilter: PackingListFilterOptions
  onFilterChange: (filter: PackingListFilterOptions) => any
}

const Filters = styled.div`
  margin-bottom: ${baseSpacer};
`
export const PackingListFilters: FunctionComponent<PackingListFilterProps> = ({
  disabled,
  activeFilter,
  onFilterChange,
}): JSX.Element => {
  const filterSettings = [
    PackingListFilterOptions.All,
    PackingListFilterOptions.Packed,
    PackingListFilterOptions.Unpacked,
  ]

  const dispatch = useDispatch()

  const handleFilter = (filter: PackingListFilterOptions) => {
    trackEvent('Packing List Filter Changed', { filter })
    dispatch(onFilterChange(filter))
  }

  return (
    <Filters>
      <strong>Show: </strong>
      <ButtonGroup>
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
    </Filters>
  )
}

export default PackingListFilters
