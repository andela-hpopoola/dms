import { combineReducers } from 'redux';
import auth from './authReducer';
import user from './userReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

/**
 * Root Reducer
 * @desc combines all defined Reducers
 */
const rootReducer = combineReducers({
  auth,
  user,
  ajaxCallsInProgress
});

export default rootReducer;
