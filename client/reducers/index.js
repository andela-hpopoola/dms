import { combineReducers } from 'redux';
import authReducer from './authReducer';
import allReducer from './allReducer';
import userReducer from './userReducer';
import documentReducer from './documentReducer';
import roleReducer from './roleReducer';
import ajaxStatusReducer from './ajaxStatusReducer';

/**
 * Root Reducer
 * @desc combines all defined Reducers
 */
const rootReducer = combineReducers({
  all: allReducer,
  auth: authReducer,
  user: userReducer,
  roles: roleReducer,
  documents: documentReducer,
  ajaxStatus: ajaxStatusReducer,
});

export default rootReducer;
