import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  LoginUser: false,
  UserDetail: {},
  student_id: '',
  TokenId: '',
  UniqueDeviceId: '',
  UniqueName: '',
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
  TokenId,
  LogOut,
  UniqueDeviceId,
  UniqueName,
} = AuthReducer.actions;
export default AuthReducer.reducer;
