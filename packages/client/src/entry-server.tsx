import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import { Pages } from './pages'
import { store } from './store'

export function render(location: string) {
  const html = renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={location}>
          <Pages />
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  )

  return { html: html, store: '' }
}
