import { Layout } from '../../../components/Layout'
import { Link } from 'react-router-dom'

export const ClientError = () => {

  return (
    <Layout>
        <div className="text__404">
              404
          </div>
          <div className="text__error">
            Page not found
          </div>
          <div className="button-back">
          <Link className="link" to="/profile">
              Back
          </Link>
        </div>
    </Layout>
  )
}
