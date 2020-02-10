import React, { Component } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { FormGroup, Label } from "reactstrap";
import firebase from "../../Components/Firebase/firebaseSetup";
import { Link } from "react-router-dom";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <article className="themeBgDark">
        <div>
          <div className="auth-form-outer">
            <h1 className="uppercase">Sign Up</h1>
            <Formik
              initialValues={{ email: "", password: "", name: "" }}
              validate={values => {
                const errors = {};
                if(!values.name){
                    errors.name = "user name is required."
                }else if(values.name.length<4){
                    errors.name = "user name must be 4 characters long."
                } 
                if (!values.email) {
                  errors.email = "email address is required.";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "invalid email address.";
                }
                if (!values.password) {
                  errors.password = "password field is empty.";
                } else if (values.password.length < 8) {
                  errors.password = "password must be 8 digit.";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                      values.email,
                      values.password
                    )
                    .then(user => {
                      if (user) {
                        firebase
                          .auth()
                          .currentUser.updateProfile({
                            displayName: values.name
                          })
                          .then(s => {
                            this.props.history.push("/home");
                          });
                      }
                    })
                    .catch(error => {
                      this.setState({ error: error });
                    });
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormGroup>
                    <Label>Enter User Name</Label>
                    <div className="txt-field">
                      <Field
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Fakhir"
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Enter Email</Label>
                    <div className="txt-field">
                      <Field
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="name@example.com"
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Enter Password</Label>
                    <div className="txt-field">
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </FormGroup>
                  <button type="submit">Submit</button>
                  <Link to="/login">Already a user?</Link>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </article>
    );
  }
}

export default SignUp;