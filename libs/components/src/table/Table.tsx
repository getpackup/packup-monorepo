import { useState } from 'react'
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaChevronRight,
  FaPencilAlt,
  FaSort,
  FaSortAlphaDown,
  FaSortAlphaUp,
  FaTrash,
} from 'react-icons/fa'
import {
  Column,
  Table as ReactTable,
  PaginationState,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  OnChangeFn,
  flexRender,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table'
import { GearItemType } from '@getpackup-group/common'
import { Button, FlexContainer } from '..'
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
} from '@getpackup-group/styles'
import { useRouter } from 'next/router'
import { mergeQueryParams } from '@getpackup-group/utils'
import Pagination from './Pagination'

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

export function Table({
  data,
  columns,
  hasPagination,
}: {
  data: GearItemType[]
  columns: ColumnDef<GearItemType>[]
  hasPagination: boolean
}) {
  const router = useRouter()
  // const { search, currentPage, sortColumn, sortDirection, tag } = router.query

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // initialState: {
    //   // pagination: {
    //   //   // currentPage is 1-indexed
    //   //   pageIndex: currentPage ? Number(currentPage) - 1 : 0,
    //   // },
    // },
  })

  const currentPage = table.getState().pagination.pageIndex + 1
  const pageCount = table.getPageCount()

  return (
    <>
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
          {table.getRowModel().rows.map((row) => {
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
      {hasPagination && (
        <Pagination table={table} currentPage={currentPage} pageCount={pageCount} />
      )}
    </>
  )
}
