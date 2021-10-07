import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../app";

import { displayError } from "../slices/ui-slice";
import { saveUserLoginData } from "../slices/user-slice";

// registers user given a password and email, if something is wrong, calls displayError to show the error
export const registerUser = (
  email: string,
  password: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  const key = "AIzaSyAug3P0fmT9ur-V04RtrssjGc2xXQwLk_4";
  const url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + key;
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
    } catch (error: any) {
      console.log(error);
    }
  };
};
