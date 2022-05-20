import { format } from 'date-fns'
import { RegionFilter } from './RegionFilter'
import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

function handleProvide(exchange) {
  console.log('handleProvide :', exchange)
}

export const REQUESTED_COLUMNS = [
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
          onClick={() => handleProvide(row.original)}
          leftIcon={<AddIcon />}
          size="sm"
          colorScheme="yellow"
          variant="solid"
        >
          提供
        </Button>
      </div>
    ),
  },
]
