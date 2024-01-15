import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  WifiName: '',
  isConnected: false,
};

export const GlobalStatesReducer = createSlice({
  name: 'GlobalStates',
  initialState,
  reducers: {
    WifiName: (state, action) => {
      state.WifiName = action.payload;
    },
    isConnected: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const {WifiName, isConnected} = GlobalStatesReducer.actions;
export default GlobalStatesReducer.reducer;
