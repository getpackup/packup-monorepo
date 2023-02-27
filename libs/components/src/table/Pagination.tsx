import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Table as ReactTable } from '@tanstack/react-table'

import { Button, FlexContainer } from '..'
import { GearItemType } from '@packup/common'

type PaginationProps = {
  currentPage: number
  pageCount: number
  table: ReactTable<GearItemType>
}

const Pagination = ({ table, currentPage, pageCount }: PaginationProps) => (
  <FlexContainer justifyContent="space-between">
    <div>
      <Button
        type="button"
        size="small"
        rightSpacer
        color="tertiary"
        onClick={() => {
          table.setPageIndex(0)
          // set to empty string to remove currentPage query string param
          // router.push(mergeQueryParams({ currentPage: '' }, router.query))
        }}
        disabled={!table.getCanPreviousPage()}
      >
        <FaAngleDoubleLeft />
      </Button>

      <Button
        type="button"
        size="small"
        color="tertiary"
        onClick={() => {
          table.previousPage()
          // router.push(
          //   mergeQueryParams(
          //     {
          //       currentPage:
          //         // currentPage index starts at 1 to match displayed text in pagination on UI
          //         // if on page 2 and going to page 1, set 1 for currentPage
          //         currentPage === '2' ? '1' : String(Number(currentPage) - 1),
          //     },
          //     router.query
          //   )
          // )
        }}
        disabled={!table.getCanPreviousPage()}
      >
        <FaAngleLeft />
      </Button>
    </div>
    <small>
      Page {currentPage} of {pageCount}
    </small>
    <div>
      <Button
        type="button"
        color="tertiary"
        size="small"
        rightSpacer
        onClick={() => {
          table.nextPage()
          // router.push(
          //   mergeQueryParams(
          //     {
          //       currentPage:
          //         // currentPage index starts at 1 to match displayed text in pagination on UI
          //         // if no currentPage, we are on page 1 so go to page 2
          //         currentPage ? String(Number(currentPage) + 1) : '2',
          //     },
          //     router.query
          //   )
          // )
        }}
        disabled={!table.getCanNextPage()}
      >
        <FaAngleRight />
      </Button>

      <Button
        type="button"
        color="tertiary"
        size="small"
        onClick={() => {
          table.setPageIndex(table.getPageCount() - 1)
          // router.push(mergeQueryParams({ currentPage: String(pageCount) }, router.query))
        }}
        disabled={!table.getCanNextPage()}
      >
        <FaAngleDoubleRight />
      </Button>
    </div>
  </FlexContainer>
)

export default Pagination
