import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './styles/index.scss'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './utils/ErrorBoundary'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
