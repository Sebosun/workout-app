import React, { useState } from "react";
import Button from "../../ui/Button";
import PortalWrapper from "../../ui/PortalWrapper";

interface LoginData {
  username: string;
  password: string;
}

const initialState: LoginData = {
  username: "",
  password: "",
};

const LoginForm = () => {
  const [loginData, setLoginData] = useState(initialState);
  const { username, password } = loginData;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(username, password);
  };

  return (
    <PortalWrapper>
      <form onSubmit={submitHandler}>
        <label htmlFor="username">
          Username:
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
    </PortalWrapper>
  );
};

export default LoginForm;
