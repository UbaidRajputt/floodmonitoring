import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from './Components/Header/header';
import Footer from './Components/Footer/footer';

const ProtectedRoute = ({ component: Component, authenticated,  ...rest }) => {
 return <Route render={(props) => (authenticated ?   <article><Header/><main><Component {...props} /></main><Footer /></article> : <Redirect to="/login" />)} {...rest} />;
};

export default ProtectedRoute;