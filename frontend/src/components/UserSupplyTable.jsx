import React, { useMemo, useEffect, useState } from 'react'
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
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react'
import { useTable, useSortBy } from 'react-table'
import { useGetSupplyExchangeByUidQuery } from '../features/exchangeApi'
import { useDispatch, useSelector } from 'react-redux'
import { setAllExchanges } from '../features/exchangeSlice'
import { GrFormUp, GrFormDown, GrFormSubtract } from 'react-icons/gr'
import { format } from 'date-fns'
import { selectUser } from '../features/userSlice'
import './table/table.css'
import { useGetAccountByUidQuery } from '../features/accountApi'

export default function UserSupplyTable() {
  const user = useSelector(selectUser)
  const { data: fetchedData, isSuccess } = useGetSupplyExchangeByUidQuery(
    user.uid
  )
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
            size="sm"
            colorScheme="yellow"
            variant="solid"
          >
            查看聯絡方式
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    )

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  const [receiver_uid, setReceiver_uid] = useState('')
  function handleClick(exchanges) {
    setReceiver_uid(exchanges.receiver_uid)
    onOpen()
  }
  const {
    data: receiverInfo,
    error,
    isLoading,
    isFetching,
    isSuccess: success,
  } = useGetAccountByUidQuery(receiver_uid)

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        (receiverInfo.username == undefined)? (<AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>對方資料</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            {isLoading || isFetching ? (
              <center>
                <Spinner />
              </center>
            ) : (
              <>
                Line 暱稱：{receiverInfo.username}
                <br />
                Line ID：{receiverInfo.line_id}
                <br />
                電子郵件地址：{receiverInfo.email}
                <br />
              </>
            )}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onClose} colorScheme="blue" ml={3}>
              關閉
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
        ) : (
        <Spinner />)
      </AlertDialog>
      <Flex grow="true" bg={useColorModeValue('gray.100', 'gray.800')}>
        <Flex grow="true" justify="start" direction="column">
          <TableContainer
            p="5"
            minW="850px"
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
                {rows.map(row => {
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
          </TableContainer>
        </Flex>
      </Flex>
    </>
  )
}
