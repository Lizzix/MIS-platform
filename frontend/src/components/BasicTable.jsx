import React, { useEffect, useMemo, useState } from 'react'
import { useTable } from 'react-table'
import { COLUMNS } from './columns'
import { useGetExchangesQuery } from '../features/exchangeApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'

export default function BasicTable(props) {
  // const columns = useMemo(() => COLUMNS, [])
  // let FetchedData
  // const { data, isError, isFetching, isSuccess } = useGetExchangesQuery()
  // useEffect(() => {
  //   if (isSuccess) {
  //     FetchedData = data
  //   }
  // }, [isSuccess, isFetching])

  // const dataInstance = useTable({
  //   columns: columns,
  //   data: data,
  // })

  // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
  //   dataInstance

  return (
    <div>
      <h1>Basic Table </h1>
      {/* {isLoading && <h2>Loading...</h2>}
      {isFetching && <h2>Fetching...</h2>}
      {error && <h2>Error: {error.message}</h2>}
      {isSuccess && (
        <div>
          {data?.map(exchange => {
            return (
              <div key={exchange.id}>
                <span>id: {exchange.id}</span>
                <span>receiver_uid: {exchange.receiver_uid}</span>
                <span>provider_uid: {exchange.provider_uid}</span>
                <span>item: {exchange.item}</span>
                <span>region: {exchange.region}</span>
                <span>status: {exchange.status}</span>
                <span>notes: {exchange.notes}</span>
                <span>date_added: {exchange.date_added}</span>
              </div>
            )
          })}
        </div>
      )} */}
    </div>
    //   <table {...getTableProps()}>
    //     <thead>
    //       {headerGroups.map(headerGroup => (
    //         <tr {...headerGroup.getHeaderGroupProps()}>
    //           {headerGroup.headers.map(column => (
    //             <th {...column.getHeaderGroupProps()}>
    //               {column.render('Header')}
    //             </th>
    //           ))}
    //         </tr>
    //       ))}
    //     </thead>
    //     <tbody {...getTableBodyProps()}>
    //       {rows.map(row => {
    //         prepareRow(row)
    //         return (
    //           <tr {...row.getRowProps()}>
    //             {row.cells.map(cell => {
    //               return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
    //             })}
    //           </tr>
    //         )
    //       })}
    //     </tbody>
    //   </table>
  )
}
