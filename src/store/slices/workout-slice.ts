import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface workoutArray {
  name: string;
  sets: number[];
  completed: boolean[];
  reps: number;
  weight: number;
}

interface WorkoutState {
  workout: workoutArray[];
  completed: boolean;
}

interface SetComplete {
  index: number;
  position: number;
  number?: number;
}

const initialState: WorkoutState = {
  workout: [
    {
      name: "deadlift",
      sets: [3, 3, 3],
      completed: [false, false, false],
      reps: 3,
      weight: 20,
    },
  ],
  completed: false,
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    addWorkout(state, action) {
      state.workout = action.payload;
    },
    handleSetComplete(state, action: PayloadAction<SetComplete>) {
      const { workout } = state;
      const { index, position } = action.payload;
      workout[index].completed[position] = !workout[index].completed[position];
    },
    handleSets(state, action: PayloadAction<SetComplete>) {
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
    completeWorkout(state) {
      state.completed = true;
    },
  },
});

export const workoutActions = workoutSlice.actions;

export default workoutSlice.reducer;
