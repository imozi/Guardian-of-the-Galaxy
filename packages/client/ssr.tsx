import { Pages } from './src/pages'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { store } from './src/store'

export function render() {
  return renderToString(
    <Provider store={store}>
      <Pages />
    </Provider>
  )
}
