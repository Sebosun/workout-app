import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../app";

interface NotificationState {
  message: string;
  status: boolean;
}

const initialState: { error: NotificationState, success: NotificationState} = {
  error: {
    message: "Something went wrong. Try again.",
    status: false,
  },
  success: {
    message: "Action completed succesfully",
    status: false,
  },
};

const uiSlice = createSlice({
  name: "notification-slice",
  initialState,
  reducers: {
    //* replaces message state and flips the boolean value */
    // use the displayError below instead of this to show an error message
    addErrorMessage(state, action: PayloadAction<string>) {
      state.error.message = action.payload;
      state.error.status = true;
    },
    changeErrorStatus(state) {
      state.error.status = false;
    },
    addSuccessMessage(state, action: PayloadAction<string>) {
      state.success.message = action.payload;
      state.success.status = true;
    },
    changeSuccessStatus(state) {
      state.success.status = false;
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
    }, 6 * 1000);
  };
};

export const displaySuccess = (
  message: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    dispatch(addSuccessMessage(message));
    setTimeout(() => {
      dispatch(changeSuccessStatus());
    }, 6 * 1000);
  };
};

export const { addErrorMessage, changeErrorStatus, addSuccessMessage, changeSuccessStatus} = uiSlice.actions;

export default uiSlice.reducer;
