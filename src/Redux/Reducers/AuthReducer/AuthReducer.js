import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  LoginUser: false,
  UserDetail: {},
  student_id: '',
  UniqueName: '',
  TokenId: '',
  UniqueDeviceId: '',
  CurrentUniqueDeviceId: '',
  ipAddress: '',
  test: {},
};

export const AuthReducer = createSlice({
  name: 'BookAuth',
  initialState,
  reducers: {
    LoginUser: (state, action) => {
      state.LoginUser = action.payload;
    },
    UserDetail: (state, action) => {
      state.UserDetail = action.payload;
    },
    test: (state, action) => {
      state.test = action.payload;
    },
    student_id: (state, action) => {
      state.UserDetail = action.payload;
    },
    TokenId: (state, action) => {
      state.TokenId = action.payload;
    },
    UniqueDeviceId: (state, action) => {
      state.UniqueDeviceId = action.payload;
    },
    CurrentUniqueDeviceId: (state, action) => {
      state.CurrentUniqueDeviceId = action.payload;
    },
    UniqueName: (state, action) => {
      state.UniqueName = action.payload;
    },
    ipAddress: (state, action) => {
      state.ipAddress = action.payload;
    },
    LogOut: (state, action) => {
      (state.LoginUser = false),
        (state.TokenId = ''),
        (state.UserDetail = null),
        (state.student_id = ''),
        (state.UniqueName = ''),
        // (state.UniqueDeviceId = '');
        // (state.ipAddress = ''),
        (state.CurrentUniqueDeviceId = '');
    },
  },
});

export const {
  LoginUser,
  UserDetail,
  student_id,
  UniqueName,
  ipAddress,
  TokenId,
  LogOut,
  UniqueDeviceId,
  CurrentUniqueDeviceId,
  test,
} = AuthReducer.actions;
export default AuthReducer.reducer;
