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
  ItemLabelSelection,
  PackingListSearch,
  ProgressBar,
  Row,
  TripHeader,
} from '@packup/components'
import { useWindowSize } from '@packup/hooks'

import {
  AppState,
  setActivePackingListFilter,
  setLabelListFilter,
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
  quadrupleSpacer,
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
import {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { FaUser, FaUsers } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride'
import { isLoaded, useFirebase } from 'react-redux-firebase'
import { PackingListBannerAd } from './PackingListBannerAd'
import filterItems from '../../../utils/src/filter-items/filterItems'

interface PackingListProps {
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

const StickyInner = styled.div<{ isSmallScreen: boolean; isSticky: boolean }>`
  left: 0;
  right: 0;
  max-width: calc(${breakpoints.xl} - ${doubleSpacer});
  margin: 0 auto;
  ${(props) =>
    props.isSticky &&
    `
  position: fixed;
  z-index: ${zIndexNavbar};
  top: calc(${props.isSmallScreen ? tripleSpacer : quadrupleSpacer} + env(safe-area-inset-top));
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
    activeLabelFilters,
    activePackingListTab,
    personalListScrollPosition,
    sharedListScrollPosition,
    packingListSearchValue,
  } = useSelector((state: AppState) => state.client)
  const dispatch = useDispatch()
  const router = useRouter()
  const size = useWindowSize()

  const profile = useSelector((state: AppState) => state.firebase.profile)
  const firebase = useFirebase()

  const [loadingGearList, setLoadingGearList] = useState(true)
  const [showLabelSelection, setShowLabelSelection] = useState<boolean>(false)
  const [itemId, setItemId] = useState('')

  const toggleLabelSelection = (id: string) => {
    setShowLabelSelection(!showLabelSelection)
    setItemId(id)
  }

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
  const personalItems = packingListCopy?.filter(
    (packingListItem: PackingListItemType) =>
      packingListItem &&
      packingListItem.packedBy &&
      packingListItem.packedBy.length > 0 &&
      packingListItem.packedBy.some((item) => item.uid === auth.uid)
  )

  const sharedItems = packingListCopy?.filter(
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
  const finalItems = filterItems(items, activeLabelFilters, activePackingListFilter)

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

  // Sticky Header stuff
  // TODO: extract all of the sticky header stuff out to its own reusable hook
  const [isSticky, setSticky] = useState(false)
  const stickyRef = useRef<HTMLDivElement>(null)

  // 48 or 64 is height of navbar, plus grab the safe-area-top (sat) from :root css
  const navbarHeightWithSafeAreaOffset = size
    ? (size?.isSmallScreen ? 48 : 64) + getSafeAreaInset('--sat')
    : 64

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
              isSticky ? window.scrollY : stickyRef.current.getBoundingClientRect().top
            )
          : setPersonalListScrollPosition(
              isSticky ? window.scrollY : stickyRef.current.getBoundingClientRect().top
            )
      )
    }
    // change the tab in redux
    dispatch(setActivePackingListTab(tab))
    // update the filter in redux
    dispatch(setActivePackingListFilter(PackingListFilterOptions.All))
    trackEvent(`${tab} Checklist Tab Clicked`)

    // update the scroll position for the new tab you are going to, if it exists
    if (stickyRef.current && (personalListScrollPosition || sharedListScrollPosition)) {
      scrollToPosition(
        (tab === TabOptions.Personal && personalListScrollPosition) ||
          (tab === TabOptions.Shared && sharedListScrollPosition) ||
          // default to bottom of stickyRef if both dont exist
          stickyRef.current.getBoundingClientRect().bottom
      )
    }
  }

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data
    if (isLoaded(auth) && auth?.uid) {
      if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
        firebase
          .firestore()
          .collection('users')
          .doc(auth.uid)
          .update({
            [`preferences.hasSeenPackingListTour`]: true,
          })
      }
    }
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
      <small style={{ textAlign: 'center', display: 'block' }} id="progress">
        {packedPercent}% packed
      </small>
      <StickyWrapper ref={stickyRef}>
        <StickyInner isSticky={isSticky} isSmallScreen={Boolean(size?.isSmallScreen)}>
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
                  <FaUser title="Personal Checklist" /> &nbsp; {TabOptions.Personal}
                </Heading>
              </Tab>
              <Tab
                active={activePackingListTab === TabOptions.Shared}
                onClick={() => handleTabClick(TabOptions.Shared)}
                id="shared-checklist-tab"
              >
                <Heading as="h6" altStyle noMargin>
                  <FaUsers title="Shared Checklist" /> &nbsp; {TabOptions.Shared}
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
                    activeLabels={activeLabelFilters}
                    onLabelChange={setLabelListFilter}
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
                {size.isSmallScreen && !profile?.preferences?.hasSeenPackingListTour && (
                  <Joyride
                    callback={handleJoyrideCallback}
                    scrollOffset={100}
                    locale={{
                      back: 'Back',
                      close: 'Close',
                      last: 'Got it!',
                      next: 'Next',
                      open: 'Open the dialog',
                      skip: 'Skip',
                    }}
                    styles={{
                      options: {
                        arrowColor: 'var(--color-backgroundAlt)',
                        backgroundColor: 'var(--color-backgroundAlt)',
                        primaryColor: 'var(--color-primary)',
                        textColor: 'var(--color-text)',
                      },
                    }}
                    continuous
                    showProgress
                    showSkipButton
                    steps={
                      [
                        {
                          target: '#first-packing-item',
                          content: (
                            <div>
                              <Heading as="h4">Heads up!</Heading>
                              <p>
                                You can swipe to mark an item as a group item (on group trips) or
                                quickly delete it
                              </p>
                              <img src="/images/swipe-hint.gif" />
                            </div>
                          ),
                          placement: 'top',
                          offset: 0,
                        },
                        {
                          target: '#progress',
                          content: (
                            <div>
                              <Heading as="h4">Track your progress</Heading>
                              <p>As you mark items as packed, you can see your progress here.</p>
                            </div>
                          ),
                        },
                        sharedTrip
                          ? {
                              target: '#shared-checklist-tab',
                              content: (
                                <>
                                  <Heading as="h4">Manage Lists</Heading>
                                  <p>
                                    You can switch between your personal checklist and the shared
                                    checklist here
                                  </p>
                                </>
                              ),
                            }
                          : {
                              target: '#first-category',
                              content: (
                                <>
                                  <Heading as="h4">Collapse categories</Heading>
                                  <p>
                                    You can toggle each section open or closed to make it easier to
                                    see what you need to focus on
                                  </p>
                                </>
                              ),
                            },
                      ] as Step[]
                    }
                  />
                )}
                {getGroupedFinalItems && getGroupedFinalItems.length > 0 ? (
                  getGroupedFinalItems.map(
                    ([categoryName, packingListItems]: [string, PackingListItemType[]], index) => {
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
                          // sort by packed status, with checkedf items last
                          return a.isPacked > b.isPacked ? 1 : -1
                        })

                        return (
                          <PackingListCategory
                            categoryIndex={index}
                            trip={trip}
                            key={`${categoryName}-PackingListCategory`}
                            categoryName={categoryName}
                            sortedItems={sortedItems}
                            tripId={tripId}
                            isSharedPackingListCategory={activePackingListTab === TabOptions.Shared}
                            auth={auth}
                            isSharedTrip={sharedTrip}
                            toggleLabelSelection={toggleLabelSelection}
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
            categoryIndex={0}
            categoryName=""
            sortedItems={[]}
            tripId=""
            isSharedPackingListCategory
            toggleLabelSelection={() => {}}
          />
        )}
      </div>

      {showLabelSelection && (
        <ItemLabelSelection
          closeWindow={() => setShowLabelSelection(!showLabelSelection)}
          tripId={tripId}
          itemId={itemId}
        />
      )}
    </>
  )
}
