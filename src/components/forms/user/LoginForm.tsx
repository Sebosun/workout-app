import React, { useState } from "react";
import Button from "../../ui/Button";
import PortalWrapper from "../../ui/PortalWrapper";

import { firebaseConfig } from "../../../index";

interface LoginData {
  email: string;
  password: string;
}

const initialState: LoginData = {
  email: "",
  password: "",
};

interface LoginFormState {
  handleErrorMessage: (message: string) => void;
}

const LoginForm = ({ handleErrorMessage }: LoginFormState) => {
  const [loginData, setLoginData] = useState(initialState);
  const { email, password } = loginData;

  const { apiKey } = firebaseConfig;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          //TODO: this part lol
        });
      } else {
        res.json().then((data) => {
          console.log(data);
          handleErrorMessage(data.error.message);
        });
      }
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChange}
        />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChange}
        />
      </label>
      <br />
      <Button> Submit </Button>
    </form>
  );
};

export default LoginForm;
