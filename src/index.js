import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import { Provider } from "react-redux";
import store from "./store/index";
import { BrowserRouter } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyAug3P0fmT9ur-V04RtrssjGc2xXQwLk_4",
  authDomain: "workout-b9940.firebaseapp.com",
  projectId: "workout-b9940",
  storageBucket: "workout-b9940.appspot.com",
  messagingSenderId: "448772049896",
  appId: "1:448772049896:web:b8332f490c26822c8af25d",
};

const app = firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
