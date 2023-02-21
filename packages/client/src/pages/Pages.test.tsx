import 'whatwg-fetch'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import { setupStore } from '@/store'
import { Pages } from '.'

const appContent = 'Guardian of the Galaxy'
const store = setupStore()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

jest.mock('@/core/consts', () => ({
  NODE_ENV: 'development',
}))

test('Example test', async () => {
  render(
    <Provider store={store}>
      <StaticRouter location="/">
        <Pages />
      </StaticRouter>
    </Provider>
  )
  expect(screen.findByText(appContent)).toBeDefined()
})
