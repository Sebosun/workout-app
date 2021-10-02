import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../app";
import { createSlice } from "@reduxjs/toolkit";

// idToken 	string 	A Firebase Auth ID token for the newly created user.
// email 	string 	The email for the newly created user.
// refreshToken 	string 	A Firebase Auth refresh token for the newly created user.
// expiresIn 	string 	The number of seconds in which the ID token expires.
// localId 	string 	The uid of the newly created user.

interface UserState {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

const initialState: { userLoginInformation: UserState } = {
  userLoginInformation: {
    idToken: "",
    email: "",
    refreshToken: "",
    expiresIn: "",
    localId: "",
  },
};

const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    saveUserLoginData(state, action) {
      state.userLoginInformation = {
        idToken: action.payload.idToken,
        email: action.payload.email,
        refreshToken: action.payload.refreshToken,
        expiresIn: action.payload.expiresIn,
        localId: action.payload.localId,
      };
    },
  },
});

export const loginUser = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAug3P0fmT9ur-V04RtrssjGc2xXQwLk_4";
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        const responseError = await response.json();
        throw new Error(responseError.error.message);
      }
      return response;
    };

    try {
      const response = await sendRequest();
      const data = await response.json();
      dispatch(
        saveUserLoginData({
          idToken: data.idToken,
          email: data.email,
          refreshToken: data.refreshToken,
          expiresIn: data.expiresIn,
          localId: data.localId,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const { saveUserLoginData } = userSlice.actions;
export default userSlice.reducer;
