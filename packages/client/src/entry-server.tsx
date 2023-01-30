import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import { Pages } from './pages'
import { setupStore } from './store'

const store = setupStore()

type RenderProps = {
  url: string
}

export function render({ url }: RenderProps) {
  const html = renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouter location={url}>
          <Pages />
        </StaticRouter>
      </Provider>
    </React.StrictMode>
  )

  return { html: html, state: store.getState() }
}
