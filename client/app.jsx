import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import Routes from './components/Routes';
import store from './store/configureStore';
import setAuthToken from './utils/setAuthToken';
import * as auth from './utils/auth';

// Load Custom CSS
import './sass/main.scss';

setAuthToken(auth.getToken());
console.log(auth.getToken(), 'auth get token');
persistStore(store, { whitelist: ['user', 'auth', 'documents'] });
render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
