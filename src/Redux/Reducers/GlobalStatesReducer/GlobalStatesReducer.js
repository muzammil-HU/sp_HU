import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  WifiName: '',
  ipAddress: '',
  isConnected: false,
  dayAttendence: [],
  class_schedule: [],
  makeup_classes: [],
  course_content: [],
  registered_courses: {},
  days: [],
  ActiveTab: 'CurrentScheduleCards',
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
    class_schedule: (state, action) => {
      state.class_schedule = action.payload;
    },
    makeup_classes: (state, action) => {
      state.makeup_classes = action.payload;
    },
    course_content: (state, action) => {
      state.course_content = action.payload;
    },
    registered_courses: (state, action) => {
      state.registered_courses = action.payload;
    },
    days: (state, action) => {
      state.days = action.payload;
    },
    ipAddress: (state, action) => {
      state.ipAddress = action.payload;
    },
    ActiveTab: (state, action) => {
      state.ActiveTab = action.payload;
    },
  },
});

export const {
  WifiName,
  isConnected,
  dayAttendence,
  ipAddress,
  class_schedule,
  makeup_classes,
  course_content,
  registered_courses,
  days,
  ActiveTab,
} = GlobalStatesReducer.actions;
export default GlobalStatesReducer.reducer;
