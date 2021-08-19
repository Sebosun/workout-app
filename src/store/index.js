import { configureStore } from "@reduxjs/toolkit";
import settingsActions from "./settings-slice";

const store = configureStore({
  reducer: { settings: settingsActions.reducer },
});

export default store;
