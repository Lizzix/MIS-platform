import React, { useMemo, useEffect, useState, useReducer } from 'react'
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from 'react-table'
import { useGetExchangesQuery } from '../features/exchangeApi'
import { useDispatch, useSelector } from 'react-redux'
import { setAllExchanges } from '../features/exchangeSlice'
import { GrFormUp, GrFormDown, GrFormSubtract } from 'react-icons/gr'
import { GlobalSearchFilter } from './table/GlobalSearchFilter'
import { RegionFilter } from './table/RegionFilter'
import { format } from 'date-fns'
import { AddIcon } from '@chakra-ui/icons'
import { selectUser } from '../features/userSlice'
import './table/table.css'
import axios from 'axios'

export default function RequestedTable() {
  const { data: fetchedData, isSuccess } = useGetExchangesQuery()
  const REQUESTED_COLUMNS = [
    {
      Header: '新增時間',
      accessor: 'date_added',
      Cell: ({ cell: { value } }) => format(new Date(value), 'MM/dd HH:mm'),
    },
    {
      Header: '狀態',
      accessor: 'status',
    },
    {
      Header: '物品名稱',
      accessor: 'item',
      Cell: ({ row }) => <div className="text-trunc">{row.values.item}</div>,
    },
    {
      Header: '地區',
      accessor: 'region',
      Filter: RegionFilter,
      filter: 'includes',
    },
    {
      Header: '備註',
      accessor: 'notes',
      disableSortBy: true,
      Cell: ({ row }) => <div className="text-trunc">{row.values.notes}</div>,
    },
    {
      Header: ' ',
      disableSortBy: true,
      Cell: ({ row }) => (
        <div>
          <Button
            onClick={e => handleClick(row.original)}
            leftIcon={<AddIcon />}
            size="sm"
            colorScheme="yellow"
            variant="solid"
            disabled={row.original.status != '等待中'}
          >
            提供
          </Button>
        </div>
      ),
    },
  ]

  const dispatch = useDispatch()
  const columns = useMemo(() => REQUESTED_COLUMNS, [])
  const [data, setData] = useState([])
  useEffect(() => {
    if (isSuccess) {
      dispatch(setAllExchanges(fetchedData))
      setData(fetchedData)
    }
  }, [isSuccess])

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

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [target, setTarget] = useState([])
  const user = useSelector(selectUser)
  const toast = useToast()
  function handleClick(target_data) {
    setTarget(target_data)
    onOpen()
  }
  function handleProvide() {
    axios
      .put('http://127.0.0.1:5000/exchanges/' + target.id, {
        provider_uid: user.uid,
        status: '媒合成功',
      })
      .then(
        result => {
          console.log(result)
          toast({
            description: '媒合成功！',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
          })
          onClose()
          // window.location.reload()
        },
        error => {
          console.log(error)
          toast({
            description: '操作失敗！請稍後再試。',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
          })
          onClose()
        }
      )
  }
  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>確定要提供嗎？</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            物品名稱：{target.item}
            <br />
            地區：{target.region}
            <br />
            備註：{target.notes}
            <br />
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              取消
            </Button>
            <Button onClick={handleProvide} colorScheme="red" ml={3}>
              確定
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Flex bg={useColorModeValue('gray.100', 'gray.800')}>
        <Spacer />
        <Flex w="80%" minW="80%" h="100vh" justify="start" direction="column">
          <Flex
            p="5"
            justify={'center'}
            direction="row"
            align="start"
            bg={useColorModeValue('gray.100', 'gray.800')}
          >
            <Button
              mr="2"
              colorScheme="teal"
              onClick={() => window.location.reload()}
            >
              更新
            </Button>
            <RegionFilter
              border="1px"
              borderColor="gray.400"
              filter={globalFilter}
              setFilter={setGlobalFilter}
            />
            <Spacer />
            <GlobalSearchFilter
              filter={globalFilter}
              setFilter={setGlobalFilter}
            />
          </Flex>
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
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
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
    </>
  )
}
