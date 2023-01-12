import 'whatwg-fetch'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom/server'
import { store } from '@/store'
import { Pages } from '.'

const appContent = 'Guardian of the Galaxy'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

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
