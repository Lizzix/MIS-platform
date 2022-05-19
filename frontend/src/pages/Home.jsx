import { Divider } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../components/Navbar'
import CTA from '../components/CTA'
import Loading from '../components/Loading'

function Main() {
  return (
    <>
      <Navbar />
      <CTA />
      <Loading />
    </>
  )
}

export default Main
