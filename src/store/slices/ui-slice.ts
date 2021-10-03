import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../app";

interface ErrorState {
  message: string;
  status: boolean;
}

const initialState: { error: ErrorState } = {
  error: {
    message: "Something went wrong. Try again.",
    status: false,
  },
};

const uiSlice = createSlice({
  name: "notification-slice",
  initialState,
  reducers: {
    //* replaces message state and flips the boolean value */
    addErrorMessage(state, action: PayloadAction<string>) {
      state.error.message = action.payload;
      state.error.status = !state.error.status;
    },
    changeErrorStatus(state) {
      state.error.status = false;
    },
  },
});

//* dispatches an error message and then hides it after 5 seconds */
export const displayError = (
  message: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(addErrorMessage(message));
    setTimeout(() => {
      dispatch(changeErrorStatus());
    }, 5 * 1000);
  };
};

export const { addErrorMessage, changeErrorStatus } = uiSlice.actions;

export default uiSlice.reducer;
