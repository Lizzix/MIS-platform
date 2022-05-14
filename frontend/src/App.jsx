import { Routes, Route } from 'react-router-dom'
import { useColorMode } from '@chakra-ui/color-mode'
import React from 'react'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import NewRequest from './pages/NewRequest'
import Home from './pages/Home'
import Personal from './pages/Personal'
import NotFound from './pages/NotFound'
import TestPage from './pages/TestPage'

function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="newrequest" element={<NewRequest />} />
      <Route path="personal" element={<Personal />} />
      <Route path="*" element={<NotFound />} />
      <Route path="test" element={<TestPage />} />
    </Routes>
  )
}

export default App
