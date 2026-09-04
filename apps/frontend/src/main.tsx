import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { EVMProvider } from './context/EVMContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <EVMProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EVMProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
