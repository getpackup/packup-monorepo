import { PackingListItemType, TripType } from '@packup/common'
import {
  Box,
  Button,
  Column,
  FlexContainer,
  Heading,
  LoadingSpinner,
  PackingListCategory,
  PackingListFilters,
  PackingListSearch,
  ProgressBar,
  Row,
  TripHeader,
} from '@packup/components'

import {
  AppState,
  setActivePackingListFilter,
  setActivePackingListTab,
  setPersonalListScrollPosition,
  setSharedListScrollPosition,
} from '@packup/redux'

import {
  zIndexNavbar,
  baseBorderStyle,
  brandPrimary,
  brandSuccess,
  textColor,
  baseSpacer,
  breakpoints,
  halfSpacer,
  tripleSpacer,
  threeQuarterSpacer,
  fontSizeH5,
  doubleSpacer,
} from '@packup/styles'
import {
  PackingListFilterOptions,
  TabOptions,
  trackEvent,
  getSafeAreaInset,
  groupPackingList,
  isUserTripOwner,
  scrollToPosition,
} from '@packup/utils'
import { useRouter } from 'next/router'
import { FunctionComponent, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FaRegCheckSquare, FaUser, FaUsers } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

type PackingListProps = {
  trip?: TripType
  tripId: string
  packingList: PackingListItemType[]
  tripIsLoaded: boolean
}

const StickyWrapper = styled.div`
  position: relative;
  margin: 0 -${baseSpacer};
  @media only screen and (min-width: ${breakpoints.sm}) {
    /* match values from PageContainer which increase on viewports above breakpoint.sm */
    margin: 0 -${doubleSpacer};
  }
`

const StickyInner = styled.div`
  left: 0;
  right: 0;
  max-width: calc(${breakpoints.xl} - ${doubleSpacer});
  margin: 0 auto;
  ${(props: { isSticky: boolean }) =>
    props.isSticky &&
    `
  position: fixed;
  z-index: ${zIndexNavbar};
  top: calc(${tripleSpacer} + env(safe-area-inset-top));
  `}
`

const Tabs = styled.div`
  background-color: var(--color-background);
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  border-bottom: ${baseBorderStyle};
`

const Tab = styled.div`
  transition: all 0.2s ease-in-out;
  flex: 1;
  text-align: center;
  border-bottom: 2px solid;
  border-bottom-color: ${(props: { active: boolean }) =>
    props.active ? brandPrimary : 'transparent'};
  cursor: pointer;
  font-size: ${fontSizeH5};
  color: ${(props) => (props.active ? brandPrimary : textColor)};
  display: block;
  padding: ${threeQuarterSpacer} ${baseSpacer};
`

