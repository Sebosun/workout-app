import React, { useState } from "react";
import Button from "../../ui/Button";

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  return (
    <form>
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
  );
};

export default LoginForm;
