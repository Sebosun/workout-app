import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../../../contexts/AuthContext";

import Button from "../../ui/Button";

const RegistrationForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { signup }: any = useAuth();
  const history = useHistory();

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signup(emailRef.current?.value, passwordRef.current?.value);
      history.push("/");
    } catch {
      throw new Error("cos sie zjebało");
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="email">
        Email:
        <input type="email" name="email" id="email" ref={emailRef} required />
      </label>
      <br />
      <label htmlFor="password">
        Password:
        <input
          type="password"
          name="password"
          id="password"
          ref={passwordRef}
          required
        />
      </label>
      <br />
      <Button> Submit </Button>
    </form>
  );
};

export default RegistrationForm;
