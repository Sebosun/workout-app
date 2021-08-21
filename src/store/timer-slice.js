import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    active: false,
    timer: 5,
  },
  reducers: {
    tickTimer(state) {
      if (state.timer > 0) {
        state.timer = state.timer - 1;
      }
    },
    setTimer(state, action) {
      state.timer = action.payload;
    },
    handleAction(state, action) {
      if (action.payload) {
        state.active = action.payload;
      } else {
        state.active = !state.active;
      }
    },
  },
});

export const timerActions = timerSlice.actions;

export default timerSlice;
