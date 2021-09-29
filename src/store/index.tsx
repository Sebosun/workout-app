import { configureStore } from "@reduxjs/toolkit";
import settingsActions from "./settings-slice";
import timerActions from "./timer-slice";
import workoutActions from "./workout-slice";

const store = configureStore({
  reducer: {
    settings: settingsActions.reducer,
    timer: timerActions.reducer,
    workout: workoutActions.reducer,
  },
});

export default store;
