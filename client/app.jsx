import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './components/routes';
import configureStore from './store/configureStore';

// Load Custom CSS
import './sass/main.scss';

const store = configureStore();

window.store = store;

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
