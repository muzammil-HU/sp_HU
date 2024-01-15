import {combineReducers} from '@reduxjs/toolkit';
// import AppReducer from './AppReducer/AppReducer';
import AuthReducer from './AuthReducer/AuthReducer';
import GlobalStatesReducer from './GlobalStatesReducer/GlobalStatesReducer';
const Reducer = combineReducers({
  AuthReducer,
  GlobalStatesReducer,
  // AppReducer
});

export default Reducer;
