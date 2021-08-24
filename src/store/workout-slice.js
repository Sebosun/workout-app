import { createSlice } from "@reduxjs/toolkit";

const workoutSlice = createSlice({
  name: "workout",
  initialState: {
    workout: [
      {
        name: "deadlift",
        sets: [3, 3, 3],
        completed: [false, false, false],
        reps: 3,
        weight: 20,
      },
    ],
  },
  reducers: {
    addWorkout(state, action) {
      state.workout = action.payload;
    },
    handleComplete(state, action) {
      const { workout } = state;
      const { index, position } = action.payload;
      workout[index].completed[position] = !workout[index].completed[position];
    },
    handleSets(state, action) {
      const { workout } = state;
      const { index, position } = action.payload;
      if (action.payload.number) {
        workout[index].sets[position] = action.payload.number;
      } else if (workout[index].sets[position] === 0) {
        workout[index].sets[position] = 0;
      } else {
        --workout[index].sets[position];
      }
    },
  },
});

export const workoutActions = workoutSlice.actions;

export default workoutSlice;
