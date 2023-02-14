import './styles/index.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './hoc/ErrorBoundary'
import { Provider } from 'react-redux'
import { Pages } from './pages'
import { setupStore } from './store'
import { startServiceWorker, unregisterServiceWorker } from '@/core/utils/serviceWorker'

if (import.meta.env.PROD) {
  startServiceWorker()
} else {
  unregisterServiceWorker()
}

const preloadState = window.__PRELOADED_STATE__ as unknown
const store = setupStore(JSON.parse(preloadState as string))

delete window.__PRELOADED_STATE__

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Pages />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
)
