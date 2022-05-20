import React from 'react'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
export const GlobalSearchFilter = ({ filter, setFilter }) => {
  return (
    <span>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          border="1px"
          borderColor="gray.400"
          size="md"
          placeholder="搜尋"
          value={filter || ''}
          onChange={e => setFilter(e.target.value)}
        />
      </InputGroup>
    </span>
  )
}