export const PackingList: FunctionComponent<PackingListProps> = ({
  trip,
  packingList,
  tripId,
  tripIsLoaded,
}) => {
  const auth = useSelector((state: AppState) => state.firebase.auth)
  const gearList = useSelector((state: AppState) => state.firestore.data['packingList'])
  const {
    activePackingListFilter,
    activePackingListTab,
    personalListScrollPosition,
    sharedListScrollPosition,
    packingListSearchValue,
  } = useSelector((state: AppState) => state.client)
  const dispatch = useDispatch()
  const router = useRouter()

  const [loadingGearList, setLoadingGearList] = useState(true)

  useEffect(() => {
    // show a spinner for N seconds to give the impression of loading, to avoid showing the
    // "nothing to see here" message too quickly
    setTimeout(() => {
      setLoadingGearList(false)
    }, 2000)
  }, [])

  const gearListArray: PackingListItemType[] = gearList ? Object.values(gearList) : []
  const [packedPercent, setPackedPercent] = useState(0)

  const packingListCopy = [...packingList]

  //
  // Personal vs Shared list
  //
  const personalItems =
    packingListCopy &&
    packingListCopy.length > 0 &&
    packingListCopy?.filter(
      (packingListItem: PackingListItemType) =>
        packingListItem &&
        packingListItem.packedBy &&
        packingListItem.packedBy.length > 0 &&
        packingListItem.packedBy.some((item) => item.uid === auth.uid)
    )

  const sharedItems =
    packingListCopy &&
    packingListCopy.length > 0 &&
    packingListCopy?.filter(
      (item) => item.packedBy && item.packedBy.length > 0 && item.packedBy.some((i) => i.isShared)
    )

  // take into account if we are on the personal or shared list
  const items = useMemo(
    () => (activePackingListTab === TabOptions.Personal ? personalItems : sharedItems),
    [activePackingListTab, personalItems, sharedItems]
  )

  // take into account if the unpacked or packed filters are selected
  const filteredItems =
    items &&
    items.length > 0 &&
    items.filter((item) =>
      activePackingListFilter === PackingListFilterOptions.Unpacked ? !item.isPacked : item.isPacked
    )
  // if the filter is All, just return all the items
  const finalItems =
    activePackingListFilter === PackingListFilterOptions.All ? items : filteredItems

  const searchedItems = useMemo(() => {
    return (
      finalItems &&
      finalItems.length &&
      finalItems.filter((i) => i.name.toLowerCase().includes(packingListSearchValue.toLowerCase()))
    )
  }, [packingListSearchValue, finalItems])

  const getGroupedFinalItems =
    searchedItems && searchedItems.length > 0
      ? groupPackingList(searchedItems, auth.uid, activePackingListTab)
      : []

  // filter out only current user's items that are packed
  const packedItemsLength =
    personalItems && personalItems.length > 0
      ? personalItems.filter((item) => item?.isPacked === true).length
      : 0

  useEffect(() => {
    if (personalItems && personalItems.length > 0 && packedItemsLength) {
      setPackedPercent(Number(((packedItemsLength / personalItems.length) * 100).toFixed(0)))
    }
  }, [gearListArray, packedItemsLength])

  // we only need tabs if there are shared items, so hide if not
  const sharedTrip = trip && Object.keys(trip.tripMembers).length > 1

  //
  // Sticky Header stuff
  // TODO: extract all of the sticky header stuff out to its own reusable hook
  const [isSticky, setSticky] = useState(false)
  const stickyRef = useRef<HTMLDivElement>(null)

  // 64 is height of navbar, plus grab the safe-area-top (sat) from :root css
  const navbarHeightWithSafeAreaOffset = 48 + getSafeAreaInset('--sat')

  const handleScroll = useCallback(() => {
    if (stickyRef && stickyRef.current) {
      setSticky(stickyRef.current.getBoundingClientRect().top <= navbarHeightWithSafeAreaOffset)
    }
  }, [])

  useEffect(() => {
    if (document) {
      document.addEventListener('scroll', handleScroll, false)
    }

    return () => {
      if (document) {
        document.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const handleTabClick = (tab: TabOptions) => {
    if (stickyRef && stickyRef.current) {
      // store the scroll position for where the user was curently
      dispatch(
        tab === TabOptions.Personal
          ? setSharedListScrollPosition(
              isSticky ? window.pageYOffset : stickyRef.current.getBoundingClientRect().top
            )
          : setPersonalListScrollPosition(
              isSticky ? window.pageYOffset : stickyRef.current.getBoundingClientRect().top
            )
      )
    }
    // change the tab in redux
    dispatch(setActivePackingListTab(tab))
    // update the filter in redux
    dispatch(setActivePackingListFilter(PackingListFilterOptions.All))
    trackEvent(`${tab} Checklist Tab Clicked`)

    // update the scroll position for the new tab you are going to, if it exists
    if (stickyRef.current && (personalListScrollPosition || sharedListScrollPosition))
      scrollToPosition(
        (tab === TabOptions.Personal && personalListScrollPosition) ||
          (tab === TabOptions.Shared && sharedListScrollPosition) ||
          // default to bottom of stickyRef if both dont exist
          stickyRef.current.getBoundingClientRect().bottom
      )
  }

  // return out early if trip cant be found
  // todo probably a better loading state thing here?
  if (tripIsLoaded && !trip) {
    return null
  }

  // navigate to trip gen page if no packing list exists
  if (tripIsLoaded && packingList.length === 0) {
    router.push(`/trips/${trip?.tripId}/generator`)
  }

  return (
    <>
      <TripHeader trip={trip} userIsTripOwner={isUserTripOwner(trip, auth.uid)} />
      <small style={{ textAlign: 'center', display: 'block' }}>{packedPercent}% packed</small>
      <StickyWrapper ref={stickyRef}>
        <StickyInner isSticky={isSticky}>
          <ProgressBar
            height={halfSpacer}
            borderRadius={0}
            completed={packedPercent}
            isLabelVisible={false}
            bgColor={brandSuccess}
            transitionDuration="0.25s"
          />

          {sharedTrip && (
            <Tabs>
              <Tab
                active={activePackingListTab === TabOptions.Personal}
                onClick={() => handleTabClick(TabOptions.Personal)}
              >
                <Heading as="h6" altStyle noMargin>
                  <FaUser title="Personal Checklist" /> {TabOptions.Personal}
                </Heading>
              </Tab>
              <Tab
                active={activePackingListTab === TabOptions.Shared}
                onClick={() => handleTabClick(TabOptions.Shared)}
              >
                <Heading as="h6" altStyle noMargin>
                  <FaUsers title="Shared Checklist" /> {TabOptions.Shared}
                </Heading>
              </Tab>
            </Tabs>
          )}
        </StickyInner>
      </StickyWrapper>
      <div
        style={{
          paddingTop: isSticky && sharedTrip ? navbarHeightWithSafeAreaOffset : baseSpacer,
        }}
      >
        {trip ? (
          <>
            <div style={{ marginBottom: baseSpacer }}>
              <Row>
                <Column sm={8}>
                  <PackingListFilters
                    activeFilter={activePackingListFilter}
                    onFilterChange={setActivePackingListFilter}
                    disabled={!trip}
                  />
                </Column>
                <Column sm={4}>
                  <PackingListSearch />
                </Column>
              </Row>
            </div>

            {loadingGearList ? (
              <Box largePadding>
                <FlexContainer justifyContent="center" alignItems="center" flexDirection="column">
                  <LoadingSpinner />
                  <p style={{ marginTop: baseSpacer }}>
                    Loading your custom packing list, please hold tight...
                  </p>
                </FlexContainer>
              </Box>
            ) : (
              <>
                {getGroupedFinalItems && getGroupedFinalItems.length > 0 ? (
                  getGroupedFinalItems.map(
                    ([categoryName, packingListItems]: [string, PackingListItemType[]]) => {
                      if (categoryName && packingListItems.length > 0) {
                        const sortedItems = packingListItems.sort((a, b) => {
                          if (a?.isPacked === b?.isPacked) {
                            // sort by name
                            if (a?.created?.seconds === b?.created?.seconds) {
                              return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                            }
                            // sort by timestamp
                            return b.created.toDate() > a.created.toDate() ? -1 : 1
                          }
                          // sort by packed status, with checked items last
                          return a.isPacked > b.isPacked ? 1 : -1
                        })
                        return (
                          <PackingListCategory
                            trip={trip}
                            key={`${categoryName}-PackingListCategory`}
                            categoryName={categoryName}
                            sortedItems={sortedItems}
                            tripId={tripId}
                            isSharedPackingListCategory={activePackingListTab === TabOptions.Shared}
                            auth={auth}
                            isSharedTrip={sharedTrip}
                          />
                        )
                      }
                      return null
                    }
                  )
                ) : (
                  <Box largePadding>
                    <Heading as="h3" align="center">
                      Nothing to see here 👀
                    </Heading>
                    {activePackingListFilter === PackingListFilterOptions.All ? (
                      <p style={{ textAlign: 'center' }}>
                        {activePackingListTab === TabOptions.Shared
                          ? "No items have been marked as a shared group item yet. Didn't you learn to share as a kid!? Sharing is caring ☺️"
                          : 'Something went wrong, please refresh the page to try loading your packing list again.'}
                      </p>
                    ) : (
                      <p style={{ textAlign: 'center' }}>
                        Try changing your filters from{' '}
                        <strong>
                          {activePackingListFilter === PackingListFilterOptions.Packed
                            ? PackingListFilterOptions.Packed
                            : PackingListFilterOptions.Unpacked}
                        </strong>{' '}
                        to{' '}
                        <Button
                          type="button"
                          color="tertiary"
                          size="small"
                          onClick={() =>
                            dispatch(
                              setActivePackingListFilter(
                                activePackingListFilter === PackingListFilterOptions.Packed
                                  ? PackingListFilterOptions.Unpacked
                                  : PackingListFilterOptions.Packed
                              )
                            )
                          }
                        >
                          {activePackingListFilter === PackingListFilterOptions.Packed
                            ? PackingListFilterOptions.Unpacked
                            : PackingListFilterOptions.Packed}
                        </Button>{' '}
                        or{' '}
                        <Button
                          type="button"
                          color="tertiary"
                          size="small"
                          onClick={() =>
                            dispatch(setActivePackingListFilter(PackingListFilterOptions.All))
                          }
                        >
                          All
                        </Button>
                      </p>
                    )}
                  </Box>
                )}
              </>
            )}
          </>
        ) : (
          <PackingListCategory
            categoryName=""
            sortedItems={[]}
            tripId=""
            isSharedPackingListCategory
          />
        )}
      </div>
    </>
  )
}
