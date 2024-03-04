import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  LoginUser: false,
  UserDetail: {},
  student_id: '',
  UniqueName: 'hello',
  TokenId: '',
  UniqueDeviceId: '',
  ipAddress: ''
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
    student_id: (state, action) => {
      state.UserDetail = action.payload;
    },
    TokenId: (state, action) => {
      state.TokenId = action.payload;
    },
    UniqueDeviceId: (state, action) => {
      state.UniqueDeviceId = action.payload;
    },
    UniqueName: (state, action) => {
      state.UniqueName = action.payload;
    },
    ipAddress: (state, action) => {
      state.ipAddress = action.payload;
    },
    LogOut: (state, action) => {
      (state.LoginUser = false),
        (state.TokenId = null),
        (state.UserDetail = null);
      // state.LogOut = action.payload;
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
} = AuthReducer.actions;
export default AuthReducer.reducer;
