import { createSlice } from "@reduxjs/toolkit";

export interface SettingsState {
  cooldown: number;
  theme: "light" | "dark";
}

const initialState = {
  theme: "light",
  cooldown: 30,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeCooldown(state, action) {
      state.cooldown = action.payload;
    },
  },
});

export const { changeCooldown } = settingsSlice.actions;
// export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
