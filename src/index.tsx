import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store/app/index";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAug3P0fmT9ur-V04RtrssjGc2xXQwLk_4",
  authDomain: "workout-b9940.firebaseapp.com",
  projectId: "workout-b9940",
  storageBucket: "workout-b9940.appspot.com",
  messagingSenderId: "448772049896",
  appId: "1:448772049896:web:b8332f490c26822c8af25d",
});

export const auth = app.auth();
export default app;
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
