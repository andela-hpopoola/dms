import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './components/Routes';
import store from './store/configureStore';

// Load Custom CSS
import './sass/main.scss';

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
