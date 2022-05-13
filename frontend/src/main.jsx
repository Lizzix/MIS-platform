import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ChakraProvider>
          <ColorModeScript initialColorMode="light"></ColorModeScript>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
