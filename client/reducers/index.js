import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import documentReducer from './documentReducer';
import ajaxStatusReducer from './ajaxStatusReducer';

/**
 * Root Reducer
 * @desc combines all defined Reducers
 */
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  documents: documentReducer,
  ajaxStatus: ajaxStatusReducer,
});

export default rootReducer;
