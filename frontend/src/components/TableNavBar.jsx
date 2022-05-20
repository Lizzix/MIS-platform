import { Flex, Spacer, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { GlobalSearchFilter } from './table/GlobalSearchFilter'
import { RegionFilter } from './table/RegionFilter'

export const TableNavBar = props => {
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
        filter={props.globalFilter}
        setFilter={props.setGlobalFilter}
      />
      <Spacer />
      <GlobalSearchFilter
        filter={props.globalFilter}
        setFilter={props.setGlobalFilter}
      />
    </Flex>
  )
}
