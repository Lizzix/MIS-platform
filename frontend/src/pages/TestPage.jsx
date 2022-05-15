import React from 'react'
import {
  useGetExchangesQuery,
  useGetExchangeByIdQuery,
  useGetExchangeByUidQuery,
  useGetDemandExchangeByUidQuery,
  useGetSupplyExchangeByUidQuery,
} from '../features/exchangeApi'
// import { getState } from '../features/userSlice'

export default function TestPage() {
  // const { data, error, isLoading, isFetching, isSuccess } =
  //   useGetExchangeByIdQuery('3')
  console.log(getState())
  return (
    <div>
      <h1>Test Page</h1>
      {/* <p>getState()</p> */}
      {/* // {isLoading && <h2>Loading...</h2>}
      // {isFetching && <h2>Fetching...</h2>}
      // {error && <h2>Error: {error.message}</h2>}
      // {isSuccess && <p>{data.item}</p>} */}
    </div>
  )

  // 1.Example of useGetExchangesQuery
  //   useGetExchangesQuery()
  // return (
  //   <div>
  //     <h1>Test Page</h1>
  //     {isLoading && <h2>Loading...</h2>}
  //     {isFetching && <h2>Fetching...</h2>}
  //     {error && <h2>Error: {error.message}</h2>}
  //     {isSuccess && (
  //       <div>
  //         {data?.map(exchange => {
  //           return (
  //             <div key={exchange.id}>
  //               <span>id: {exchange.id}</span>
  //               <span>receiver_uid: {exchange.receiver_uid}</span>
  //               <span>provider_uid: {exchange.provider_uid}</span>
  //               <span>item: {exchange.item}</span>
  //               <span>region: {exchange.region}</span>
  //               <span>status: {exchange.status}</span>
  //               <span>notes: {exchange.notes}</span>
  //               <span>date_added: {exchange.date_added}</span>
  //             </div>
  //           )
  //         })}
  //       </div>
  //     )}
  //   </div>
  // )
}
