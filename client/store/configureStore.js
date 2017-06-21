import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = global.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * Store
 * @desc Stores all states in the application
 * @param {object} initialState all states in application
 * @returns {any} any
 */
const configureStore = initialState =>
  createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunk,
        reduxImmutableStateInvariant()
      ),
      autoRehydrate()
    )
  );

export default configureStore();
