import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import store, { persistor } from '/src/global/store'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider>
            <ColorModeScript initialColorMode="light"></ColorModeScript>
            <App />
          </ChakraProvider>
        </PersistGate>
      </ReduxProvider>
    </BrowserRouter>
  </StrictMode>
)
