import {combineReducers} from '@reduxjs/toolkit';
// import AppReducer from './AppReducer/AppReducer';
import AuthReducer from './AuthReducer/AuthReducer';

const Reducer = combineReducers({
  AuthReducer,
  // AppReducer
});

export default Reducer;
