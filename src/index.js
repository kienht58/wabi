import React from 'react'
import ReactDOM from 'react-dom'
import App from './components'
import {CookiesProvider} from 'react-cookie'
import {registerServiceWorker} from './utils'

ReactDOM.render(<CookiesProvider><App /></CookiesProvider>, document.getElementById('root'))
registerServiceWorker()
