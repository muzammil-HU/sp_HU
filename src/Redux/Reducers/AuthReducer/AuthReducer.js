import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  LoginUser: false,
  UserDetail: {},
  TokenId: '',
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
    TokenId: (state, action) => {
      state.TokenId = action.payload;
    },
    LogOut: (state, action) => {
      (state.LoginUser = false),
        (state.UserDetail = [null]),
        (state.TokenId = [null]);
      // state.LogOut = action.payload;
    },
  },
});

export const {LoginUser, UserDetail, first, TokenId, LogOut} =
  AuthReducer.actions;
export default AuthReducer.reducer;
