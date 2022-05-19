import { Routes, Route } from 'react-router-dom'
import { useColorMode } from '@chakra-ui/color-mode'
import React from 'react'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NewRequest from './pages/NewRequest'
import Home from './pages/Home'
import Personal from './pages/Personal'
import NotFound from './pages/NotFound'
import ThankYou from './pages/ThankYou'
// TODO: delete
import TestPage from './pages/TestPage'
import BasicTable from './components/BasicTable'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="newrequest" element={<NewRequest />} />
      <Route path="personal" element={<Personal />} />
      <Route path="thankyou" element={<ThankYou />} />
      <Route path="personal" element={<Personal />} />
      <Route path="*" element={<NotFound />} />
      <Route path="test" element={<TestPage />} />
      <Route path="table" element={<BasicTable />} />
    </Routes>
  )
}

export default App
