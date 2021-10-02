import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../slices/settings-slice";
import timerReducer from "../slices/timer-slice";
import workoutActions from "../slices/workout-slice";
import userReducer from "../slices/user-slice";

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    timer: timerReducer,
    workout: workoutActions.reducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
