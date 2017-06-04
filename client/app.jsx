import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './components/Routes';
import configureStore from './store/configureStore';

// Load Custom CSS
import './sass/main.scss';

const store = configureStore();

window.store = store;

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
