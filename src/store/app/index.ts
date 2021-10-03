import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../slices/settings-slice";
import timerReducer from "../slices/timer-slice";
import workoutReducer from "../slices/workout-slice";
import userReducer from "../slices/user-slice";
import uiReducer from "../slices/ui-slice";

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    timer: timerReducer,
    workout: workoutReducer,
    user: userReducer,
    ui: uiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
