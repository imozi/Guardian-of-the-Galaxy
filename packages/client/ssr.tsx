import { Pages } from './src/pages'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { store } from './src/store'
import { StaticRouter } from 'react-router-dom/server'

export function render(location: string) {
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={location}>
        <Pages />
      </StaticRouter>
    </Provider>
  )
}
