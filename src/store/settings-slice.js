import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    theme: "light",
    cooldown: 50,
  },
  reducers: {
    changeCooldown(state, action) {
      state.cooldown = action.payload;
    },
  },
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice;
