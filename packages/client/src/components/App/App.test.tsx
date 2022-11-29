import App from './App'
import { render, screen } from '@testing-library/react'
import { StaticRouter } from 'react-router-dom/server'

const appContent = 'Guardian of the Galaxy'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(
    <StaticRouter location="/">
      <App />
    </StaticRouter>
  )
  expect(screen.findByText(appContent)).toBeDefined()
})
