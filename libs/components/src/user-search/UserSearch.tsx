import 'instantsearch.css/themes/satellite.css'

import { TripType, UserType } from '@packup/common'
import {
  Alert,
  Button,
  FlexContainer,
  HorizontalRule,
  Modal,
  SendInviteForm,
  UserMediaObject,
} from '@packup/components'
import { AppState } from '@packup/redux'
import {
  zIndexDropdown,
  baseBorderStyle,
  z1Shadow,
  baseSpacer,
  doubleSpacer,
  halfSpacer,
  quarterSpacer,
} from '@packup/styles'
import { alogliaSearch, trackEvent } from '@packup/utils'
import { Fragment, FunctionComponent, useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import {
  Configure,
  InstantSearch,
  PoweredBy,
  connectCurrentRefinements,
  connectInfiniteHits,
  connectSearchBox,
  connectStateResults,
} from 'react-instantsearch-dom'
import { BasicDoc, StateResultsProvided } from 'react-instantsearch-core'
import Skeleton from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { sharedStyles } from '../input/Input'

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: ${baseSpacer};
`

const ScrollableHitsWrapper = styled.div`
  overflow-y: auto;
  max-height: 400px;
  box-shadow: ${z1Shadow};
  position: absolute;
  left: 0;
  right: 0;
  z-index: ${zIndexDropdown};
  padding: ${baseSpacer};
  border: ${baseBorderStyle};
  background-color: var(--color-background);
`

const StyledSearchBox = styled.input<any>`
  ${sharedStyles};
`

type UserSearchProps = {
  updateTrip: (uid: string, email: string, greetingName: string) => void
  activeTrip?: TripType
  isSearchBarDisabled: boolean
}

export const UserSearch: FunctionComponent<UserSearchProps> = ({
  updateTrip,
  activeTrip,
  isSearchBarDisabled,
}) => {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const [showManualShareModal, setShowManualShareModal] = useState<boolean>(false)

  const InviteButton = ({
    items,
    refine,
    hit,
  }: {
    items: any
    refine: (val: any) => void
    hit: UserType
  }) => (
    <Button
      type="button"
      color="primaryOutline"
      onClick={() => {
        refine(items)
        updateTrip(hit.uid, hit.email, hit.displayName)
        trackEvent('Trip Party Search User Added', {
          hit,
          activeTrip,
        })
      }}
      size="small"
    >
      Add
    </Button>
  )

  const InviteButtonWithClearSearch = connectCurrentRefinements(InviteButton)

  const ClearQueryButton = ({ items, refine }: { items: any; refine: (val: any) => void }) => (
    <p style={{ textAlign: 'center' }}>
      Friend not on Packup yet?{' '}
      <Button
        type="button"
        onClick={() => {
          refine(items)
          setShowManualShareModal(true)
          trackEvent('Send Invite Modal Opened', {
            location: 'Trip Party Search',
            trip: activeTrip || 'new',
          })
        }}
        size="small"
      >
        Send an Invite
      </Button>
    </p>
  )

  const ClearRefinementsButton = connectCurrentRefinements(ClearQueryButton)

  const getActionButton = (hit: UserType) => {
    const matchingUser =
      activeTrip &&
      activeTrip.tripMembers &&
      Object.values(activeTrip.tripMembers).find((member) => member.uid === hit.uid)
    if (matchingUser) {
      return (
        <Button type="button" color="tertiary" size="small" disabled>
          {matchingUser.status}
        </Button>
      )
    }
    return <InviteButtonWithClearSearch clearsQuery hit={hit} />
  }

  const Hit = ({ hit }: { hit: UserType }) => (
    <UserMediaObject
      user={hit}
      avatarSize="sm"
      showSecondaryContent
      action={getActionButton(hit)}
    />
  )

  const Results = connectStateResults(
    (
      props: StateResultsProvided<BasicDoc> & {
        hasMore: boolean
        refineNext: () => void
        hits: any
      }
    ) => {
      const loading = props.isSearchStalled || props.searching
      const hasResults = props.searchResults && props.searchResults.nbHits !== 0
      const hasEmptyQuery =
        !Object.prototype.hasOwnProperty.call(props.searchState, 'query') ||
        props.searchState.query === ''

      const [sentryRef, { rootRef }] = useInfiniteScroll({
        loading,
        hasNextPage: props.hasMore,
        onLoadMore() {
          props.refineNext()
        },
      })

      return (
        <ScrollableHitsWrapper ref={rootRef} hidden={hasEmptyQuery}>
          {true && (
            <>
              {/* 
                toggle display to stop infinite loop caused by hits 
                https://github.com/algolia/react-instantsearch/issues/137#issuecomment-349385276
              */}
              <div style={{ display: props.searching ? 'none' : 'block' }}>
                {hasResults &&
                  props.hits &&
                  props.hits.length >= 1 &&
                  props.hits[0] !== undefined &&
                  props.hits.map((hit: UserType & { objectID: string }) => (
                    <Fragment key={hit.objectID}>
                      <Hit hit={hit} />
                      <HorizontalRule compact />
                    </Fragment>
                  ))}
              </div>
              {!loading && !props.hasMore && hasResults && (
                <>
                  <p style={{ textAlign: 'center' }}>
                    No more results found for <strong>{props.searchState.query}</strong>.
                  </p>
                  <ClearRefinementsButton clearsQuery />
                </>
              )}
              {(loading || props.hasMore) && (
                <div ref={sentryRef}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Fragment key={`loadingListItem${index}`}>
                      <FlexContainer>
                        <Skeleton
                          circle
                          width={doubleSpacer}
                          height={doubleSpacer}
                          style={{ marginRight: halfSpacer }}
                        />
                        <div style={{ flex: 1 }}>
                          <Skeleton height={doubleSpacer} style={{ margin: halfSpacer }} />
                        </div>
                      </FlexContainer>
                      <HorizontalRule compact />
                    </Fragment>
                  ))}
                </div>
              )}
            </>
          )}

          {!loading && props.error && (
            <Alert type="info" message="Something went wrong, please try again later" />
          )}
          {!loading && !props.error && !hasResults && !hasEmptyQuery && (
            <>
              <p style={{ textAlign: 'center' }}>
                No results found for <strong>{props.searchState.query}</strong>.
              </p>
              <ClearRefinementsButton clearsQuery />
            </>
          )}
        </ScrollableHitsWrapper>
      )
    }
  )

  const ConnectedResults = connectInfiniteHits(Results)

  const SearchBox = ({
    currentRefinement,
    refine,
  }: {
    currentRefinement: string
    refine: (val: string) => void
  }) => (
    <StyledSearchBox
      type="search"
      value={currentRefinement}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => refine(event.currentTarget.value)}
      placeholder="Search by username, email, or real name..."
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      disabled={isSearchBarDisabled}
    />
  )

  const ConnectedSearchBox = connectSearchBox(SearchBox)

  return (
    <>
      <Modal isOpen={showManualShareModal} toggleModal={() => setShowManualShareModal(false)}>
        <SendInviteForm />
      </Modal>
      <SearchWrapper>
        <InstantSearch
          searchClient={alogliaSearch}
          indexName="Users"
          onSearchStateChange={(searchState) => {
            if (searchState.query !== '') {
              trackEvent('Trip Party Search', { query: searchState.query })
            }
          }}
        >
          <Configure hitsPerPage={10} filters={`NOT uid:${auth.uid}`} />
          <ConnectedSearchBox />
          <ConnectedResults />

          <FlexContainer justifyContent="flex-end" as="small">
            <PoweredBy />
          </FlexContainer>
        </InstantSearch>
      </SearchWrapper>
    </>
  )
}

export default UserSearch
