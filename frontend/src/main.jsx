import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import store from '/src/global/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <ChakraProvider>
          <ColorModeScript initialColorMode="light"></ColorModeScript>
          <App />
        </ChakraProvider>
      </ReduxProvider>
    </BrowserRouter>
  </StrictMode>
)
