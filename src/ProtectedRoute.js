import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from './Components/Header/header';
import Footer from './Components/Footer/footer';

const ProtectedRoute = ({ component: Component, authenticated,  ...rest }) => {
 return <Route render={(props) => (authenticated ?   <Fragment><Header/><main><Component {...props} /></main><Footer /></Fragment> : <Redirect to="/login" />)} {...rest} />;
};

export default ProtectedRoute;