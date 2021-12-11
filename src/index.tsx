import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import store from "./store/app/index";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";

let app;

if (process.env.DEV) {
  app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  });
} else {
  app = firebase.initializeApp({
    apiKey: "AIzaSyAug3P0fmT9ur-V04RtrssjGc2xXQwLk_4",
    authDomain: "workout-b9940.firebaseapp.com",
    projectId: "workout-b9940",
    storageBucket: "workout-b9940.appspot.com",
    messagingSenderId: "448772049896",
    appId: "1:448772049896:web:b8332f490c26822c8af25d",
  });
}

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
