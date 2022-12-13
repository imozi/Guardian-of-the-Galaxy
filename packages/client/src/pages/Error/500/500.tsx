import { Layout } from '../../../components/Layout'
import { Link } from 'react-router-dom'

export const ServerError = () => {
  return (
    <Layout>
      <div className="text__500">500</div>
      <div className="text__error">Oops! Server error</div>
      <div className="button-back">
        <Link className="link" to="/profile">
          Back
        </Link>
      </div>
    </Layout>
  )
}
