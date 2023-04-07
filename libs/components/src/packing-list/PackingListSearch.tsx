import { sharedStyles } from '@packup/components'
import { AppState, setPackingListSearchValue } from '@packup/redux'
import { baseSpacer, doubleSpacer, quarterSpacer } from '@packup/styles'
import { ChangeEvent, FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

type PackingListSearchProps = {}

const StyledSearchBox = styled.input<any>`
  ${sharedStyles};
  width: 100%;
  padding: ${quarterSpacer} ${baseSpacer};
  height: initial;
  border-radius: ${doubleSpacer};
`
export const PackingListSearch: FunctionComponent<PackingListSearchProps> = (): JSX.Element => {
  const dispatch = useDispatch()
  const { packingListSearchValue } = useSelector((state: AppState) => state.client)

  const handleSearch = (value: string) => {
    dispatch(setPackingListSearchValue(value))
  }

  return (
    <div>
      <StyledSearchBox
        type="search"
        value={packingListSearchValue}
        placeholder="Search for items"
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
      />
    </div>
  )
}

export default PackingListSearch
