import { createSlice } from "@reduxjs/toolkit";

interface workoutTemplate {
  name: string;
  reps: number;
  sets: number;
  weight: number;
}

interface initState {
  template: workoutTemplate[];
}

const initialState: initState = {
  template: [
    {
      name: "",
      reps: 0,
      sets: 0,
      weight: 0,
    },
  ],
};

const editSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    changeEdit(state, action) {
      state.template = action.payload;
    },
  },
});

export const { changeEdit } = editSlice.actions;

export default editSlice.reducer;
