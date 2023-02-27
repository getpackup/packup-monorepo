import { useState } from 'react'
import { FaSort, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  FilterFn,
} from '@tanstack/react-table'
import { RankingInfo, rankItem } from '@tanstack/match-sorter-utils'
import { GearItemType } from '@packup/common'
import styled from 'styled-components'
import {
  baseBorderStyle,
  baseSpacer,
  fontSizeSmall,
  halfSpacer,
  lightestGray,
  quarterSpacer,
  textColorLight,
  white,
} from '@packup/styles'
import Pagination from './Pagination'
import Skeleton from 'react-loading-skeleton'
import Filter from './Filter'
import { FlexContainer } from '../flex-container/FlexContainer'
import { Button } from '../button/Button'
import { Column } from '../column/Column'
import { Row } from '../row/Row'

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

const StyledTable = styled.table`
  margin-bottom: ${baseSpacer};
  width: 100%;
  font-size: ${fontSizeSmall};
  border: none;
  table-layout: fixed;
`

const StyledTr = styled.tr`
  border-bottom: ${baseBorderStyle};
  &:hover {
    background-color: ${white};
  }

  &:hover svg {
    visibility: visible;
  }
`

const StyledTd = styled.td`
  padding: ${halfSpacer} ${quarterSpacer};
  border: none;
`

const StyledTh = styled.th`
  padding: ${halfSpacer} ${quarterSpacer};
  font-weight: bold;
  border: ${baseBorderStyle};
  background-color: ${lightestGray};
  text-transform: uppercase;
`

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

export function Table({
  data,
  columns,
  hasPagination,
}: {
  data: GearItemType[]
  columns: ColumnDef<GearItemType>[]
  hasPagination?: boolean
}) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    initialState: {
      sorting,
      pagination: hasPagination
        ? {
            pageSize: 25,
            pageIndex: 0,
          }
        : undefined,
    },
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: hasPagination ? getPaginationRowModel() : undefined,
  })

  const currentPage = table.getState().pagination.pageIndex + 1
  const pageCount = table.getPageCount()

  return (
    <>
      <Row>
        <Column sm={4} smOffset={8} md={3} mdOffset={9}>
          <Filter value={globalFilter ?? ''} onChange={(value) => setGlobalFilter(String(value))} />
        </Column>
      </Row>
      <StyledTable>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <StyledTr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <StyledTh key={header.id} colSpan={header.colSpan}>
                    <div
                      style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                      onClick={
                        header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <>
                          {' '}
                          {{
                            asc: <FaSortAlphaUp />,
                            desc: <FaSortAlphaDown />,
                          }[header.column.getIsSorted() as string] ?? (
                            <FaSort color={textColorLight} />
                          )}
                        </>
                      )}
                    </div>
                  </StyledTh>
                )
              })}
            </StyledTr>
          ))}
        </thead>
        <tbody>
          {data.length === 0
            ? Array.from({ length: 25 }).map((_, index) => (
                // Loading state
                <StyledTr key={index}>
                  <StyledTd>
                    <Skeleton count={1} width={`${Math.random() * (70 - 20) + 20}%`} />
                  </StyledTd>
                  <StyledTd>
                    <Skeleton count={1} width={`${Math.random() * (70 - 20) + 20}%`} />
                  </StyledTd>
                  <StyledTd></StyledTd>
                </StyledTr>
              ))
            : table.getRowModel().rows.map((row) => {
                return (
                  <StyledTr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <StyledTd key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </StyledTd>
                      )
                    })}
                  </StyledTr>
                )
              })}
        </tbody>
      </StyledTable>
      {table.getPrePaginationRowModel().rows.length === 0 && (
        <FlexContainer flexDirection="column">
          <p>
            No results found for <strong>{globalFilter}</strong>
          </p>
          <Button type="button" color="tertiary" size="small" onClick={() => setGlobalFilter('')}>
            Clear
          </Button>
        </FlexContainer>
      )}
      {hasPagination && (
        <Pagination table={table} currentPage={currentPage} pageCount={pageCount} />
      )}
    </>
  )
}
