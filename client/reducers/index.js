import { combineReducers } from 'redux';
import authReducer from './authReducer';
import allReducer from './allReducer';
import userReducer from './userReducer';
import documentReducer from './documentReducer';
import paginationReducer from './paginationReducer';
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
  pagination: paginationReducer,
  ajaxStatus: ajaxStatusReducer,
});

export default rootReducer;
