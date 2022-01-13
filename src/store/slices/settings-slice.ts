import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  cooldown: number;
  theme: "light" | "dark";
  currentWorkout: string;
  freshLogin: false;
}

const initialState = {
  theme: "light",
  cooldown: 20,
  currentWorkoutTemplate: "",
  freshLogin: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeCooldown(state, action: PayloadAction<number>) {
      state.cooldown = action.payload;
    },
    changeCurrentWorkoutTemplate(state, action: PayloadAction<string>) {
      state.currentWorkoutTemplate = action.payload;
    },
    handleResetSettings(state) {
      state = initialState;
    },
    // workaround for fetching in FirebaseTemplateData
    // this should update to true when user logins/registers without using auto-logins
    // trigering settings fetch
    handleFreshLogin(state) {
      state.freshLogin = true;
    },
  },
});

export const {
  changeCooldown,
  changeCurrentWorkoutTemplate,
  handleResetSettings,
  handleFreshLogin,
} = settingsSlice.actions;
// export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
