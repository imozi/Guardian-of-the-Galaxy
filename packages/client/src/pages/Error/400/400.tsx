import React from 'react'
import { Layout } from '../../../components/Layout'

export const ClientError = () => {

  return (
    <Layout>
        <div className="text__400">
              400
          </div>
          <div className="text__error">
            Page not found
          </div>
          <div className="button-back">
            <a href="#" className="link">
              Back
            </a>
        </div>
    </Layout>
  )
}
