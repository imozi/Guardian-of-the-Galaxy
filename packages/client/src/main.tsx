import './styles/index.scss'
import App from './components/App'
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './hoc/ErrorBoundary'
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)
