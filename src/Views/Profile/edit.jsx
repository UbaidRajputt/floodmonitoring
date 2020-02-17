import React, { Component, Fragment } from 'react';
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Row, Col, FormGroup, Label } from "reactstrap";
import { Link } from "react-router-dom";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <Fragment>
        <div className='theme-container'>
          <article className='edit-profile'>
            <h3><b>Edit Profile</b></h3>
            <hr />
            <Formik
              initialValues={{ name: "", password: "" }}
              validate={values => {
                const errors = {};
                if (!values.name) {
                  errors.name = "user name is required.";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
              }}
            >
              <Form>
                <h5 className='title-bottom-space'>Basic Information</h5>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label>User Name</Label>
                      <div className="txt-field">
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Muhammad Kashif"
                        />
                      </div>
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>Phone Number</Label>
                      <div className="txt-field">
                        <Field
                          type="text"
                          name="phone"
                          className="form-control"
                          placeholder="+923214695255"
                        />
                      </div>
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>Email Address</Label>
                      <div className="txt-field">
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="kashif@gmail.com"
                          readOnly
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <h5 className='title-bottom-space'>Change Password</h5>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label>Old Password</Label>
                      <div className="txt-field">
                        <Field
                          type="password"
                          name="old"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <ErrorMessage
                        name="old"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>New Password</Label>
                      <div className="txt-field">
                        <Field
                          type="password"
                          name="new"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <ErrorMessage
                        name="new"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label>Confirm Password</Label>
                      <div className="txt-field">
                        <Field
                          type="password"
                          name="confirm"
                          className="form-control"
                          placeholder=""
                        />
                      </div>
                      <ErrorMessage
                        name="confirm"
                        component="div"
                        className="text-danger"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <hr />
                <div className='button-row'>
                  <button className='button' type='submit'>Update Profile</button>
                  <Link className='button' to='/home'>Back to Home</Link>
                </div>
              </Form>
            </Formik>
          </article>
        </div>
      </Fragment>
    );
  }
}

export default EditProfile;