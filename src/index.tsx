import React from 'react'
import ReactDOM from 'react-dom'
import { configure } from 'mobx'

import './index.css'
import App from './App'

configure({ enforceActions: 'never' })

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
