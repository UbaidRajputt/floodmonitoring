import React, { Component } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import {FormGroup, Label} from 'reactstrap';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <article className='themeBgDark'>
        <div>
          <div className='auth-form-outer'>
            <h1 className='uppercase'>Sign in</h1>
            <Formik
              initialValues={{ email: '', password: '' }}
              validate={values => {
                console.log(values);
                const errors = {};
                if (!values.email) {
                  errors.email = 'email address is required.';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'invalid email address.';
                }
                if (!values.password) {
                  errors.password = 'password field is empty.';
                } else if (values.password.length < 8) {
                  errors.password = 'password must be 8 digit.';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormGroup>
                    <Label>Enter Email</Label>
                    <div className='txt-field'>
                      <Field type='text' name='email' className='form-control' placeholder='name@example.com' />
                    </div>
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </FormGroup>
                  <FormGroup>
                    <Label>Enter Password</Label>
                    <div className='txt-field'>
                      <Field type='password' name='password' className='form-control' placeholder='Password' />
                    </div>
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </FormGroup>
                  <button type="submit">Submit</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </article>
    );
  }

}

export default Login;