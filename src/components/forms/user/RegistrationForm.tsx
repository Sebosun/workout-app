import React, { useState } from "react";
import Button from "../../ui/Button";
import PortalWrapper from "../../ui/PortalWrapper";

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

const RegistrationForm = () => {
  const [loginData, setLoginData] = useState(initialState);
  const { username, password, email } = loginData;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=", {
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
          console.log(data);
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
