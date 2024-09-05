import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  WifiName: '',
  Gateway: '',
  isConnected: false,
  dayAttendence: [],
  class_schedule: [],
  makeup_classes: [],
  course_content: [],
  registered_courses: {},
  curriculum: {},
  grading_criteria: [],
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
    Gateway: (state, action) => {
      state.Gateway = action.payload;
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
    curriculum: (state, action) => {
      state.curriculum = action.payload;
    },
    grading_criteria: (state, action) => {
      state.grading_criteria = action.payload;
    },
    days: (state, action) => {
      state.days = action.payload;
    },
    ActiveTab: (state, action) => {
      state.ActiveTab = action.payload;
    },
  },
});

export const {
  WifiName,
  isConnected,
  Gateway,
  dayAttendence,
  ipAddress,
  class_schedule,
  makeup_classes,
  course_content,
  registered_courses,
  curriculum,
  grading_criteria,
  days,
  ActiveTab,
} = GlobalStatesReducer.actions;
export default GlobalStatesReducer.reducer;
