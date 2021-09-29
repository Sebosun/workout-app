import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settings-slice";
import timerActions from "./timer-slice";
import workoutActions from "./workout-slice";

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    timer: timerActions.reducer,
    workout: workoutActions.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
