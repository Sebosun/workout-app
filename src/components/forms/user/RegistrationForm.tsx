import React, { useState } from "react";
import Button from "../../ui/Button";
import { firebaseConfig } from "../../../index";
import { registerUser } from "../../../store/actions/register-user";
import { useAppDispatch } from "../../../store/app/hooks";

interface RegistrationData {
  password: string;
  email: string;
}

const initialState: RegistrationData = {
  password: "",
  email: "",
};

const RegistrationForm = () => {
  const [loginData, setLoginData] = useState(initialState);
  const { password, email } = loginData;
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(registerUser(email, password));
  };

  return (
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
  );
};

export default RegistrationForm;
