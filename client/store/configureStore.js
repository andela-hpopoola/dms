import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
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
export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunk,
        reduxImmutableStateInvariant()
      )
    )
  );
}
