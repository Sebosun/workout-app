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
    console.log(username, password, email);
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
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            id="username"
            value={username}
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
