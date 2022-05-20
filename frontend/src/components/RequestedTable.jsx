import React, { useMemo, useEffect } from 'react'
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useColorModeValue,
  Icon,
  Box,
  Spacer,
  Button,
} from '@chakra-ui/react'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table'
import { REQUESTED_COLUMNS } from './table/RequestedColumns'
import { useGetExchangesQuery } from '../features/exchangeApi'
import { useDispatch } from 'react-redux'
import { setAllExchanges } from '../features/exchangeSlice'
import { GrFormUp, GrFormDown, GrFormSubtract } from 'react-icons/gr'
import { TableNavBar } from './TableNavBar'
import './table/table.css'

export default function RequestedTable() {
  const { data: fetchedData, isSuccess } = useGetExchangesQuery()
  const dispatch = useDispatch()
  const columns = useMemo(() => REQUESTED_COLUMNS, [])
  useEffect(() => {
    if (isSuccess) {
      dispatch(setAllExchanges(fetchedData))
    }
  })
  const data = useMemo(() => {
    if (isSuccess) {
      return fetchedData
    } else {
      return []
    }
  }, [isSuccess, fetchedData])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    prepareRow,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const { pageIndex, globalFilter } = state

  return (
    <Flex bg={useColorModeValue('gray.100', 'gray.800')}>
      <Spacer />
      <Flex w="80%" minW="80%" h="100vh" justify="start" direction="column">
        <TableNavBar
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <TableContainer
          p="5"
          minW="850px"
          rounded="lg"
          border="1px"
          borderColor="gray.400"
          overflowX="hidden"
        >
          <Table colorScheme="blackAlpha" size="md" {...getTableProps()}>
            <Thead bg={useColorModeValue('teal.400', 'gray.700')}>
              {headerGroups.map(headerGroup => (
                <Tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <Th
                      className="table-header"
                      fontSize={'16px'}
                      textAlign="center"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render('Header')}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <Icon ml="1" pt="1" as={GrFormDown} />
                        ) : (
                          <Icon ml="1" pt="1" as={GrFormUp} />
                        )
                      ) : column.canSort ? (
                        <Icon ml="1" pt="1" as={GrFormSubtract} />
                      ) : (
                        ' '
                      )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row)
                return (
                  <Tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <Td
                          className="table-cell"
                          textAlign="center"
                          {...cell.getCellProps()}
                        >
                          {cell.render('Cell')}
                        </Td>
                      )
                    })}
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
          <Box>
            <center>
              <Button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                mx="2"
                mt="5"
                size="sm"
                colorScheme="teal"
                variant="outline"
              >
                上一頁
              </Button>
              <Button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                mx="2"
                mt="5"
                size="sm"
                colorScheme="teal"
                variant="outline"
              >
                下一頁
              </Button>
            </center>
          </Box>
          <center>
            第 {pageIndex + 1} / {pageOptions.length} 頁
          </center>
        </TableContainer>
      </Flex>
      <Spacer />
    </Flex>
  )
}
