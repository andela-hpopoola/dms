import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Main from './main';
import Login from './login';
import Dashboard from './dashboard';

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
  </Route>
);
