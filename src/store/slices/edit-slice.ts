import { createSlice } from "@reduxjs/toolkit";

interface workoutTemplate {
  name: string;
  reps: number;
  sets: number;
  weight: number;
}

interface initState {
  template: workoutTemplate[];
  isModified: boolean;
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
  isModified: false,
};

const editSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    changeEdit(state, action) {
      state.template = action.payload;
    },
    setModified(state) {
      state.isModified = true;
    },
    turnOffModified(state) {
      state.isModified = false;
    },
  },
});

export const { changeEdit, setModified, turnOffModified } = editSlice.actions;

export default editSlice.reducer;
