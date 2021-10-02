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
    loginUser(state, action) {
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

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;
