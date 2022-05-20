import { Select } from '@chakra-ui/react'
import React from 'react'
import CONSTANTS from '../../global/Constants'

export const RegionFilter = ({ filter, setFilter }) => {
  return (
    <span>
      <Select
        border="1px"
        borderColor="gray.400"
        id="region"
        placeholder="選擇地區"
        value={filter}
        onChange={e => setFilter(e.target.value || undefined)}
      >
        <option value="">全部地區</option>
        {CONSTANTS.REGIONS.map((addr, idx) => {
          return (
            <option key={idx} value={addr}>
              {addr}
            </option>
          )
        })}
      </Select>
    </span>
  )
}
