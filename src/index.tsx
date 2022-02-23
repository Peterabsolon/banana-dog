import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'

import './index.css'
import App from './App'
import { theme } from './theme'

configure({ enforceActions: 'never' })

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <>
        <ColorModeScript initialColorMode="dark" />
        <App />
      </>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
