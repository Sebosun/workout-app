import { createSlice } from "@reduxjs/toolkit";

const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workout: [],
  },
  reducers: {
    addWorkout(state, action) {
      state.workout.push(action.payload);
    },
  },
});

export const workoutActions = workoutSlice.actions;

export default workoutSlice;
