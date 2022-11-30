import React from 'react'
import { Layout } from '../../../components/Layout'

export const ServerError = () => {

  return (
    <Layout>
        <div className="text__500">
              500
          </div>
          <div className="text__error">
            Oops! Server error
          </div>
          <div className="button-back">
            <a href="#" className="link">
              Back
            </a>
        </div>
    </Layout>
  )
}
