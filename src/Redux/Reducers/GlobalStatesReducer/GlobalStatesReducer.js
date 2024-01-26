import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  WifiName: '',
  isConnected: false,
  dayAttendence: [],
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
    dayAttendence: (state, action) => {
      state.dayAttendence = action.payload;
    },
  },
});

export const {WifiName, isConnected, dayAttendence} =
  GlobalStatesReducer.actions;
export default GlobalStatesReducer.reducer;
