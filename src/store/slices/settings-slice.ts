import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  cooldown: number;
  theme: "light" | "dark";
  currentWorkout: string;
}

const initialState = {
  theme: "light",
  cooldown: 20,
  currentWorkoutTemplate: "",
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
  },
});

export const {
  changeCooldown,
  changeCurrentWorkoutTemplate,
  handleResetSettings,
} = settingsSlice.actions;
// export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
