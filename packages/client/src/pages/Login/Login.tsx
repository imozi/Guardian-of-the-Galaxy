import React from 'react'
import { Layout } from '../../components/Layout'
import { Card } from '../../components/Card'
import { Field } from '../../components/UI/Field'
import { Form } from '../../components/Form'

export const Login = () => {
  const handleSubmit = () => {
    console.log('summit')
  }

  return (
    <Layout>
      <div className="layout__login">
        <Card title="Guardian of the Galaxy">
          <Form submitText="Sign in" onSubmit={handleSubmit}>
            <div className="form__item">
              <Field label="Login" />
            </div>
            <div className="form__item">
              <Field label="Password" />
            </div>
          </Form>
          <div className="card__footer">
            <a href="#" className="link">
              Sign up
            </a>
          </div>
        </Card>
      </div>
    </Layout>
  )
}
