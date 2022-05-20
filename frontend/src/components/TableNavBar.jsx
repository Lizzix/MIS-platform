import { Flex, Spacer, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { GlobalSearchFilter } from './table/GlobalSearchFilter'
import { RegionFilter } from './table/RegionFilter'

export const TableNavBar = ({ globalFilter, setGlobalFilter }) => {
  return (
    <Flex
      p="5"
      justify={'center'}
      direction="row"
      align="start"
      bg={useColorModeValue('gray.100', 'gray.800')}
    >
      <RegionFilter
        border="1px"
        borderColor="gray.400"
        filter={globalFilter}
        setFilter={setGlobalFilter}
      />
      <Spacer />
      <GlobalSearchFilter filter={globalFilter} setFilter={setGlobalFilter} />
    </Flex>
  )
}
