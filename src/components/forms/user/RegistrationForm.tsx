import React, { useState } from "react";
import Button from "../../ui/Button";
import PortalWrapper from "../../ui/PortalWrapper";
import { firebaseConfig } from "../../../index";

interface RegistrationData {
  username: string;
  password: string;
  email: string;
}

const initialState: RegistrationData = {
  username: "",
  password: "",
  email: "",
};

interface RegistrationFormState {
  handleErrorMessage: (message: string) => void;
}

const RegistrationForm = ({ handleErrorMessage }: RegistrationFormState) => {
  const [loginData, setLoginData] = useState(initialState);
  const { password, email } = loginData;
  const { apiKey } = firebaseConfig;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

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
      } else {
        res.json().then((data) => {
          handleErrorMessage(data.message);
        });
      }
    });
  };

  return (
    <PortalWrapper location="main">
      <form onSubmit={submitHandler}>
        <label htmlFor="email">
          Email
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
          Password
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <Button> Submit </Button>
      </form>
    </PortalWrapper>
  );
};

export default RegistrationForm;
