import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import 'rc-pagination/assets/index.css';
import Routes from './components/Routes';
import store from './store/configureStore';
import setAuthToken from './utils/setAuthToken';
import * as auth from './utils/auth';

// Load Custom CSS
import './sass/main.scss';
// Require Editor CSS files.
require('./../node_modules/froala-editor/css/froala_style.min.css');
require('./../node_modules/froala-editor/css/froala_editor.pkgd.min.css');

// // Require Font Awesome.
require('./../node_modules/font-awesome/css/font-awesome.css');

setAuthToken(auth.getToken());
persistStore(store, { whitelist: ['user', 'auth', 'documents'] });
render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
