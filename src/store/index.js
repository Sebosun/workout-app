import { configureStore } from "@reduxjs/toolkit";
import settingsActions from "./settings-slice";
import timerActions from "./timer-slice";

const store = configureStore({
  reducer: { settings: settingsActions.reducer, timer: timerActions.reducer },
});

export default store;
