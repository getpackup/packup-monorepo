import { Button, ButtonGroup } from '@packup/components'
import { baseSpacer } from '@packup/styles'
import { PackingListFilterOptions, trackEvent } from '@packup/utils'
import { FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { FirestoreItemLabel, ItemLabel as ItemLabelType } from '@packup/common'
import { AppState } from '@packup/redux'
import { useFirestoreConnect } from 'react-redux-firebase'

interface PackingListFilterProps {
  disabled: boolean
  activeFilter: PackingListFilterOptions
  onFilterChange: (filter: PackingListFilterOptions) => any
  activeLabels: Array<string>
  onLabelChange: (id: Array<string>) => any
}

const Filters = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${baseSpacer};
  gap: ${baseSpacer};
`

const FilterRow = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  gap: ${baseSpacer};
`

const FilterLabel = styled.span`
  font-weight: bold;
  width: 55px;
`

export const PackingListFilters: FunctionComponent<PackingListFilterProps> = ({
  disabled,
  activeFilter,
  onFilterChange,
  activeLabels,
  onLabelChange,
}): JSX.Element => {
  const filterSettings = [
    PackingListFilterOptions.All,
    PackingListFilterOptions.Packed,
    PackingListFilterOptions.Unpacked,
  ]

  const dispatch = useDispatch()
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const gearItemLabels: Record<string, FirestoreItemLabel> = useSelector(
    (state: AppState) => state.firestore.data[`gearItemLabels`]
  )

  const handleFilter = (filter: PackingListFilterOptions) => {
    trackEvent('Packing List Filter Changed', { filter })
    dispatch(onFilterChange(filter))
  }

  const handleLabels = (label: ItemLabelType) => {
    const tmpLabels = activeLabels

    if (tmpLabels?.includes(label.id)) {
      const index = tmpLabels.indexOf(label.id)
      if (index > -1) {
        tmpLabels.splice(index, 1)
      }
    } else {
      tmpLabels?.push(label.id)
    }

    dispatch(onLabelChange(tmpLabels))
  }

  const labels: Array<ItemLabelType> = Object.keys(gearItemLabels ?? {}).map((id) => {
    return {
      id,
      ...gearItemLabels[id],
    }
  })

  useFirestoreConnect([
    {
      collection: 'users',
      subcollections: [{ collection: 'labels' }],
      doc: auth.uid,
      storeAs: 'gearItemLabels',
    },
  ])

  return (
    <Filters>
      <FilterRow>
        <FilterLabel>Show:</FilterLabel>
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
      </FilterRow>
      {labels.length > 0 && (
        <FilterRow>
          <FilterLabel>Labels:</FilterLabel>
          <ButtonGroup>
            {labels.map((label) => (
              <Button
                key={label.id}
                type="button"
                size="small"
                color={activeLabels?.includes(label.id) ? 'tertiaryAlt' : 'tertiary'}
                onClick={() => handleLabels(label)}
                disabled={disabled}
              >
                {label.text}
              </Button>
            ))}
          </ButtonGroup>
        </FilterRow>
      )}
    </Filters>
  )
}

export default PackingListFilters
