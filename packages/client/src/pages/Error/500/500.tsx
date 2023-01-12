import { useNavigate } from 'react-router-dom'
import { Page } from '@/components/Page'

export const ServerError = () => {
  const navigate = useNavigate()

  return (
    <Page title="Server Error">
      <section className="server-error">
        <h1 className="server-error__status">500</h1>
        <p className="server-error__text">Oops! Server error</p>
        <a className="link" onClick={() => navigate(-1)}>
          Back
        </a>
      </section>
    </Page>
  )
}
