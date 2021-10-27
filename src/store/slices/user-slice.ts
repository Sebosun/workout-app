import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../app";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auth } from "../../index";
import { User } from "@firebase/auth";

//TODO DELETE this in its entirety
// const initialState: { userLoginInformation: UserState; loginStatus: boolean } =
//   {
//     userLoginInformation: {
//       idToken: "",
//       email: "",
//       refreshToken: "",
//       expiresIn: "",
//       localId: "",
//     },
//     loginStatus: false,
//   };

const initialState: {
  userLoginInformation: User | null;
  loginStatus: boolean;
} = {
  userLoginInformation: null,
  loginStatus: false,
};

const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    saveUserLoginData(state, action: PayloadAction<User>) {
      state.userLoginInformation = action.payload;
    },
    changeUserStatus(state) {
      state.loginStatus = true;
    },
  },
});

export const loginUser = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const dupa = await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
    }
  };
};

export const { saveUserLoginData, changeUserStatus } = userSlice.actions;

export default userSlice.reducer;
