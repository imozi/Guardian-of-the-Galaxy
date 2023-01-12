import { useNavigate } from 'react-router-dom'
import { Page } from '@/components/Page'

export const ClientError = () => {
  const navigate = useNavigate()

  return (
    <Page title="Page not found">
      <section className="not-found">
        <h1 className="not-found__status">404</h1>
        <p className="not-found__text">Page not found</p>
        <a className="link" onClick={() => navigate(-1)}>
          Back
        </a>
      </section>
    </Page>
  )
}
