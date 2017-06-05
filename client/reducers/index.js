import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import ajaxCallsInProgressReducer from './ajaxStatusReducer';

/**
 * Root Reducer
 * @desc combines all defined Reducers
 */
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  ajaxCallsInProgress: ajaxCallsInProgressReducer,
});

export default rootReducer;
