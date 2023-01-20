import { Pages } from './src/pages'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { store } from './src/store'
import { StaticRouter } from 'react-router-dom/server'
import React from 'react'

export function render(location: string, store) {
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={location}>
        <Pages />
      </StaticRouter>
    </Provider>
  )
}
