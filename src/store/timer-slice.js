import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    active: true,
    timer: 2,
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
