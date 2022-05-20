import { Divider } from '@chakra-ui/react'
import React, { Suspense } from 'react'
import Navbar from '../components/Navbar'
import CTA from '../components/CTA'
import Loading from '../components/Loading'
import RequestedTable from '../components/RequestedTable'

function Main() {
  return (
    <>
      <Navbar />
      <CTA />
      <Suspense fallback={<Loading />}>
        <RequestedTable />
      </Suspense>
    </>
  )
}

export default Main
