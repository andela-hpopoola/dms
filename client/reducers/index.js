import { combineReducers } from 'redux';
import auth from './authReducer';
import user from './userReducer';
import errorMessage from './errorReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

/**
 * Root Reducer
 * @desc combines all defined Reducers
 */
const rootReducer = combineReducers({
  auth,
  user,
  errorMessage,
  ajaxCallsInProgress
});

export default rootReducer;
