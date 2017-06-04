import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Dashboard from './common/dashboard';
import Main from './common/main';
import Login from './users/login';
import Signup from './users/signup';

/**
 * Routes
 * @export
 * @desc Builds the route of the application
 * @returns {any} route
 */
export default (
  <Route path="/" component={Main}>
    <IndexRoute component={Login} />
    <Route path="dashboard" component={Dashboard} />
    <Route path="signup" component={Signup} />
  </Route>
);
