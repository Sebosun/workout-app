import React, { useState } from "react";
import Button from "../../ui/Button";

import { loginUser } from "../../../store/slices/user-slice";
import { useAppDispatch } from "../../../store/app/hooks";

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
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    dispatch(loginUser(email, password));
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
