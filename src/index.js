import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// import express from 'express'
import App from './components/App'
// import pg from 'pg'

// const app = express()

const rootElement = document.getElementById('root')
const render = (Component) =>
  // eslint-disable-next-line react/no-render-return-value
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootElement
  )
// render App passed in from './components/App'
render(App)
// if (module.hot) module.hot.accept(() => render(App))
