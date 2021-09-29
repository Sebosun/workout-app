import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TimerState {
  active: boolean;
  timer: number;
}

const initialState: TimerState = {
  active: false,
  timer: 30,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    tickTimer(state) {
      if (state.timer > 0) {
        state.timer = state.timer - 1;
      }
    },
    setTimer(state, action: PayloadAction<number>) {
      state.timer = action.payload;
    },
    handleAction(state, action: PayloadAction<boolean | undefined>) {
      if (action.payload !== undefined) {
        state.active = action.payload;
      } else {
        state.active = !state.active;
      }
    },
  },
});

export const { tickTimer, setTimer, handleAction } = timerSlice.actions;

export default timerSlice.reducer;
