import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface workoutArray {
  name: string;
  sets: number[];
  completed: boolean[];
  reps: number;
  weight: number;
}

export interface WorkoutState {
  workout: workoutArray[];
  completed: boolean;
  started: boolean;
}

export interface SetComplete {
  index: number;
  position: number;
  number?: number;
}

const initialState: WorkoutState = {
  workout: [
    {
      name: "",
      sets: [],
      completed: [],
      reps: 0,
      weight: 0,
    },
  ],
  started: false,
  completed: false,
};

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    startWorkout(state) {
      state.started = true;
    },
    addWorkout(state, action) {
      state.workout = action.payload;
    },
    handleSetComplete(state, action: PayloadAction<SetComplete>) {
      const { workout } = state;
      const { index, position } = action.payload;
      workout[index].completed[position] = !workout[index].completed[position];
    },
    increaseWeight(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.workout[index].weight += 2.5;
    },
    decreaseWeight(state, action: PayloadAction<number>) {
      const index = action.payload;
      state.workout[index].weight -= 2.5;
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

export const {
  startWorkout,
  addWorkout,
  handleSetComplete,
  handleSets,
  increaseWeight,
  decreaseWeight,
  completeWorkout,
} = workoutSlice.actions;

export default workoutSlice.reducer;
